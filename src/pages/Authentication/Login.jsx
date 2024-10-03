import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../service/AuthService";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';
import { LoginApi, loginWithGoogleApi } from "../../redux/auth/AuthSlice";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import InputField from "./components/InputField";

const SignIn = () => {
  const dispatch = useDispatch();
  const { status, error, token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // Kiểm tra token khi component được render
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      navigate("/"); // Nếu có token, chuyển hướng đến trang Home
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setFormErrors({
        username: "",
        password: "",
      });

      const userData = formData;
      try {
        const response = await dispatch(LoginApi(userData)).unwrap(); // unwrap để lấy dữ liệu trực tiếp từ action

        // Kiểm tra nếu đăng nhập thành công
        if (response.isSuccess) {
          Cookies.set("authToken", response.result.token, { expires: 7 });
          toast.success("Login successful!");
          // navigate("/"); // Chuyển hướng sau khi đăng nhập thành công
          // Chuyển hướng đến trang Home mà không cần reload
          window.location.href = "/";
        } else {
          toast.error(response.message || "Login failed.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Login failed. Please try again.");
      }
    } else {
      setFormErrors(errors);
    }
  };

  // Handle Google login success
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    // Store the token in cookies or localStorage
    try {
      const response = await dispatch(loginWithGoogleApi({ token })).unwrap();
      // Handle the API response for successful login/registration
      if (response.isSuccess) {
        Cookies.set("authToken", response.result.token, { expires: 7 });
        // toast.success("Google login successful!");
        // navigate("/");
        window.location.href = "/";
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="User Name"
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            error={formErrors.username}
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            error={formErrors.password}
          />
          <div className="login-btn mb-6">
            <button
              className={
                formData.username && formData.password
                  ? "active w-full px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline"
                  : "w-full px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline"
              }
              type="submit"
              disabled={formData.username && formData.password ? false : true}
            >
              LOGIN
            </button>
            {/* Success message */}
            {status === "pending" && (
              <p className="font-mono text-xs text-yellow-500 text-center mt-2">Logging...</p>
            )}
            {status === "failed" && (
              <p className="font-mono text-xs text-red-500 text-center mt-2">{error}</p>
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
