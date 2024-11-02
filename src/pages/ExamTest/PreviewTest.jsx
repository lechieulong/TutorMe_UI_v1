import React from "react";
import TestLayout from "../TestExam/TestLayout";

const PreviewTest = ({ data }) => {
  return (
    <div className="p-4">
      {data && data.skills ? (
        <div className="mr-52 bg-red-50">
          <TestLayout skillsData={data.skills} />
        </div>
      ) : (
        <p className="">No data available. Please fill out the form.</p>
      )}
    </div>
  );
};

export default PreviewTest;
