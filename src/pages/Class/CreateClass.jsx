/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createClass } from "../../redux/classes/ClassSlice";

const CreateClass = ({ courseId, onClose, onCreateSuccess }) => {
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [count, setCount] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const dispatch = useDispatch();
  const [inputErrors, setInputErrors] = useState({
    className: false,
    classDescription: false,
    count: false,
  });

  const validateFields = () => {
    return !Object.values(inputErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const newClass = {
      className,
      classDescription,
      count: 100,
      courseId,
      isEnabled,
    };
    try {
      await dispatch(createClass({ newClass })).unwrap();
      onCreateSuccess(); // Call callback if provided
      onClose(); // Close form
    } catch (error) {
      onCreateSuccess(); // Call callback if provided
      onClose(); // Close form
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
        <h2 className="text-2xl font-bold mb-4">Create New Class</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Class Name
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => {
                setClassName(e.target.value);
                setInputErrors((prev) => ({ ...prev, className: false }));
              }}
              required
              className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                inputErrors.className ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              value={classDescription}
              onChange={(e) => {
                setClassDescription(e.target.value);
                setInputErrors((prev) => ({
                  ...prev,
                  classDescription: false,
                }));
              }}
              required
              className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                inputErrors.classDescription
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              rows="3"
            ></textarea>
          </div>

            <div className="mb-4 grid grid-cols-2 gap-4"></div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={(e) => setIsEnabled(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-semibold">Activate</span>
            </label>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 mr-4 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Create Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
