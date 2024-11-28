import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { LoginApi, loginWithGoogleApi } from "../../redux/auth/AuthSlice";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../pages/Authentication/components/InputField";
import { GoogleOAuthProvider } from "@react-oauth/google";

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loginStatus, error } = useSelector((state) => state.auth);

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
        const response = await dispatch(LoginApi(userData)).unwrap();
        if (response.isSuccess) {
          Cookies.set("authToken", response.result.token, { expires: 7 });
          onClose(); // Close the modal on successful login
          window.location.reload();
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

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const response = await dispatch(loginWithGoogleApi({ token })).unwrap();
      if (response.isSuccess) {
        Cookies.set("authToken", response.result.token, { expires: 7 });
        onClose(); // Close the modal on successful login
        window.location.reload();
      } else {
        toast.error(response.message || "Google login failed.");
      }
    } catch (error) {
      toast.error(error || "Google login failed. Please try again.");
    }
  };

  const handleGoogleLoginFailure = () => {
    toast.error("Google login failed. Please try again.");
  };

  // Close modal when clicking outside of it
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal if the overlay is clicked
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity bg-gray-200/75 dark:bg-gray-800/75"
      onClick={handleOverlayClick} // Add click handler to overlay
    >
      <div className="w-full max-w-md bg-white py-6 px-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src="https://hydra13.blob.core.windows.net/63a5630a-687a-4c38-98e2-f5ce440f3f09/logo_1.png"
              loading="lazy"
              className="w-[100px]"
              alt="aiil logo"
            />
            <h1 className="font-mono text-2xl font-bold text-gray-900">
              LOGIN
            </h1>
          </div>
          <button
            onClick={onClose}
            className="text-gray-800 hover:text-gray-900 focus:outline-none"
          >
            &times; {/* Close button */}
          </button>
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
              className={`w-full px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline ${
                formData.username && formData.password
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              type="submit"
              disabled={!(formData.username && formData.password)}
            >
              LOGIN
            </button>
            {loginStatus === "pending" && (
              <p className="font-mono text-xs text-yellow-500 text-center mt-2">
                Logging...
              </p>
            )}
            {loginStatus === "failed" && (
              <p className="font-mono text-xs text-red-500 text-center mt-2">
                {error}
              </p>
            )}
            <ToastContainer autoClose={3000} newestOnTop closeOnClick />
          </div>
        </form>
        <div className="space-y-4 text-gray-600 text-center">
          <p className="text-xs mt-2">-----------------or-----------------</p>
          <div className="grid gap-4">
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
              />
            </GoogleOAuthProvider>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
