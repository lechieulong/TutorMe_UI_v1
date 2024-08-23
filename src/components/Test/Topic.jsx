import React from "react";

const Topic = ({ partData, part }) => {
  const reading = partData[part];

  if (!reading) {
    return <p>Reading part not found.</p>;
  }

  return (
    <div className="p-5">
      <h2 className="text-lg  mb-4">{reading.name}</h2>
      <p className="font-semibold">{reading.content}</p>
    </div>
  );
};

export default Topic;
