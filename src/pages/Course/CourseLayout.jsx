import React, { useState } from "react";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import MainLayout from "../../layout/MainLayout";
import TestFormLayout from "../ExamTest/TestFormLayout";
import Course from "./CourseModified/Course";
import { useParams, useLocation } from "react-router-dom";
import TestForm from "../ExamTest/TestForm";

const CourseLayout = () => {
  const [selectedComponent, setSelectedComponent] = useState("CourseDetail");
  const [skills, setSkills] = useState([]);
  const [createTest, setCreateTest] = useState(false);

  const { courseId } = useParams();
  const location = useLocation();
  const urlRouter = location.pathname.split("/")[1];
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "TestFormLayout":
        return <TestFormLayout />;
      case "CourseDetail":
        return (
          <Course
            courseId={courseId}
            setCreateTest={setCreateTest}
            setSkills={setSkills}
          />
        );
      default:
        return (
          <Course
            courseId={courseId}
            setCreateTest={setCreateTest}
            setSkills={setSkills}
          />
        );
    }
  };

  return (
    <MainLayout>
      {createTest ? (
        <TestForm skills={skills} />
      ) : (
        <div className="flex flex-start ">
          {urlRouter != "courseDetail" && (
            <div className="w-2/12">
              <MentorSidebar setSelectedComponent={setSelectedComponent} />
            </div>
          )}

          <div className="flex-1 p-6">{renderSelectedComponent()}</div>
        </div>
      )}
    </MainLayout>
  );
};

export default CourseLayout;
