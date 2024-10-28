import React, { useState } from "react";
import QuestionBank from "./questionBank/QuestionBank";

const TestFormLayout = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderComponent = () => {
    switch (activeTab) {
      case "QuestionBanks":
        return <QuestionBank />;
      case "Dashboard":
        return <div>Dashboard Component</div>;
      case "Settings":
        return <div>Settings Component</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="me-2">
            <button
              type="button"
              onClick={() => setActiveTab("QuestionBanks")}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                activeTab === "Profile"
                  ? "text-blue-600 border-blue-600"
                  : "hover:text-gray-600 hover:border-gray-300"
              } dark:hover:text-gray-300`}
            >
              Question Bank
            </button>
          </li>
          <li className="me-2">
            <a
              href="#"
              onClick={() => setActiveTab("Dashboard")}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                activeTab === "Dashboard"
                  ? "text-blue-600 border-blue-600"
                  : "hover:text-gray-600 hover:border-gray-300"
              } dark:hover:text-gray-300`}
            >
              Test Submitted
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              onClick={() => setActiveTab("Settings")}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                activeTab === "Settings"
                  ? "text-blue-600 border-blue-600"
                  : "hover:text-gray-600 hover:border-gray-300"
              } dark:hover:text-gray-300`}
            >
              Settings
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-4">{renderComponent()}</div>
    </div>
  );
};

export default TestFormLayout;
