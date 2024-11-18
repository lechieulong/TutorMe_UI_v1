import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getResultsHistory } from "../../redux/testExam/TestSlice"; // Import your API action
import { toast } from "react-toastify";

const TestSubmitted = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const fetchResults = async (page) => {
    try {
      setLoading(true);
      const response = await dispatch(
        getResultsHistory({ userId: user.id, page })
      ).unwrap();
      setResults(response.payload || []);
      setTotalPages(response.payload.length || 1);
    } catch (err) {
      console.error("Failed to fetch results history:", err);
      setError("Failed to load results history.");
      toast.error("Error loading results history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(currentPage);
  }, [currentPage]);

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Test Results History
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : results.length === 0 ? (
        <div className="text-gray-500 text-center">No results available.</div>
      ) : (
        <div>
          <div className="overflow-auto rounded-lg shadow mb-4">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Test Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Skill
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-gray-700">
                      {result.testName}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(result.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-700 capitalize">
                      {result.skill}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {result.score}
                    </td>
                    <td
                      className={`px-6 py-4 text-gray-700 font-medium ${
                        result.status === "Pass"
                          ? "text-green-600"
                          : result.status === "Fail"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {result.status}
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
    </div>
  );
};

export default TestSubmitted;
