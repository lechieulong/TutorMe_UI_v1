import React, { useState } from "react";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import TestForm from "../ExamTest/TestForm";
import MainLayout from "../../layout/MainLayout";
import CourseDetail from "./CourseDetail";

const CourseLayout = () => {
  const [selectedComponent, setSelectedComponent] = useState("CourseDetail");

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "TestForm":
        return <TestForm />;
      case "CourseDetail":
        return <CourseDetail />;
      default:
        return <CourseDetail />;
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-start ">
        <div className="w-2/12">
          <MentorSidebar setSelectedComponent={setSelectedComponent} />
        </div>
        <div className="flex-1 mt-10">
          <div className="flex-1 mt-10">{renderSelectedComponent()}</div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseLayout;
