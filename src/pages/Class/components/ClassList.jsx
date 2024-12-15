import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchClasses } from "../../../redux/classes/ClassSlice";
import ClassCard from "./ClassCard";

const ClassList = ({
  courseId,
  currentSlide,
  switchStates,
  handlePrev,
  handleNext,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { classes, status, error } = useSelector((state) => state.classes);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchClasses(courseId)); // Fetch classes when courseId changes
    }
  }, [courseId, dispatch]);

  const handleCreateSuccess = () => {
    dispatch(fetchClasses(courseId)); // Refetch classes after creation
  };

  const handleDeleteClassSuccess = () => {
    dispatch(fetchClasses(courseId)); // Refetch classes after deletion
  };

  if (status === "loading") {
    return <p>Loading classes...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="flex flex-col bg-white border w-full shadow-sm rounded-xl p-4 md:p-5 relative group mb-4">
      <div className="mt-4 relative">
        <div className="flex justify-between items-center">
          <h4 className="text-md font-bold text-gray-800">Classes</h4>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            onClick={() =>
              navigate("/createClass", {
                state: { courseId, onCreateSuccess: handleCreateSuccess },
              })
            }
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
                handleDeleteClassSuccess={handleDeleteClassSuccess} // Pass the function to ClassCard
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
