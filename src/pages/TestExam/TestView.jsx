import React, { useState, useRef, useEffect } from "react";
import AnswerView from "./AnswerView";
import Topic from "../../components/Test/Topic";
import NavigationPart from "../../components/Test/NavigationPart";

const TestView = ({ skillData }) => {
  const questionRef = useRef({});
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenSideView, setOpenSideView] = useState(false);
  const [partDatas, setPartDatas] = useState([]);
  const [selectedPart, setSelectedPart] = useState(0);
  const [leftWidth, setLeftWidth] = useState(50);

  useEffect(() => {
    setIsLoading(true);
    setOpenSideView(skillData.type !== 1 && skillData.type !== 3);

    if (skillData && skillData.parts) {
      setPartDatas(skillData.parts);
      setSelectedPart(0);
    } else {
      setPartDatas([]);
    }

    setIsLoading(false);
  }, [skillData]);

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

  const handlePartClick = (partNumber) => {
    setSelectedPart(partNumber); // Update selected part index
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!partDatas || partDatas.length === 0) {
    return <div>No parts available for this test.</div>;
  }

  return (
    <div className="relative flex flex-col h-screen">
      <div className="flex justify-between h-full">
        <h3 className="font-semibold text-2xl mt-2">Skill ... </h3>

        {/* Show the side view and topic when applicable */}
        {isOpenSideView && partDatas.length > 0 && (
          <>
            <div
              className="overflow-auto"
              style={{
                width: `${leftWidth}%`,
                height: "calc(100% - 112px)",
                marginTop: "60px",
              }}
            >
              {/* Render Topic based on selectedPart */}
              <Topic partData={partDatas[selectedPart]} />
            </div>

            <div
              className="cursor-ew-resize w-2 bg-black"
              style={{
                width: "4px",
                height: "calc(100% - 112px)",
                marginTop: "70px",
              }}
              onMouseDown={startResizing} // Handle resizing logic
            />
          </>
        )}

        <div
          className="overflow-auto flex-grow"
          style={{
            width: `${100 - leftWidth}%`,
            height: "calc(100% - 112px)",
            marginTop: "70px",
          }}
        >
          {/* Render AnswerView for the selected part */}
          <AnswerView partData={partDatas[selectedPart]} refs={questionRef} />
        </div>

        {/* NavigationPart component for navigating between parts */}
        <div className="flex flex-col">
          {isOpenSideView && partDatas.length > 0 && (
            <NavigationPart
              partDatas={partDatas} // Pass all part data
              handlePartClick={handlePartClick} // Handle part click to update selected part
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestView;
