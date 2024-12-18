import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTests } from "../../redux/testExam/TestSlice";
import MainLayout from "../../layout/MainLayout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/formatDate";

const ListTest = () => {
  const [tests, setTests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [testsPerPage] = useState(6);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(
        fetchTests({ pageNumber: currentPage, pageSize: testsPerPage })
      );
      if (result.payload) {
        console.log("Payload:", result.payload);
        setTests(result.payload.data || []);
        console.log(result.payload.totalPages);

        setTotalPages(result.payload.totalPages || 1);
      }
    };

    fetchData();
  }, [currentPage, dispatch, testsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MainLayout>
      <div className="p-10">
        <header className="flex items-center space-x-3 mb-6">
          <FontAwesomeIcon
            icon={faClipboardList}
            className="text-green-600 text-2xl"
          />
          <h1 className="text-3xl font-bold text-green-600">Test Management</h1>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.length > 0 ? (
            tests.map((test, index) => (
              <Link
                to={`/testDetail/${test.id}`}
                key={test.id || index}
                className="block bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {test.testName || "Untitled Test"}
                </h2>
                <div className="text-gray-600 text-sm">
                  <p className="mb-2">
                    <strong>Start Time:</strong>{" "}
                    {formatDate(test.startTime) || "N/A"}
                  </p>
                  <p className="mb-2">
                    <strong>End Time:</strong>{" "}
                    {formatDate(test.endTime) || "N/A"}
                  </p>
                </div>
                <button className="mt-4 bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 flex items-center">
                  <FontAwesomeIcon icon={faEye} className="mr-2" />
                  View Details
                </button>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">
              No tests available.
            </p>
          )}
        </section>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              className={`px-4 py-2 text-white rounded-lg transition duration-200 ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-lg font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              className={`px-4 py-2 text-white rounded-lg transition duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ListTest;
