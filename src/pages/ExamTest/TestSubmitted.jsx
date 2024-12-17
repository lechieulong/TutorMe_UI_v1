import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTestsByCourse } from "../../redux/testExam/TestSlice"; // Import your API action
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { formatDateTime } from "../../utils/Validator";
import { FaRegEdit, FaArrowRight } from "react-icons/fa";
import ResultList from "./ResultList";
import TestExplain from "../TestExam/TestExplain";

const TestSubmitted = ({ setIsViewExplain }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [results, setResults] = useState([]);
  const [count, setCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewExplain, setViewExplain] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { courseId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [selectedTestId, setSelectedTestId] = useState(null);

  const skillTypes = {
    0: "Reading",
    1: "Listening",
    2: "Writing",
    3: "Speaking",
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
  }, [courseId, currentPage]);

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
    setSelectedTestId(testId); // Set the selected test ID

    setActiveTab("Results"); // Show the results tab
  };

  return (
    <div className="w-full">
      <div className="h-[400px]">
        {activeTab === "Results" ? (
          <ResultList
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
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full w-12 border-t-2 border-b-2 border-blue-500"></div>
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
                            Updated At
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
                              {new Date(result.startTime) <
                              new Date(
                                new Date().toISOString().slice(0, 16)
                              ) ? (
                                <FaRegEdit />
                              ) : (
                                <FaArrowRight
                                  onClick={(event) => {
                                    event.stopPropagation(); // Prevent the row click event
                                    handleTestClick(result.id.toString());
                                  }}
                                />
                              )}
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
    </div>
  );
};

export default TestSubmitted;
