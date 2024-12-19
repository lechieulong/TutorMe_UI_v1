import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTestsByCourse } from "../../redux/testExam/TestSlice"; // Import your API action
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { formatDateTime } from "../../utils/Validator";
import { FaRegEdit, FaArrowRight } from "react-icons/fa";
import ResultList from "./ResultList";
import TestExplain from "../TestExam/TestExplain";
import { UpdateTest } from "../../redux/ADMIN/TestExamSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TestSubmitted = ({ setIsViewExplain, setActiveTab, activeTab }) => {
  // const [activeTab, setActiveTab] = useState("Dashboard");
  const [results, setResults] = useState([]);
  const [count, setCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { courseId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const { updateStatus } = useSelector((state) => state.ADMIN_tests);

  console.log(activeTab);

  const skillTypes = {
    0: "Reading",
    1: "Listening",
    2: "Writing",
    3: "Speaking",
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

  const [formData, setFormData] = useState({
    testName: "",
    startTime: "",
    endTime: "",
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

  const fetchResults = async (courseId, currentPage, pageSize) => {
    try {
      setLoading(true);
      const response = await dispatch(
        getTestsByCourse({ courseId, page: currentPage, pageSize })
      ).unwrap();

      setResults(response.data);
      setCount(response.pagination.totalItems);

      setTotalPages(1); // Adjust based on API implementation
    } catch (err) {
      console.error("Failed to fetch tests:", err);
      setError("Failed to load tests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(courseId, currentPage, pageSize);
  }, [courseId, currentPage, updateStatus]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleTestClick = (testId) => {
    console.log("haha", activeTab);
    setActiveTab("Results");
    setSelectedTestId(testId);
  };

  console.log("cc", activeTab);

  return (
    <div className="w-full">
      <div className="h-[400px]">
        {activeTab == "Results" ? (
          <ResultList
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            testId={selectedTestId}
            setIsViewExplain={setIsViewExplain}
          />
        ) : (
          activeTab === "Dashboard" && (
            <>
              <header className="card-header bg-accentGreen text-white py-4 px-6 rounded-t-lg">
                <h1 className="text-2xl font-bold">IELTS Test List</h1>
                <p className="text-sm">
                  List all tests of this course: {count} tests
                </p>
              </header>

              {loading ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
              ) : results.length === 0 ? (
                <div className="text-gray-500 text-center">
                  No results available.
                </div>
              ) : (
                <div>
                  <div className="overflow-auto h-[400px] shadow mb-4">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-green-500 sticky font-bold">
                        <tr>
                          <th className="px-2 py-3 text-left text-sm font-semibold">
                            Test Name
                          </th>
                          <th className="px-2 py-3 text-left text-sm font-semibold">
                            Start Time
                          </th>
                          <th className="px-2 py-3 text-left text-sm font-semibold">
                            End Time
                          </th>
                          <th className="px-2 py-3 text-left text-sm font-semibold">
                            Created At
                          </th>
                          <th className="px-2 py-3 text-left text-sm font-semibold">
                            Last Updated
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {results.map((result) => (
                          <tr key={result.id} className="hover:bg-gray-100">
                            <td className="px-2 py-1 text-gray-700">
                              {result.testName}
                            </td>
                            <td className="px-2 py-1 text-gray-700 capitalize">
                              {formatDateTime(result.startTime)}
                            </td>
                            <td className="px-2 py-1 text-gray-700 capitalize">
                              {formatDateTime(result.endTime)}
                            </td>
                            <td className="px-2 py-1 text-gray-700 capitalize">
                              {formatDateTime(result.createAt)}
                            </td>
                            <td className="px-2 py-1 text-gray-700 capitalize">
                              {formatDateTime(result.updateAt)}
                            </td>
                            <td className="px-2 py-1 text-gray-700 capitalize cursor-pointer">
                              {/* {new Date(result.startTime) > new Date(new Date().toISOString().slice(0, 16)) ? (
                                <FaRegEdit onClick={() => openUpdatePopup(result)} />
                              ) : ( */}
                              <FaArrowRight
                                onClick={(event) => {
                                  event.stopPropagation(); // Prevent the row click event
                                  handleTestClick(result.id.toString());
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-gray-600 text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )
        )}
      </div>
      {/* Update modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Update Test</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Test Name
                </label>
                <input
                  type="text"
                  name="testName"
                  value={formData.testName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {formErrors.testName && (
                  <p className="text-red-500 text-xs">{formErrors.testName}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  min={new Date().toISOString().slice(0, 16)}
                  required
                />
                {formErrors.startTime && (
                  <p className="text-red-500 text-xs">{formErrors.startTime}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  min={new Date().toISOString().slice(0, 16)}
                  required
                />
                {formErrors.endTime && (
                  <p className="text-red-500 text-xs">{formErrors.endTime}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeUpdatePopup}
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-400 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer autoClose={3000} newestOnTop closeOnClick />
    </div>
  );
};

export default TestSubmitted;
