import React from "react";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import TestForm from "../ExamTest/TestForm";
import MainLayout from "../../layout/MainLayout";

const CreateTestLayout = () => {
  return (
    <MainLayout>
      <div className="flex flex-start ">
        <div className="w-2/12">
          <MentorSidebar />
        </div>
        <div className="flex-1 mt-10">
          <TestForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateTestLayout;
