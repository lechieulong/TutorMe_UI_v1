import React from "react";
import TestView from "../TestExam/TestView";

const PreviewTest = ({ data }) => {
  return (
    <div className="p-4">
      {data && data.skills ? (
        Object.keys(data.skills).map((skillName) => (
          <TestView key={skillName} skillData={data.skills[skillName]} />
        ))
      ) : (
        <p className="">No data available. Please fill out the form.</p>
      )}
    </div>
  );
};

export default PreviewTest;
