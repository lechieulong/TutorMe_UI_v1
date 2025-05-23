import React, { useState, useEffect } from "react";
import QuestionBank from "./questionBank/QuestionBank";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import Header from "../../components/common/Header";
import TestSubmitted from "./TestSubmitted";
import ContributionAttempt from "./general/ContributionAttempt";
import TestHistory from "./general/TestHistory";
import { getUser } from "../../service/GetUser";
import { Roles } from "../../utils/config";
import { useSelector } from "react-redux";

const TestFormLayout = () => {
  const user = getUser();
  const [isViewExplain, setIsViewExplain] = useState(false);
  const initActiveTab =
    user?.role?.includes(Roles.ADMIN) || user?.role?.includes(Roles.TEACHER)
      ? "QuestionBanks"
      : "Settings";
  const [activeTab, setActiveTab] = useState(initActiveTab);
  const isEnrolled = useSelector((state) => state.enrollment.isEnrolled);
  const { showReport } = location.state || {};

  const renderComponent = () => {
    switch (activeTab) {
      case "QuestionBanks":
        return <QuestionBank />;
      case "Dashboard":
        return (
          <TestSubmitted
            setIsViewExplain={setIsViewExplain}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        );
      case "Results":
        return (
          <TestSubmitted
            setIsViewExplain={setIsViewExplain}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        );
      case "Settings":
        return <ContributionAttempt />;
      case "History":
        return <TestHistory />;
      default:
        return null;
    }
  };
  return (
    <div>
      {!isViewExplain && <Header />}
      <div className="flex w-screen  ">
        {!isViewExplain && (
          <MentorSidebar isEnrolled={isEnrolled} showReport={showReport}/>
        )}

        <div
          className={`w-full ${
            !isViewExplain ? "h-[90vh]" : "h-[100vh]"
          } overflow-y-auto`}
        >
          {!isViewExplain && (
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
          )}

          <div className="">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default TestFormLayout;
