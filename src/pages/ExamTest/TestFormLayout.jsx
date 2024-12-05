import React, { useState } from "react";
import QuestionBank from "./questionBank/QuestionBank";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import Header from "../../components/common/Header";
import TestSubmitted from "./TestSubmitted";
import ContributionAttempt from "./general/ContributionAttempt";
import TestHistory from "./general/TestHistory";
import { getUser } from "../../service/GetUser";
import { Roles } from "../../utils/config";

const TestFormLayout = () => {
  const user = getUser();

  const initActiveTab =
    user?.role?.includes(Roles.ADMIN) || user?.role?.includes(Roles.TEACHER)
      ? "QuestionBanks"
      : "Settings";

  const [activeTab, setActiveTab] = useState(initActiveTab);

  const renderComponent = () => {
    switch (activeTab) {
      case "QuestionBanks":
        return <QuestionBank />;
      case "Dashboard":
        return <TestSubmitted />;
      case "Settings":
        return <ContributionAttempt />;
      case "History":
        return <TestHistory />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="flex w-screen">
        <MentorSidebar />
        <div className="w-full ">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex p-2 flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              {(user?.role?.includes(Roles.ADMIN) ||
                user?.role?.includes(Roles.TEACHER)) && (
                <li className="me-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("QuestionBanks")}
                    className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                      activeTab === "QuestionBanks"
                        ? "text-accentGreen-600 border-accentGreen" // Active state
                        : "hover:text-gray-600 hover:border-gray-300"
                    } dark:hover:text-gray-300`}
                  >
                    Question Bank
                  </button>
                </li>
              )}

              {(user?.role?.includes(Roles.ADMIN) ||
                user?.role?.includes(Roles.TEACHER)) && (
                <li className="me-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("Dashboard")}
                    className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                      activeTab === "Dashboard"
                        ? "text-accentGreen-600 border-accentGreen" // Active state
                        : "hover:text-gray-600 hover:border-gray-300"
                    } dark:hover:text-gray-300`}
                  >
                    Test Submitted
                  </button>
                </li>
              )}

              <li className="me-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("Settings")}
                  className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                    activeTab === "Settings"
                      ? "text-accentGreen-600 border-accentGreen" // Active state
                      : "hover:text-gray-600 hover:border-gray-300"
                  } dark:hover:text-gray-300`}
                >
                  Test Analysis
                </button>
              </li>
              <li className="me-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("History")}
                  className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                    activeTab === "History"
                      ? "text-accentGreen-600 border-accentGreen" // Active state
                      : "hover:text-gray-600 hover:border-gray-300"
                  } dark:hover:text-gray-300`}
                >
                  History
                </button>
              </li>
            </ul>
          </div>
          <div className="p-7">{renderComponent()}</div>
        </div>
      </div>
    </>
  );
};

export default TestFormLayout;
