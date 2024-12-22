import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../components/ADMIN/Pagination";
import {
  Admin_GetTests,
  DeleteTest,
  UpdateTest,
} from "../../redux/ADMIN/TestExamSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDOB } from "../../utils/Validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExamCard = ({
  testName,
  startTime,
  endTime,
  type,
  testCreateBy,
  openConfirmPopup,
  openUpdatePopup,
}) => {
  const formattedStartTime = formatDOB(startTime);
  const formattedEndTime = formatDOB(endTime);

  const createdByText = testCreateBy === 1 ? "ADMIN" : "Teacher";

  const getTestTypeText = (type) => {
    switch (type) {
      case 1:
        return "Practice";
      case 2:
        return "Testing";
      case 3:
        return "Register";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-80 hover:shadow-xl transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="font-semibold text-lg text-gray-800">{testName}</h2>
          <p className="text-gray-500 text-sm">
            Start time: {formattedStartTime}
          </p>
          <p className="text-gray-500 text-sm">End time: {formattedEndTime}</p>
          <p className="text-gray-600 text-sm font-medium">
            Type: {getTestTypeText(type)}
          </p>
        </div>
        <div className="bg-green-500 text-white px-3 py-1 text-xs rounded-md">
          {createdByText}
        </div>
      </div>
      <div className="flex justify-end items-center mt-4 space-x-3">
        <button
          className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-all"
          onClick={openUpdatePopup}
        >
          <FaEdit />
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
          onClick={openConfirmPopup}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

const TestList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);

  const [formData, setFormData] = useState({
    testName: "",
    startTime: "",
    endTime: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const { tests, totalPages, deleteStatus, updateStatus } = useSelector(
    (state) => state.ADMIN_tests
  );

  const openConfirmPopup = (testId) => {
    setSelectedTestId(testId);
    setIsConfirmOpen(true);
  };

  const closeConfirmPopup = () => {
    setIsConfirmOpen(false);
    setSelectedTestId(null);
  };

  const openUpdatePopup = (item) => {
    setSelectedTest(item);
    setFormData({
      id: item.id,
      testName: item.testName,
      startTime: item.startTime,
      endTime: item.endTime,
    });
    setIsUpdateModalOpen(true);
  };

  const closeUpdatePopup = () => {
    setIsUpdateModalOpen(false);
    setSelectedTest(null);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(DeleteTest(selectedTestId)).unwrap();
      toast.success("Test deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to delete test.");
    } finally {
      closeConfirmPopup();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.testName) errors.testName = "Test Name is required";
    if (!formData.startTime) errors.startTime = "Start Time is required";
    if (!formData.endTime) errors.endTime = "End Time is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      try {
        await dispatch(UpdateTest(formData)).unwrap();
        toast.success("Test updated successfully!");
        closeUpdatePopup();
      } catch (error) {
        toast.error(error.message || "Failed to update test.");
      }
    } else {
      setFormErrors(errors);
    }
  };

  useEffect(() => {
    dispatch(Admin_GetTests({ page: currentPage, pageSize }));
  }, [dispatch, currentPage, deleteStatus, updateStatus]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4 py-6">
        {/* Test Cards Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tests.map((exam) => (
            <ExamCard
              key={exam.id}
              testName={exam.testName}
              startTime={exam.startTime}
              endTime={exam.endTime}
              type={exam.testType}
              testCreateBy={exam.testCreateBy}
              openConfirmPopup={() => openConfirmPopup(exam.id)}
              openUpdatePopup={() => openUpdatePopup(exam)}
            />
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Delete modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this test? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={closeConfirmPopup}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Update Test
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Test Name
                </label>
                <input
                  type="text"
                  name="testName"
                  value={formData.testName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {formErrors.testName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.testName}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  min={new Date().toISOString().slice(0, 16)}
                  required
                />
                {formErrors.startTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.startTime}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  min={new Date().toISOString().slice(0, 16)}
                  required
                />
                {formErrors.endTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.endTime}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeUpdatePopup}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TestList;
