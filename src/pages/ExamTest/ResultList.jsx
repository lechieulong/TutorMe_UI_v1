import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetResultOfATest } from "../../redux/testExam/TestSlice"; // Import your API action
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";  // Import useNavigate
import { formatDateTime } from "../../utils/Validator";
import { FaArrowLeft } from "react-icons/fa";
import TestSubmitted from "./TestSubmitted";

const ResultList = ({ testId }) => {
    const [activeTab, setActiveTab] = useState("Results");
    const [results, setResults] = useState([]);
    const [count, setCount] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const fetchResults = async (testId) => {
        try {
            setLoading(true);
            const response = await dispatch(
                GetResultOfATest(testId)
            ).unwrap();

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

    return (
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
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-center">{error}</div>
                    ) : results.length === 0 ? (
                        <div className="text-gray-500 text-center">No results available.</div>
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
                                            <tr key={result.id} className="hover:bg-gray-100">
                                                <td className="px-2 py-1 text-gray-700">{result.userName}</td>
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
    );
};

export default ResultList;
