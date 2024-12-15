import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogleApi } from "../../redux/auth/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Regis } from "../../redux/auth/AuthSlice";
import InputField from "./components/InputField";
import Cookies from "js-cookie";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerStatus, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: ""
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    if (cleaned.length === 10 && cleaned[0] === '0') {
      return `0${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 10)}`;
    }

    return phoneNumber;
  };


  const validateForm = () => {
    const errors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    const formattedPhone = formatPhoneNumber(formData.phonenumber);

    if (!formData.name) errors.name = "Full Name is required";
    if (!formData.email) errors.email = "Email is required";

    if (!formData.phonenumber) {
      errors.phonenumber = "Phone Number is required";
    } else if (formattedPhone !== formData.phonenumber) {
      errors.phonenumber = "Phone Number is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = "Password must be 8 characters, 1 uppercase letter, and 1 special character";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setFormErrors({
        name: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmPassword: ""
      });

      // Remove confirmPassword before dispatching
      const { confirmPassword, ...userData } = formData;

      dispatch(Regis(userData));
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
      if (response.isSuccess) {
        Cookies.set("authToken", response.result.token, { expires: 7 });
        navigate("/");
        // window.location.href = "/";
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
    <div className="font-montserrat bg-gradient-to-br from-sky-50 to-gray-200 w-screen h-screen flex">
      {/* Left side: form section */}
      <div className="hidden sm:block w-1/2 h-screen overflow-hidden">
        <img
          src="https://hydra13.blob.core.windows.net/63a5630a-687a-4c38-98e2-f5ce440f3f09/register.png"
          className="size-100 object-cover"
          alt="Background Image"
        />
      </div>

      {/* Right side: image section */}
      <div className="w-full sm:w-1/2 bg-white p-4 px-12 rounded-lg shadow-lg flex flex-col space-y-4 overflow-y-auto">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <img
            src="https://hydra13.blob.core.windows.net/63a5630a-687a-4c38-98e2-f5ce440f3f09/logo_1.png"
            loading="lazy"
            className="w-[100px]"
            alt="tutorme logo"
          />
          <h1 className="font-mono text-2xl font-bold text-gray-900">
            REGISTER
          </h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            error={formErrors.name}
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            error={formErrors.email}
          />
          <InputField
            label="Phone Number"
            id="phonenumber"
            type="text"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            placeholder="Phone Number"
            error={formErrors.phonenumber}
          />
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
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
            <InputField
              label="Confirm Password"
              id="confirm-password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              error={formErrors.confirmPassword}
            />
            <div className="mt-6">
              <button
                className="w-full mt-7 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                REGISTER
              </button>
              {/* Success message */}
              {registerStatus === "success" && (
                <p className="font-mono text-xs text-green-500 text-center mt-2">
                  Registration successful! <br />  Please <Link to="https://mail.google.com/" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">Check your email</Link>.
                </p>
              )}
              {registerStatus === "pending" && (
                <p className="font-mono text-xs text-yellow-500 text-center mt-2">Registering...</p>
              )}
              {registerStatus === "failed" && (
                <p className="font-mono text-xs text-red-500 text-center mt-2">{error}</p>
              )}
            </div>
          </div>
        </form>

        <div className="space-y-4 text-gray-600 text-center">
          <p className="font-mono text-xs">-----------------or-----------------</p>
          <div className="grid gap-4">
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
                <span className="block font-semibold text-gray-700 text-sm transition duration-300 group-hover:text-blue-600">
                  Continue with Facebook
                </span>
              </div>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
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

export default SignUp;
