import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCourseReport } from "../../redux/courses/CourseReportSlice";
const CourseReport = ({ courseId, userId, onClose, onReportSubmit }) => {
  const [comment, setComment] = useState(""); // Thay vì review, sử dụng comment
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!comment.trim()) {
      alert("Please provide a comment.");
      return;
    }
    try {
      const reportData = {
        userId: userId,
        courseId: courseId,
        comment: comment,
      };
      console.log(reportData);

      await dispatch(createCourseReport(reportData));
      onReportSubmit();
      alert("Report submitted successfully!");
      onClose();
    } catch (err) {
      alert("Failed to submit report.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Report This Course</h2>
        <textarea
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button
            className="py-2 px-4 bg-gray-500 text-white rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseReport;
