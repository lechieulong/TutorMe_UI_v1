import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendar,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { createTest } from "../../redux/testExam/TestSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CreateTest from "./CreateTest";

const TestForm = ({ classId, lessonId, categories, pageType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [testInfo, setTestInfo] = useState(null);
  const [showTestFormDetail, setShowTestFormDetail] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitted(true);
    try {
      const payload = { ...data, classId, lessonId };
      const result = await dispatch(createTest(payload)).unwrap();

      setTestInfo(result);
      toast.success("Test created successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to create test. Please try again.");
      setIsSubmitted(false); // Reset submission state on failure
    }
  };

  const currentDateTime = new Date().toISOString().slice(0, 16);
  const startTime = watch("startTime");

  return (
    <div className="w-full">
      {isSubmitted && testInfo ? (
        !showTestFormDetail ? (
          <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Test Information</h2>
            <p>
              <strong>Test Name:</strong> {testInfo.testName || "N/A"}
            </p>
            <p>
              <strong>Class:</strong> {testInfo.class || "N/A"}
            </p>
            <p>
              <strong>Start Time:</strong> {testInfo.startTime || "N/A"}
            </p>
            <p>
              <strong>End Time:</strong> {testInfo.endTime || "N/A"}
            </p>
            <button
              type="button"
              onClick={() => setShowTestFormDetail(true)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Create Skill
            </button>
          </div>
        ) : (
          <CreateTest
            skills={categories}
            testId={testInfo?.id}
            pageType={pageType}
          />
        )
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-8 max-w-lg mx-auto p-6 bg-white rounded-2xl border border-gray-200"
        >
          {/* Test Name */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700">
              Test Name
            </label>
            <div className="flex items-center mt-2">
              <FontAwesomeIcon icon={faTable} className="text-gray-500 mr-3" />
              <input
                type="text"
                {...register("testName", { required: "Test Name is required" })}
                className={`w-full px-4 py-3 border ${
                  errors.testName ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-base`}
                placeholder="Enter the test name"
                disabled={isSubmitted}
              />
            </div>
            {errors.testName && (
              <span className="text-red-500 text-sm">
                {errors.testName.message}
              </span>
            )}
          </div>

          {/* Start Time */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700">
              Start Time
            </label>
            <div className="flex items-center mt-2">
              <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-3" />
              <input
                type="datetime-local"
                {...register("startTime", {
                  required: "Start Time is required",
                  validate: (value) => {
                    const selectedTime = new Date(value);
                    return (
                      selectedTime >= new Date() ||
                      "Start time cannot be in the past"
                    );
                  },
                })}
                className={`w-full px-4 py-3 border ${
                  errors.startTime ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-base`}
                min={currentDateTime}
                disabled={isSubmitted}
              />
            </div>
            {errors.startTime && (
              <span className="text-red-500 text-sm">
                {errors.startTime.message}
              </span>
            )}
          </div>

          {/* End Time */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700">
              End Time
            </label>
            <div className="flex items-center mt-2">
              <FontAwesomeIcon
                icon={faCalendar}
                className="text-gray-500 mr-3"
              />
              <input
                type="datetime-local"
                {...register("endTime", {
                  required: "End Time is required",
                  validate: (value) => {
                    const selectedEndTime = new Date(value);
                    const selectedStartTime = new Date(startTime);
                    return (
                      selectedEndTime > selectedStartTime ||
                      "End time must be after start time"
                    );
                  },
                })}
                className={`w-full px-4 py-3 border ${
                  errors.endTime ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-base`}
                min={startTime || currentDateTime}
                disabled={isSubmitted}
              />
            </div>
            {errors.endTime && (
              <span className="text-red-500 text-sm">
                {errors.endTime.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-lg shadow-lg font-semibold hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            disabled={isSubmitted}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default TestForm;
