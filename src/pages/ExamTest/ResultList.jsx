import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetResultOfATest } from "../../redux/testExam/TestSlice"; // Import your API action
import { FaArrowLeft } from "react-icons/fa";
import TestSubmitted from "./TestSubmitted";
import TestExplain from "../TestExam/TestExplain";

const ResultList = ({ testId, setIsViewExplain, activeTab, setActiveTab }) => {
  const [results, setResults] = useState([]);
  const [count, setCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPartsSubmit, setTotalPartsSubmit] = useState([]);
  const [skillResultIds, setSkillResultIds] = useState([]);
  const [testIdExplain, setTestIdExplain] = useState(null);
  const [userIdTaken, setUserId] = useState(null);
  const [viewExplain, setViewExplain] = useState(false);

  const dispatch = useDispatch();

  const fetchResults = async (testId) => {
    try {
      setLoading(true);
      const response = await dispatch(GetResultOfATest(testId)).unwrap();

      setResults(response.data);
      setCount(response.totalCount);
    } catch (err) {
      console.error("Failed to fetch tests:", err);
      setError("Failed to load tests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(testId);
  }, [testId]);

  const handleViewExplain = (result) => {
    setTotalPartsSubmit(result.totalParts);
    setSkillResultIds([
      {
        id: result.id,
        skillId: result.skillId, // Đảm bảo `result` có trường skillId
        totalParts: result.totalParts, // Đưa totalParts vào mảng
      },
    ]);
    setUserId(result.userId);
    setTestIdExplain(result.testId);
    setViewExplain(true);
    setIsViewExplain(true);
  };

  return (
    <>
      {!viewExplain ? (
        <div className=" h-[400px]">
          {activeTab === "Dashboard" ? (
            <TestSubmitted />
          ) : (
            <>
              <header className="card-header bg-accentGreen text-white py-2 px-3 rounded-t-lg">
                <h1 className="text-xl font-bold flex items-center space-x-2">
                  <FaArrowLeft
                    className="cursor-pointer"
                    onClick={() => setActiveTab("Dashboard")}
                  />
                  <span>Result</span>
                </h1>
              </header>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full  w-12 border-t-2 border-b-2 border-blue-500"></div>
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
                            Full name
                          </th>
                          <th className="px-2 py-3 text-left text-sm font-semibold">
                            Email
                          </th>
                          <th className="px-2 py-3 text-left text-sm font-semibold">
                            Correct
                          </th>
                          <th className="px-2 py-3 text-left text-sm font-semibold">
                            Overall Score
                          </th>
                          <th className="px-2 py-3 text-left text-sm font-semibold">
                            Times
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {results.map((result) => (
                          <tr
                            key={result.id}
                            className="hover:bg-green-100  cursor-pointer"
                            onClick={() => handleViewExplain(result)}
                          >
                            <td className="px-2 py-1 text-gray-700">
                              {result.userName}
                            </td>
                            <td className="px-2 py-1 text-gray-700">
                              {result.userEmail}
                            </td>
                            <td className="px-2 py-1 text-gray-700 capitalize">
                              {result.numberOfCorrect}/{result.totalQuestion}
                            </td>
                            <td className="px-2 py-1 text-gray-700 capitalize">
                              {result.score}
                            </td>
                            <td className="px-2 py-1 text-gray-700 capitalize">
                              {result.attemptNumber}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <footer className="bg-gray-50 py-4 px-6 text-sm text-gray-500 rounded-b-lg">
                    Total results: {count}
                  </footer>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <TestExplain
          skillResultIds={skillResultIds}
          testId={testId}
          userIdTaken={userIdTaken}
        />
      )}
    </>
  );
};

export default ResultList;
