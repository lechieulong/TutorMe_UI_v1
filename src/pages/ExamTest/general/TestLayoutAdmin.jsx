import React, { useState } from "react";
import TestForm from "../TestForm";
import TestList from "../../ADMIN/TestList";

const TestLayoutAdmin = () => {
  const [activeTab, setActiveTab] = useState("Tests");
  const [isCreateTest, setIsCreateTest] = useState(true);

  const renderComponent = () => {
    switch (activeTab) {
      case "Tests":
        return <>{isCreateTest && <TestList />}</>;
      case "CreateTest":
        return (
          <>
            <TestForm pageType={"admin"} setIsCreateTest={setIsCreateTest} />
          </>
        );
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
              onClick={() => setActiveTab("Tests")}
              className={`inline-flex items-center justify-center px-6 border border-green-700  hover:border-green-800  rounded-t-lg ${
                activeTab === "Tests"
                  ? "text-accentGreen-600 border-accentGreen bg-green-700 text-white" // Active state
                  : "hover:text-gray-600 hover:border-gray-300"
              } dark:hover:text-gray-300`}
            >
              Test
            </button>
          </li>
          <button
            type="button"
            onClick={() => setActiveTab("CreateTest")}
            className={`inline-flex items-center justify-center border-1 border-green-700  px-6 text-black   rounded-t-lg ${
              activeTab === "CreateTest"
                ? "text-accentGreen-600 border-accentGreen bg-green-700 text-white " // Active state
                : "hover:text-green-70 "
            } dark:hover:text-gray-300`}
          >
            Create test
          </button>
        </ul>
      </div>

      <div className="p-7">{renderComponent()}</div>
    </div>
  );
};

export default TestLayoutAdmin;
