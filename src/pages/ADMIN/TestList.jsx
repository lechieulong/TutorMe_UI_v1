import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../components/ADMIN/Pagination";
import { Admin_GetTests } from '../../redux/ADMIN/TestExamSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatDOB } from '../../utils/Validator';

const ExamCard = ({ testName, startTime, endTime, testCreateBy }) => {
  const formattedStartTime = formatDOB(startTime);
  const formattedEndTime = formatDOB(endTime);

  const createdByText = testCreateBy === 1 ? "ADMIN" : "Teacher";

  return (
    <div className="bg-white p-4 rounded shadow-md w-64">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-bold text-sm">{testName}</h2>
          <p className="text-gray-600 text-xs">Start time: {formattedStartTime}</p>
          <p className="text-gray-600 text-xs">End time: {formattedEndTime}</p>
        </div>
        <div className="bg-blue-500 text-white px-2 py-1 text-xs">
          {createdByText}
        </div>
      </div>
      <div className="flex justify-end items-center mt-4 space-x-2">
        <button className="bg-orange-500 text-white p-1 rounded hover:bg-orange-600 flex items-center justify-center">
          <FaEdit />
        </button>
        <button className="bg-red-500 text-white p-1 rounded hover:bg-red-600 flex items-center justify-center">
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

  const { tests, getteststatus, totalTests, totalPages } = useSelector((state) => state.ADMIN_tests);

  useEffect(() => {
    dispatch(Admin_GetTests({ page: currentPage, pageSize }));
  }, [dispatch, currentPage]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-accentGreen p-2">
        <select className="bg-white text-black p-1 rounded mr-4">
          <option selected>Created by</option>
          <option>ADMIN</option>
          <option>Teacher</option>
        </select>
        <select className="bg-white text-black p-1 rounded mr-4">
          <option selected>All skills</option>
          <option>Listening</option>
          <option>Speaking</option>
          <option>Reading</option>
          <option>Writing</option>
        </select>
        <button className="bg-red-500 text-white p-1 rounded hover:bg-red-600">
          Filter
        </button>
      </div>
      <div className="p-4 flex justify-center flex-wrap gap-4">
        {tests.map((exam, index) => (
          <ExamCard
            key={index}
            testName={exam.testName}
            startTime={exam.startTime}
            endTime={exam.endTime}
            testCreateBy={exam.testCreateBy}
          />
        ))}
      </div>
      {/* //Phan trang */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} // Set the current page directly
      />
    </div>
  );
};

export default TestList;
