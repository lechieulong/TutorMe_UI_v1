import Sidebar from "./components/Sidebar";
import MainLayout from "../../layout/MainLayout";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAPI } from "../../redux/auth/AuthSlice";

const ProfileSection = () => {
  const location = useLocation();
  const userInfor = location.state?.userInfor;
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  const { error, changePasswordStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/"); // Redirect to Landing Page if no token
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!formData.email) errors.email = "Email is required";
    if (!formData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }
    if (!formData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (!passwordRegex.test(formData.newPassword)) {
      errors.newPassword =
        "Password must be at least 8 characters long and contain at least one uppercase letter and one special character";
    }
    if (formData.newPassword == formData.currentPassword) {
      errors.newPassword = "Current password is the same as old password";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setFormErrors({
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Remove confirmPassword before dispatching
      const { confirmPassword, ...userData } = formData;

      dispatch(changePasswordAPI(userData)); // Call your Redux action
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <MainLayout>
      <div className="flex h-screen w-full">
        <Sidebar />
        <div className="flex-1 p-12">
          <div className="flex gap-8 bg-gray-100 p-6 px-12">
            <div className="flex-1 border-2 border-gray-500 rounded-lg p-6">
              <ul className="mt-2 flex space-x-4 border-b border-gray-300">
                <li>
                  <p className="py-3 px-6 text-blue-800 border-b-2 border-blue-800 font-bold text-lg">
                    Change Password
                  </p>
                </li>
              </ul>
              <div className="mt-6">
                <form noValidate onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-gray-700">Email</label>
                          <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                          />
                          {formErrors.email && (
                            <p className="font-mono text-red-500 text-xs mt-1">
                              {formErrors.email}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-gray-700">
                            Current Password
                          </label>
                          <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="••••••"
                          />
                          {formErrors.currentPassword && (
                            <p className="font-mono text-red-500 text-xs mt-1">
                              {formErrors.currentPassword}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-gray-700">
                            New Password
                          </label>
                          <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="••••••"
                          />
                          {formErrors.newPassword && (
                            <p className="font-mono text-red-500 text-xs mt-1">
                              {formErrors.newPassword}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-gray-700">
                            Confirm Password
                          </label>
                          <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••"
                          />
                          {formErrors.confirmPassword && (
                            <p className="font-mono text-red-500 text-xs mt-1">
                              {formErrors.confirmPassword}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                      >
                        Save Change
                      </button>
                      {/* Success message */}
                      {changePasswordStatus === "success" && (
                        <p className="font-mono text-xs text-green-500 text-center mt-2">
                          Change password successful!
                        </p>
                      )}
                      {changePasswordStatus === "pending" && (
                        <p className="font-mono text-xs text-yellow-500 text-center mt-2">
                          Changing...
                        </p>
                      )}
                      {changePasswordStatus === "failed" && (
                        <p className="font-mono text-xs text-red-500 text-center mt-2">
                          {error}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="hidden md:flex md:w-1/3 flex-col items-start">
              <div className="mb-6 text-base text-red-600 bg-white p-4 border border-gray-300 rounded-lg shadow-sm italic">
                <p>
                  Make sure your new password is strong and unique. Avoid using
                  common passwords and include a mix of letters, numbers, and
                  special characters.
                </p>
              </div>
              <img
                src="src/assets/images/security.png"
                alt="Security Illustration"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileSection;
