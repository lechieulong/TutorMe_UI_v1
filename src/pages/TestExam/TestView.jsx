import React, { useState, useRef, useEffect } from "react";
import AnswerView from "./AnswerView";
import Topic from "../../components/Test/Topic";
import NavigationPart from "../../components/Test/NavigationPart";

const TestView = React.memo(
  ({ skillData, currentSkillKey, handleAnswerChange }) => {
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
      <div
        className=" flex flex-col h-full "
        style={{
          height: "calc(100vh - 80px)",
        }}
      >
        <div className="flex h-full ">
          {isOpenSideView && partDatas.length > 0 && (
            <>
              <div
                className="overflow-auto"
                style={{
                  width: `${leftWidth}%`,
                  height: "100%",
                }}
              >
                {/* Render Topic based on selectedPart */}
                <Topic partData={partDatas[selectedPart]} />
              </div>

              <div
                className="cursor-ew-resize w-2 bg-black"
                style={{
                  width: "4px",
                }}
                onMouseDown={startResizing} // Handle resizing logic
              />
            </>
          )}
          <div
            className="overflow-auto flex-grow p-2"
            style={{
              width: `${100 - leftWidth}%`,
            }}
          >
            <AnswerView
              partData={partDatas[selectedPart]}
              refs={questionRef}
              currentSkillKey={currentSkillKey}
              handleAnswerChange={handleAnswerChange}
            />
          </div>
        </div>

        <div className="flex flex-col">
          {partDatas.length > 0 && (
            <NavigationPart
              partDatas={partDatas} // Pass all part data
              handlePartClick={handlePartClick} // Handle part click to update selected part
            />
          )}
        </div>
      </div>
    );
  }
);

export default TestView;
