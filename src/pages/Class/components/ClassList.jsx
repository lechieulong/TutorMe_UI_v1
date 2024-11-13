// ClassList.js

import React from "react";
import ClassCard from "./ClassCard"; // Đảm bảo đường dẫn đúng với vị trí ClassCard

const ClassList = ({
  classes,
  currentSlide,
  setCurrentSlide,
  switchStates,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="flex flex-col bg-white border w-full shadow-sm rounded-xl p-4 md:p-5 relative group mb-4">
      <div className="mt-4 relative">
        <div className="flex justify-between items-center">
          <h4 className="text-md font-bold text-gray-800">Classes</h4>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            onClick={() => navigate("/createClass", { state: { courseId } })}
          >
            Create Class
          </button>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {classes.map((classItem) => (
              <ClassCard
                key={classItem.id}
                classItem={classItem}
                switchState={switchStates[classItem.id] || false}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <button
            onClick={handlePrev}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            disabled={currentSlide === 0}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            disabled={currentSlide >= Math.ceil(classes.length / 4) - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassList;
