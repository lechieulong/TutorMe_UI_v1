import React from "react";

const PreviewTest = ({ data }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Preview Test</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data available. Please fill out the form.</p>
      )}
    </div>
  );
};

export default PreviewTest;
