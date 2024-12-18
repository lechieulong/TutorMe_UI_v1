import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_GetUsers,
  Admin_LockUser,
  Admin_UnlockUser,
} from "../../redux/ADMIN/UserSlice";
import { FaLock, FaLockOpen, FaFilter } from "react-icons/fa";
import LockoutModal from "../../components/ADMIN/LockoutModal";
import UnlockModal from "../../components/ADMIN/UnlockModal";
import ImportedNotify from "../../components/ADMIN/ImportedNotify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Pagination from "../../components/ADMIN/Pagination";
import { formatDOB } from "../../utils/Validator";
import { Admin_ImportUser } from "../../redux/ADMIN/UserSlice";
import { formatDateTime } from "../../utils/Validator";

const Users = () => {
  const dispatch = useDispatch();
  const { users, getuserstatus, totalUsers, totalPages, importUserError, importedResponse, importUserStatus } = useSelector((state) => state.ADMIN_userslice); // totalUsers để biết tổng số người dùng
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUnlockModalOpen, setUnlockModalOpen] = useState(false);
  const [isNotifyOpen, setNotifyOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 20;

  useEffect(() => {
    dispatch(Admin_GetUsers({ page: currentPage, pageSize }));
  }, [dispatch, currentPage]);

  const handleLockClick = (user) => {
    setCurrentUser(user);
    setModalOpen(true);
  };
  const handleUnlockClick = (user) => {
    setCurrentUser(user);
    setUnlockModalOpen(true);
  };

  const handleLock = (duration, unit, reason) => {
    if (currentUser) {
      let lockoutForever = false;
      let durationValue = duration;
      let durationUnit = unit;

      if (unit === 'untilUnlock') {
        lockoutForever = true;
        durationValue = 0;
        durationUnit = unit;
      }
      setIsLoading(true);
      dispatch(
        Admin_LockUser({
          userId: currentUser.id,
          lockoutReason: reason,
          lockoutForever: lockoutForever,
          durationValue: durationValue,
          durationUnit: durationUnit,
        })
      )
        .unwrap()
        .then(() => {
          toast.success(`User locked${lockoutForever ? ' forever' : ` for ${duration} ${unit}(s)`}`);
          dispatch(Admin_GetUsers({ page: currentPage, pageSize }));
        })
        .catch((error) => {
          toast.error("Failed to lock user");
          console.error("Failed to lock user:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // New function to handle unlocking a user
  const handleUnlockUser = (currentUser) => {
    setIsLoading(true);
    dispatch(Admin_UnlockUser(currentUser.id))
      .unwrap()
      .then(() => {
        toast.success("User unlocked successfully");
        dispatch(Admin_GetUsers({ page: currentPage, pageSize }));
      })
      .catch((error) => {
        toast.error("Failed to unlock user");
        console.error("Failed to unlock user:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(Admin_ImportUser(formData))
        .unwrap()
        .then(() => {
          setNotifyOpen(true);
          dispatch(Admin_GetUsers({ page: currentPage, pageSize })); // Refresh the users list
        })
        .catch((error) => {
          toast.error(error || "Failed to import users");
        });
    }
  };
  // const totalPages = totalUsers > pageSize ? Math.ceil(totalUsers / pageSize) : 1;
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      <LockoutModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onLock={handleLock}
      />
      <UnlockModal
        isOpen={isUnlockModalOpen} // Pass the modal state
        onClose={() => setUnlockModalOpen(false)} // Handle close
        onUnlock={handleUnlockUser} // Pass the unlock function
        user={currentUser} // Pass the current user to unlock
      />
      <ImportedNotify
        isOpen={isNotifyOpen}
        onClose={() => setNotifyOpen(false)}
        users={importedResponse?.importedUsers || []} // Passed imported users
        errors={importedResponse?.errors || []} // Passed import errors
      />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Current Users</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-[#d4e9e2]"
          />
          <button className="border border-gray-300 rounded-lg p-2 flex items-center mr-2">
            <FaFilter className="mr-2" /> Filter
          </button>
          <button
            className={`bg-red-500 text-white px-4 py-2 rounded-lg shadow transition ${importUserStatus === "pending" ? "hover:bg-red-500" : "hover:bg-red-400"
              }`}
            onClick={() => {
              if (importUserStatus !== "pending") {
                document.getElementById("fileInput").click();
              }
            }}
            disabled={importUserStatus === "pending"} // Disables button during import
          >
            {importUserStatus === "pending" ? "Importing..." : "Import User"}
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e)}
            accept=".xls,.xlsx"
          />
        </div>
      </div>

      <div className="h-[400px] overflow-auto">
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">DOB</th>
              <th className="py-2 px-3">Phone number</th>
              <th className="py-2 px-3">Role</th>
              <th className="py-2 px-3">Lockout End</th>
              <th className="py-2 px-3"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {getuserstatus === 'pending' ? (
              <tr>
                <td colSpan="6" className="text-green-300 text-center py-4">It may take a few seconds...</td>
              </tr>
            ) : getuserstatus === 'failed' ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-red-500">An error occurred while fetching users. Please try again later.</td>
              </tr>
            ) : (
              users
                .filter((user) =>
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user, index) => (
                  <tr key={index} className={`border-t hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                    <td className="py-1 px-3 flex items-center">
                      <img
                        src={user.imageURL || 'https://placehold.co/32x32'}
                        alt={`Profile of ${user.name}`}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="font-medium">{user.name}</span>
                    </td>
                    <td className="py-1 px-3">{user.email}</td>
                    <td className="py-1 px-3">{user.dob ? formatDOB(new Date(user.dob).toLocaleDateString()) : 'N/A'}</td>
                    <td className="py-1 px-3">{user.phoneNumber || 'N/A'}</td>
                    <td className="py-1 px-3">{user.roles && user.roles.length > 0 ? user.roles.join(', ') : 'N/A'}</td>
                    <td className="py-1 px-3">{user.lockoutEnd ? formatDateTime(user.lockoutEnd) : 'N/A'}</td>
                    <td className="py-1 px-3 text-center">
                      {user.lockoutEnd && new Date(user.lockoutEnd) > new Date() ? (
                        <button onClick={() => handleUnlockClick(user)}>
                          <FaLock className="text-red-500 cursor-pointer" />
                        </button>
                      ) : (
                        <button onClick={() => handleLockClick(user)}>
                          <FaLockOpen className="text-green-500 cursor-pointer" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      {/* //Phan trang */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} // Set the current page directly
      />

      <ToastContainer autoClose={3000} newestOnTop closeOnClick />
    </section>
  );
};

export default Users;
