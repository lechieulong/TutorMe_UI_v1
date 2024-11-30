import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTests } from "../../redux/testExam/TestSlice";
import { getUser } from "../../service/GetUser";
import MainLayout from "../../layout/MainLayout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClipboardList } from "@fortawesome/free-solid-svg-icons"; // Import the eye and clipboard list icons
import { formatDate } from "../../utils/formatDate";

const ListTest = () => {
  const [tests, setTests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [testsPerPage] = useState(4); // Number of tests per page
  const dispatch = useDispatch();

  // Fetch the tests based on the current page
  useEffect(() => {
    const fetchData = async () => {
      const user = getUser();
      if (user && user.sub) {
        const result = await dispatch(fetchTests(user.sub));
        if (result.payload) {
          setTests(result.payload); // Store the fetched data in state
        }
      }
    };

    fetchData();
  }, [dispatch]);

  // Calculate the tests to display on the current page
  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = tests.slice(indexOfFirstTest, indexOfLastTest);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(tests.length / testsPerPage);

  return (
    <MainLayout>
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon
          icon={faClipboardList}
          className="text-green-600 text-2xl"
        />
        <h3 className="text-2xl p-2 font-semibold text-green-600">
          Test Input
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 px-4">
        {currentTests.length > 0 ? (
          currentTests.map((test, index) => (
            <Link
              to={`/testDetail/${test.id}`}
              key={test.Id || index}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {test.testName || "Untitled Test"}
              </h3>

              {/* Display start and end time */}
              <p className="text-gray-600 mb-2">
                <strong>Start Time:</strong>
              </p>
              <p className="text-sm">{formatDate(test.startTime) || "N/A"}</p>
              <p className="text-gray-600 mb-2">
                <strong>End Time:</strong>
              </p>
              <p className="text-sm">{formatDate(test.endTime) || "N/A"}</p>

              <div className="flex justify-between items-center mt-2">
                <button className="bg-green-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-green-700 transition duration-200 flex items-center">
                  <FontAwesomeIcon icon={faEye} className="mr-2" />
                  View Details
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-600">
            No tests available.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4 text-lg text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </MainLayout>
  );
};

export default ListTest;
