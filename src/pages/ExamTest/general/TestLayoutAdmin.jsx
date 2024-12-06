import React, { useState } from "react";
import TestForm from "../TestForm";

const TestLayoutAdmin = () => {
  const [activeTab, setActiveTab] = useState("Reading");

  const renderComponent = () => {
    switch (activeTab) {
      case "Reading":
        return <p>Hello</p>;
      case "Listening":
        return <p>Hello</p>;
      case "Writing":
        return <p>Hello</p>;
      case "Speaking":
        return <p>Hello</p>;
      case "CreateTest":
        return <TestForm pageType={"admin"} testType={3} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full  ">
      <div className="border-b flex items-center justify-between border-gray-200 dark:border-gray-700">
        <ul className="flex p-2 flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="me-2">
            <button
              type="button"
              onClick={() => setActiveTab("Reading")}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                activeTab === "Reading"
                  ? "text-accentGreen-600 border-accentGreen" // Active state
                  : "hover:text-gray-600 hover:border-gray-300"
              } dark:hover:text-gray-300`}
            >
              Reading
            </button>
          </li>
          <li className="me-2">
            <button
              type="button"
              onClick={() => setActiveTab("Listening")}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                activeTab === "Listening"
                  ? "text-accentGreen-600 border-accentGreen" // Active state
                  : "hover:text-gray-600 hover:border-gray-300"
              } dark:hover:text-gray-300`}
            >
              Listening
            </button>
          </li>
          <li className="me-2">
            <button
              type="button"
              onClick={() => setActiveTab("Writing")}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                activeTab === "Writing"
                  ? "text-accentGreen-600 border-accentGreen" // Active state
                  : "hover:text-gray-600 hover:border-gray-300"
              } dark:hover:text-gray-300`}
            >
              Writing
            </button>
          </li>
          <li className="me-2">
            <button
              type="button"
              onClick={() => setActiveTab("Speaking")}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                activeTab === "Speaking"
                  ? "text-accentGreen-600 border-accentGreen" // Active state
                  : "hover:text-gray-600 hover:border-gray-300"
              } dark:hover:text-gray-300`}
            >
              Speaking
            </button>
          </li>
        </ul>
        <button
          type="button"
          onClick={() => setActiveTab("CreateTest")}
          className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
            activeTab === "CreateTest"
              ? "text-accentGreen-600 border-accentGreen" // Active state
              : "hover:text-gray-600 hover:border-gray-300"
          } dark:hover:text-gray-300`}
        >
          Create test
        </button>
      </div>
      <div className="p-7">{renderComponent()}</div>
    </div>
  );
};

export default TestLayoutAdmin;
