import React from "react";
import Sidebar from "./components/Sidebar";
import MainLayout from "../../layout/MainLayout";
import {
  FaLocationArrow,
  FaEnvelope,
  FaPhone,
  FaRegUser,
  FaCalendarDay,
} from "react-icons/fa";
import defaulAvatar from "../../assets/images/default-avatar.jpg";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formatDOB } from "../../utils/Validator";

const UserDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Modal state to show/hide the phone input form
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  // Get user information and status from the Redux store
  const { user } = useSelector((state) => state.user);

  console.log("user: ", user);
  // Check authentication token
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSavePhoneNumber = () => {
    // Save the phone number logic here (could be via Redux action or API call)
    console.log("New Phone Number:", newPhoneNumber);
    // After saving, hide the modal
    setShowPhoneModal(false);
  };

  return (
    <MainLayout>
      <div className="flex w-full bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-5">
          <div className="w-full max-w-full mx-auto bg-gray-100 py-10 flex flex-col">
            <div className="flex flex-col lg:flex-row items-start">
              <div className="lg:w-1/4 flex flex-col items-center mb-6 lg:mb-0 lg:mr-6">
                <img
                  src={user?.imageURL || defaulAvatar}
                  alt="Avatar"
                  className="w-36 h-36 rounded-full object-cover border-4 border-white mb-4"
                  loading="lazy"
                />
                <Link
                  to={`/user/edit/${user?.userName}`}
                  state={{ user }}
                  className="mt-2 bg-white text-black border border-black rounded-lg px-3 py-1 hover:bg-gray-100"
                >
                  Edit Profile
                </Link>
              </div>
              <div className="lg:w-2/4 flex flex-col">
                <div className="bg-black text-white p-4 rounded-t-lg flex flex-col lg:flex-row items-start">
                  <div className="flex-1 lg:ml-6">
                    <h5 className="text-2xl font-bold">{user?.name}</h5>
                    <div className="italic flex items-center my-1 text-sm text-amber-300">
                      <FaPhone className="mr-2 text-stone-400" />
                      <p>
                        {user?.phoneNumber ? (
                          user?.phoneNumber
                        ) : (
                          <button
                            onClick={() => setShowPhoneModal(true)}
                            className="bg-black text-sm"
                          >
                            Add phone number
                          </button>
                        )}
                      </p>
                    </div>
                    <div className="italic flex items-center text-sm text-amber-200">
                      <FaRegUser className="mt-1 mr-2 text-stone-400" />
                      <p>{user?.userName}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-200 text-black rounded-b-lg flex-grow">
                  <div className="mb-5">
                    <p className="text-lg font-semibold">About</p>
                    <div className="p-4 bg-gray-200 rounded-lg">
                      <p className="italic mb-2 flex items-center">
                        <FaEnvelope className="mr-2 text-gray-400" />{" "}
                        {user?.email}
                      </p>
                      <p className="italic mb-2 flex items-center">
                        <FaLocationArrow className="mr-2 text-gray-400" /> Lives
                        in Quang Binh
                      </p>
                      <p className="italic mb-2 flex items-center">
                        <FaCalendarDay className="mr-2 text-gray-400" />{" "}
                        {formatDOB(user?.dob)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold">Your Courses</p>
                    <Link
                      to="/mentorCourseList"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Show All
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="Recent course 1"
                      className="w-full rounded-lg"
                      loading="lazy"
                    />
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="Recent course 2"
                      className="w-full rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modal for Phone Number Input */}
        {showPhoneModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Add Phone Number</h3>
              <input
                type="text"
                placeholder="Enter your phone number"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowPhoneModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePhoneNumber}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default UserDetail;
