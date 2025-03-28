/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
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
import TestInfoCard from "./general/TestInfoCard";
import { getUser } from "../../service/GetUser";
import { Roles } from "../../utils/config";

const TestForm = ({
  classId,
  lessonId,
  skillIdCourse,
  categories,
  pageType,
  courseId,
  setIsCreateTest,
  testType,
  setActiveTab,
}) => {
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
  const [user, setUser] = useState(null);
  const onSubmit = async (data) => {
    setIsSubmitted(true);

    const selectedTestType = testType || data.testType;

    const payload = {
      ...data,
      classId,
      lessonId,
      skillIdCourse,
      courseId,
      testType: selectedTestType,
    };

    dispatch(createTest(payload)).then((result) => {
      if (result.type == "test/createTest/fulfilled") {
        toast.success("Create test success ");
        setTestInfo(result.payload);
      } else {
        setIsSubmitted(false);

        toast.error("Failed to create test");
      }
    });
  };

  useEffect(() => {
    const userFromToken = getUser();
    setUser(userFromToken);
  }, []);

  const currentDateTime = new Date().toISOString().slice(0, 16);
  const startTime = watch("startTime");

  return (
    <div className="w-full">
      {isSubmitted && testInfo ? (
        !showTestFormDetail ? (
          <TestInfoCard
            testInfo={testInfo}
            setShowTestFormDetail={setShowTestFormDetail}
          />
        ) : (
          <CreateTest
            courseId={courseId}
            skills={categories}
            testId={testInfo?.id}
            pageType={pageType}
            classId={classId}
            setIsCreateTest={setIsCreateTest}
          />
        )
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-8 max-w-lg mx-auto p-6 bg-white rounded-2xl border border-gray-200"
        >
          {/* Test Name */}
          <div className="relative">
            <div className="flex justify-between items-center mb-4  ">
              <p className="font-bold text-xl">Test Form</p>
              <button
                type="button"
                onClick={() => setIsCreateTest(false)}
                className="border border-red-500"
              >
                Close{" "}
              </button>
            </div>
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

          {/* Test Type */}
          {/* <div className="relative mt-4">
            <label className="block text-sm font-semibold text-gray-700">
              Test Type
            </label>
            <div className="flex items-center mt-2">
              <select
                {...register("testType", { required: "Test Type is required" })}
                className={`w-full px-4 py-3 border ${
                  errors.testType ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-base`}
                disabled={isSubmitted}
              >
                <option value={0}>Select Test Type</option>
                <option value={1}>Practice</option>
                <option value={2}>Testing</option>
                <option value={3}>Register</option>
              </select>
            </div>
            {errors.testType && (
              <span className="text-red-500 text-sm">
                {errors.testType.message}
              </span>
            )}
          </div> */}

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
          {user?.role?.includes(Roles.ADMIN) && (
            <div className="relative mt-4">
              <label className="block text-sm font-semibold text-gray-700">
                Test Type
              </label>
              <div className="mt-2">
                <select
                  {...register("testType", {
                    required: "Test Type is required",
                  })}
                  className={`w-full px-4 py-3 border ${
                    errors.testType ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-base`}
                  disabled={isSubmitted}
                >
                  <option value="" disabled>
                    Select a test type
                  </option>
                  <option value={3}>Normal test</option>
                  <option value={4}>Register</option>
                </select>
              </div>
              {errors.testType && (
                <span className="text-red-500 text-sm">
                  {errors.testType.message}
                </span>
              )}
            </div>
          )}

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
