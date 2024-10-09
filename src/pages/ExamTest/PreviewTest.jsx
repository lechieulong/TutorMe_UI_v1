import React from "react";
import TestView from "../TestExam/TestView";

const PreviewTest = ({ data }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Preview Test</h1>
      {data && data.skills ? (
        Object.keys(data.skills).map((skillName) => (
          <TestView
            key={skillName}
            receivedData={data.skills[skillName]}
            isPreview={true}
            skillName={skillName}
          />
        ))
      ) : (
        <p>No data available. Please fill out the form.</p>
      )}
    </div>
  );
};

export default PreviewTest;
