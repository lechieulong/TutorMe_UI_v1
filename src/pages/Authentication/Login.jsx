import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../service/AuthService";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogleApi } from "../../redux/auth/AuthSlice";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  // Kiểm tra token khi component được render
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      navigate("/"); // Nếu có token, chuyển hướng đến trang Home
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!user || !pwd) {
      toast.error("User and Password is requied!");
      return;
    }

    let res = await loginApi(user, pwd);

    if (!res || !res.result || !res.result.token) {
      // toast.error(res?.message || "Login Failed!");
      return;
    }

    if (res && res.result.token) {
      toast.success("Login success!", {
        theme: "light",
      });
      navigate('/');
    }
  };

  // Handle Google login success
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    // Store the token in cookies or localStorage
    try {
      const response = await dispatch(loginWithGoogleApi({ token })).unwrap();
      console.log(response);
      // Handle the API response for successful login/registration
      if (response.isSuccess) {
        Cookies.set("authToken", token, { expires: 7 });
        toast.success("Google login successful!");
        navigate("/");
      } else {
        toast.error(response.message || "Google login failed.");
      }
    } catch (error) {
      console.log("Fail");
      console.log(error);
      toast.error(error || "Google login failed. Please try again.");
    }
  };

  // Handle Google login failure
  const handleGoogleLoginFailure = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="container-login font-montserrat bg-gradient-to-br from-sky-50 to-gray-200 w-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <img
            src="./src/assets/images/logo_1.png"
            loading="lazy"
            className="w-[100px]"
            alt="tutorme logo"
          />
          <h1 className="font-mono text-2xl font-bold text-gray-900">LOGIN</h1>
        </div>
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault(); // Ngăn trình duyệt tự động refresh sau khi submit form
          handleLogin();
        }}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="block w-full h-12 px-4 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
              placeholder="Username"
              value={user}
              onChange={(event) => setUser(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full h-12 px-4 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
              placeholder="Password"
              value={pwd}
              onChange={(event) => setPwd(event.target.value)}
            />
          </div>
          <div className="login-btn mb-6">
            <button
              className={
                user && pwd
                  ? "active w-full px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline"
                  : "w-full px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline"
              }
              type="submit"
              disabled={user && pwd ? false : true}
            >
              LOGIN
            </button>
            {/* Success message */}
            {status === "pending" && (
              <p className="font-mono text-xs text-yellow-500 text-center mt-2">Loging...</p>
            )}
            <ToastContainer autoClose={3000} newestOnTop closeOnClick />
          </div>
        </form>
        <div className="space-y-4 text-gray-600 text-center">
          <p className="text-xs mt-2">-----------------or-----------------</p>
          <div className="grid gap-4">
            {/* <button className="group h-12 px-4 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
              <div className="relative flex items-center space-x-3 justify-center">
                <img
                  src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                  className="absolute left-0 w-5"
                  alt="google logo"
                />
                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600">
                  Continue with Google
                </span>
              </div>
            </button> */}
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
            <button className="group h-12 px-4 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
              <div className="relative flex items-center space-x-3 justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                  className="absolute left-0 w-5"
                  alt="Facebook logo"
                />
                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600">
                  Continue with Facebook
                </span>
              </div>
            </button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-xs">
              You don't have an account?{" "}
              <Link to="/register" className="underline">
                Register
              </Link>{" "}
              a new account <br />
              <Link to="/forgotpass" className="underline">
                Forgot password?
              </Link>
            </p>
            <p className="text-xs mt-2">
              Back to our{" "}
              <Link to="/" className="underline">
                Home page
              </Link>{" "}
              and continue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
