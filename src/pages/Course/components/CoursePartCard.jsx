import React, { useState } from "react";
import axios from "axios";
import CourseLessonCard from "../../Mentor/component/CourseLessonCard";
import CreateCourseLesson from "../../Mentor/component/CreateCourseLesson";

const CoursePartCard = ({
  courseId,
  coursePart,
  courseLessons,
  refreshCourseLessons,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Toggle collapse only when lesson form is not showing
  const toggleCollapse = () => {
    if (!showLessonForm) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleCreateLessonClick = () => {
    // Open the lesson form and ensure the collapse is open
    setShowLessonForm(true);
    setIsCollapsed(false);
  };

  const handleFormClose = () => {
    setShowLessonForm(false);
    setIsCreating(false);
  };

  const handleCreateLesson = async (lessonData) => {
    setIsCreating(true);
    try {
      await axios.post("https://localhost:7030/api/CourseLessons", lessonData);
      handleFormClose();
      refreshCourseLessons(coursePart.id); // Fetch lessons again after creation
    } catch (error) {
      console.error("Error creating lesson:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="border rounded-md p-4 mb-4 shadow-md relative">
      <button
        type="button"
        onClick={handleCreateLessonClick}
        disabled={isCreating}
        className="absolute top-4 right-4 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
      >
        {isCreating ? "Creating..." : "Create Lesson"}
      </button>

      <div onClick={toggleCollapse} className="cursor-pointer">
        <h3 className="text-lg font-semibold">{coursePart.title}</h3>
      </div>

      <div
        className={`mt-4 transition-all duration-1000 ease-in-out ${
          isCollapsed ? "max-h-0 opacity-0" : "opacity-100"
        }`}
        style={{
          maxHeight: isCollapsed ? 0 : "60vh", // Limit to 60vh when expanded
          overflowY: isCollapsed ? "hidden" : "auto", // Enable scrolling only when expanded
          transitionProperty: "max-height, opacity",
        }}
      >
        <div>
          <h4 className="font-semibold">Lessons</h4>
          {courseLessons.map((lesson) => (
            <CourseLessonCard
              key={lesson.id}
              courseLesson={lesson}
              coursePartId={coursePart.id}
            />
          ))}
          {showLessonForm && (
            <CreateCourseLesson
              coursePartId={coursePart.id}
              onClose={handleFormClose}
              onSubmit={handleCreateLesson}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePartCard;
