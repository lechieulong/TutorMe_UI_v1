import React from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboard,
  faClock,
  faCalendar,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { createTest } from "../../redux/testExam/TestSlice";
import { useDispatch } from "react-redux";

const TestForm = ({ sectionCourseId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    try {
      const payload = { ...data, sectionCourseId };
      dispatch(createTest(payload));
      toast.success("Create test successful!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed.");
    }
  };

  const currentDateTime = new Date().toISOString().slice(0, 16);

  const startTime = watch("startTime");

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl"
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
            />
          </div>
          {errors.testName && (
            <span className="text-red-500 text-sm">
              {errors.testName.message}
            </span>
          )}
        </div>

        {/* Class */}
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
                data-hs-select='{
                  "placeholder": "Select multiple options...",
                  "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                  "dropdownClasses": "mt-2 z-50 w-full max-h-60 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
                  "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
                  "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-blue-600\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                }'
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
            <span className="text-red-500 text-sm">{errors.class.message}</span>
          )}
        </div>

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
              min={currentDateTime} // Disable past times
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
            <FontAwesomeIcon icon={faCalendar} className="text-gray-400 mr-2" />
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
              min={startTime || currentDateTime} // Disable times before start time
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
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default TestForm;
