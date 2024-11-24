import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import CourseLessonCard from "../../Mentor/component/CourseLessonCard";
import CreateCourseLesson from "../../Mentor/component/CreateCourseLesson";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const CoursePartCard = ({ mentorAndList, skillId, userRole, isEnrolled }) => {
  const [courseParts, setCourseParts] = useState([]);
  const [collapsedParts, setCollapsedParts] = useState({});
  const [showLessonForm, setShowLessonForm] = useState({});
  const [error, setError] = useState(null);
  const [lessonCreatedTrigger, setLessonCreatedTrigger] = useState(0);

  const fetchCourseParts = useCallback(async () => {
    if (!skillId) return;
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseParts/ByCourseSkill/${skillId}`
      );
      // Sắp xếp courseParts theo trường order trước khi set vào state
      const sortedCourseParts = response.data.sort((a, b) => a.order - b.order);
      setCourseParts(sortedCourseParts);
      const initialCollapsedState = sortedCourseParts.reduce((acc, part) => {
        acc[part.id] = true;
        return acc;
      }, {});
      setCollapsedParts(initialCollapsedState);

      setError(null);
    } catch (err) {
      setError("No course part found.");
    }
  }, [skillId]);

  useEffect(() => {
    fetchCourseParts();
  }, [skillId, fetchCourseParts, lessonCreatedTrigger]);

  const toggleCollapse = (partId) => {
    setCollapsedParts((prev) => ({
      ...prev,
      [partId]: !prev[partId],
    }));
  };

  const handleCreateLessonClick = (partId) => {
    setShowLessonForm((prev) => ({
      ...prev,
      [partId]: true,
    }));
    setCollapsedParts((prev) => ({
      ...prev,
      [partId]: false,
    }));
  };

  const handleFormClose = (partId) => {
    setShowLessonForm((prev) => ({
      ...prev,
      [partId]: false,
    }));
  };

  const handleLessonCreated = () => {
    console.log("Lesson created. Reloading Course Parts...");
    setLessonCreatedTrigger((prev) => prev + 1);
    setShowLessonForm({});
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 mb-4">
      {courseParts.map((coursePart) => (
        <div
          key={coursePart.id}
          className="border rounded-md p-4 mb-4 shadow-md bg-[#EEEDEB]"
        >
          <div className="flex gap-2 justify-end">
            {mentorAndList && (
              <>
                <button
                  type="button"
                  onClick={() => handleCreateLessonClick(coursePart.id)}
                  className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  Create Lesson
                </button>
              </>
            )}
          </div>

          <div
            onClick={() => toggleCollapse(coursePart.id)}
            className="cursor-pointer flex items-center gap-2"
          >
            {collapsedParts[coursePart.id] ? (
              <FaAngleDown className="text-gray-500" />
            ) : (
              <FaAngleUp className="text-gray-500" />
            )}
            <h3 className="text-lg font-semibold">{coursePart.title}</h3>
          </div>
          {showLessonForm[coursePart.id] && (
            <CreateCourseLesson
              coursePartId={coursePart.id}
              onClose={() => handleFormClose(coursePart.id)}
              onCreated={handleLessonCreated}
            />
          )}
          <div
            className={`transition-all duration-500 ease-in-out ${
              collapsedParts[coursePart.id]
                ? "max-h-0 opacity-0"
                : "opacity-100"
            }`}
            style={{
              maxHeight: collapsedParts[coursePart.id] ? 0 : "60vh",
              overflowY: collapsedParts[coursePart.id] ? "hidden" : "auto",
              transitionProperty: "max-height, opacity",
            }}
          >
            <CourseLessonCard
              mentorAndList={mentorAndList}
              coursePartId={coursePart.id}
              onLessonCreated={handleLessonCreated}
              userRole={userRole}
              isEnrolled={isEnrolled}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursePartCard;
