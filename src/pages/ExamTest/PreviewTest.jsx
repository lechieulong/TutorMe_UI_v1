import React from "react";
import TestLayout from "../TestExam/TestLayout";

const PreviewTest = ({ data }) => {
  const filteredSkills = Object.fromEntries(
    Object.entries(data.skills || {}).filter(([, value]) => value !== undefined)
  );

  return (
    <div className="p-4">
      {Object.keys(filteredSkills).length > 0 ? (
        <TestLayout skillsData={filteredSkills} />
      ) : (
        <p>No data available. Please fill out the form.</p>
      )}
    </div>
  );
};

export default PreviewTest;
