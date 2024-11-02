import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboard,
  faClock,
  faCalendar,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { createTest } from "../../redux/testExam/TestSlice"; // Assuming createTest is the correct import
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CreateTest from "./CreateTest";
import MainLayout from "../../layout/MainLayout";
import { useLocation } from "react-router-dom";

const TestForm = ({ sectionCourseId, skills, classId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();

  const location = useLocation();
  const { courseTimelineDetailId, categories } = location.state || {
    courseTimelineDetailId: null,
    categories: [],
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [testInfo, setTestInfo] = useState(null);
  const [showTestFormDetail, setShowTestFormDetail] = useState(false); // New state to control TestFormDetail display

  const onSubmit = async (data) => {
    setIsSubmitted(true);
    try {
      const sectionCourseId = courseTimelineDetailId; // Ensure courseTimelineDetailId is valid
      const payload = { ...data, sectionCourseId };

      const result = await dispatch(createTest(payload)).unwrap();
      setTestInfo(result);

      toast.success("Create test successful!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed.");
    }
  };

  const currentDateTime = new Date().toISOString().slice(0, 16);
  const startTime = watch("startTime");

  return (
    <MainLayout>
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
          <CreateTest skills={categories} testId={testInfo.id} />
        )
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-6 mt-7 max-w-lg mx-auto bg-white shadow-lg rounded-xl"
        >
          {/* Test Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Test Name
            </label>
            <div className="flex items-center mt-1">
              <FontAwesomeIcon icon={faTable} className="text-gray-400 mr-2" />
              <input
                type="text"
                {...register("testName", { required: "Test Name is required" })}
                className={`w-full px-4 py-3 border ${
                  errors.testName ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                disabled={isSubmitted}
              />
            </div>
            {errors.testName && (
              <span className="text-red-500 text-sm">
                {errors.testName.message}
              </span>
            )}
          </div>

          {/* Class */}
          {classId && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Class
              </label>
              <div className="flex items-center mt-1 w-full">
                <FontAwesomeIcon
                  icon={faChalkboard}
                  className="text-gray-400 mr-2"
                />
                <div className="flex-1">
                  <select
                    multiple
                    {...register("class", { required: "Class is required" })}
                    className="relative py-3 ps-4 pe-9 w-full cursor-pointer border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitted}
                  >
                    <option value="e6a750a4-1217-4a3e-8e91-1702ed3ef13d">
                      Choose
                    </option>
                    <option value="e6a750a4-1217-4a3e-8e91-1702ed3ef93d">
                      Class 1
                    </option>
                    <option value="e6a750a4-1217-4a3e-8e91-1702ed3ef83d">
                      Class 2
                    </option>
                  </select>
                </div>
              </div>
              {errors.class && (
                <span className="text-red-500 text-sm">
                  {errors.class.message}
                </span>
              )}
            </div>
          )}

          {/* Start Time */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <div className="flex items-center mt-1">
              <FontAwesomeIcon icon={faClock} className="text-gray-400 mr-2" />
              <input
                type="datetime-local"
                {...register("startTime", {
                  required: "Start Time is required",
                  validate: (value) => {
                    const selectedTime = new Date(value);
                    const now = new Date();
                    return (
                      selectedTime >= now || "Start time cannot be in the past"
                    );
                  },
                })}
                className={`w-full px-4 py-3 border ${
                  errors.startTime ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
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
            <label className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <div className="flex items-center mt-1">
              <FontAwesomeIcon
                icon={faCalendar}
                className="text-gray-400 mr-2"
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
                } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
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
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg shadow hover:bg-green-600 focus:ring-2 focus:ring-green-500"
            disabled={isSubmitted}
          >
            Submit
          </button>
        </form>
      )}
    </MainLayout>
  );
};

export default TestForm;
