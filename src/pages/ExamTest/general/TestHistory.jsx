import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTestHistory } from "../../../redux/testExam/TestSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDateTime } from "../../../utils/Validator";

const TestHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { courseId } = useParams();

  const skillTypes = {
    0: "Reading",
    1: "Listening",
    2: "Writing",
    3: "Speaking",
  };

  const fetchResults = async (courseId) => {
    try {
      setLoading(true);
      const response = await dispatch(getTestHistory(courseId)).unwrap();

      console.log("History: ", response);
      setHistory(response.data);
    } catch (err) {
      console.error("Failed to fetch test histories:", err);
      setError("Failed to load test histories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(courseId);
  }, [courseId]);

  return (
    <div className="">
      <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="card card-bordered bg-base-100 shadow-xl">
          <header className="card-header bg-accentGreen text-white py-4 px-6 rounded-t-lg">
            <h1 className="text-2xl font-bold">IELTS Test History</h1>
            <p className="text-sm">Your past test scores at a glance</p>
          </header>
          <div className="card-body overflow-x-auto">
            <table className="table w-full table-zebra text-left">
              <thead>
                <tr className="bg-green-500 ">
                  <th className="px-2 py-2">Test Name</th>
                  <th className="px-2 py-2">Test Time</th>
                  <th className="px-2 py-2">Skill</th>
                  <th className="px-2 py-2">Correct</th>
                  <th className="px-2 py-2">Total Questions</th>
                  <th className="px-2 py-2">Time Taken (mins)</th>
                  <th className="px-2 py-2">Overall Band</th>
                </tr>
              </thead>
              <tbody>
                {history.map((test, index) => (
                  <tr
                    key={test.id}
                    className={`${index % 2 === 0 ? "bg-green-50" : "bg-white"
                      } hover:bg-green-100`}
                  >
                    <td className="px-2 py-1">{test.testName}</td>
                    <td className="px-2 py-1">{formatDateTime(Date(test.testDate))}</td>
                    <td className="px-2 py-1">{skillTypes[test.skillType]}</td>
                    <td className="px-2 py-1">{test.numberOfCorrect}</td>
                    <td className="px-2 py-1">{test.totalQuestion}</td>
                    <td className="px-2 py-1">{test.timeMinutesTaken}</td>
                    <td className="px-2 py-1 font-bold">{test.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <footer className="bg-gray-50 py-4 px-6 text-sm text-gray-500 rounded-b-lg">
            Total Tests: {history.length}
          </footer>
        </div>
      </div>
      <ToastContainer autoClose={3000} newestOnTop closeOnClick />
    </div>
  );
};

export default TestHistory;
