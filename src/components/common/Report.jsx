/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReport } from "../../redux/common/ReportSlice"; // Import hàm createReport mới
import Notification from "./Notification"; // Import Notification component
import Confirm from "./Confirm"; // Import Confirm component
import debounce from "lodash.debounce";
import InputFileUpload from "./InputFileUpload";
const Report = ({ userId, courseId, teacherId, liveStreamId, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    reportType: "",
    issueTitle: "",
    issueDescription: "",
    attachmentUrl: "", // This will now hold the file
    priority: "medium",
    feedbackOption: false,
  });
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState("yes"); // To set success or failure status
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value, // Handle file upload
    });
  };
  const handleConfirmSubmit = async () => {
    try {
      const reportData = {
        userId,
        courseId,
        teacherId,
        liveStreamId,
        ...formData,
      };

      // Dispatch action createReport
      const response = await dispatch(createReport(reportData));

      if (response.error) {
        setNotificationMessage("Failed to create the report");
        setNotificationStatus("no");
      } else {
        setNotificationMessage("Report submitted successfully");
        setNotificationStatus("yes");
      }

      setShowConfirm(false); // Close the confirmation modal after submission
    } catch (error) {
      setNotificationMessage("An error occurred while submitting the report");
      setNotificationStatus("no");
      setShowConfirm(false);
    }
  };
  const handleSubmit = debounce(async (e) => {
    e.preventDefault();
    setShowConfirm(true);
  }, 2000);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Submit a Report</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Report Type
            </label>
            <select
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select Report Type</option>
              <option value="course">Course</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {/* Issue Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Issue Title
            </label>
            <input
              type="text"
              name="issueTitle"
              value={formData.issueTitle}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Briefly describe the issue"
              required
            />
          </div>

          {/* Issue Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Issue Description
            </label>
            <textarea
              name="issueDescription"
              value={formData.issueDescription}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="4"
              placeholder="Describe the issue in detail"
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Feedback Option */}
          <div className="flex items-center">
            <input
              id="feedbackOption"
              name="feedbackOption"
              type="checkbox"
              checked={formData.feedbackOption}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="feedbackOption"
              className="ml-2 block text-sm text-gray-900"
            >
              Receive feedback about this report
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Notification component */}
      <Notification
        message={notificationMessage}
        onClose={() => setNotificationMessage(null)}
        shoud={notificationStatus} // Use the status here
      />

      {/* Confirm component */}
      <Confirm
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmSubmit}
        message="Are you sure you want to submit the report?"
        status="Confirmation"
        shoud="yes"
      />
    </div>
  );
};

export default Report;
