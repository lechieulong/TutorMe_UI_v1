import React, { useState, useRef, useEffect } from "react";
import Answer from "../../components/Test/Answer";
import Topic from "../../components/Test/Topic";
import NavigationPart from "../../components/Test/NavigationPart";

const TestView = ({ receivedData, isPreview, skillName }) => {
  const questionRef = useRef({});
  const [isOpenSideView, setOpenSideView] = useState(false);
  const [partData, setPartData] = useState([]); // Store parts data
  const [selectedPart, setSelectedPart] = useState(0); // Store the index of the selected part
  const [leftWidth, setLeftWidth] = useState(50); // Width of the side view

  useEffect(() => {
    if (receivedData && receivedData.parts) {
      setPartData(receivedData.parts); // Set partData from receivedData
      setSelectedPart(0); // Initially select the first part
      setOpenSideView(skillName !== "Listening" && skillName !== "Speaking"); // Show side view if skill is not Listening or Speaking
    } else {
      setPartData([]); // Reset partData if no parts found
    }
  }, [receivedData, skillName]);

  const startResizing = (e) => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  };

  const handleMouseMove = (e) => {
    const newWidth = Math.min(
      100,
      Math.max(10, (e.clientX / window.innerWidth) * 100)
    );
    setLeftWidth(newWidth);
  };

  const stopResizing = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  };

  const handleQuestionClick = (questionId) => {
    if (questionRef.current[questionId]) {
      questionRef.current[questionId].scrollIntoView();
    }
  };

  // Handle when a part is clicked, update selectedPart state
  const handlePartClick = (partNumber) => {
    setSelectedPart(partNumber); // Update selected part index
  };

  return (
    <div className="relative flex flex-col h-screen">
      <div className="flex justify-between h-full">
        <h3 className="font-semibold text-2xl mt-2">{skillName}</h3>

        {isOpenSideView && partData.length > 0 && (
          <div
            className="overflow-auto"
            style={{
              width: `${leftWidth}%`,
              height: "calc(100% - 112px)",
              marginTop: "60px",
            }}
          >
            {/* Render Topic based on selectedPart */}
            <Topic partData={partData[selectedPart]} />
          </div>
        )}

        {isOpenSideView && partData.length > 0 && (
          <div
            className="cursor-ew-resize w-2 bg-black"
            style={{
              width: "4px",
              height: "calc(100% - 112px)",
              marginTop: "70px",
            }}
            onMouseDown={startResizing} // Placeholder for resizing logic
          />
        )}

        <div
          className="overflow-auto flex-grow"
          style={{
            width: `${100 - leftWidth}%`,
            height: "calc(100% - 112px)",
            marginTop: "70px",
          }}
        >
          {/* Pass selected part data to the Answer component */}
          {/* <Answer
            skillPart={skillName}
            part={selectedPart}
            partData={partData[selectedPart]} // Pass selected part data
            refs={questionRef}
          /> */}
        </div>

        {/* NavigationPart component for navigating between parts */}
        <div className="flex flex-col">
          {isOpenSideView && partData.length > 0 && (
            <NavigationPart
              partData={partData} // Pass all part data
              handlePartClick={handlePartClick} // Pass click handler to update selected part
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestView;
