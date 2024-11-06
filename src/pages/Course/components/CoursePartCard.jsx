import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseLessonCard from "../../Mentor/component/CourseLessonCard";
import CreateCourseLesson from "../../Mentor/component/CreateCourseLesson";

const CoursePartCard = ({ skillId, userRole }) => {
  const [courseParts, setCourseParts] = useState([]);
  const [collapsedParts, setCollapsedParts] = useState({});
  const [showLessonForm, setShowLessonForm] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!skillId) return;

    const fetchCourseParts = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7030/api/CourseParts/ByCourseSkill/${skillId}`
        );
        setCourseParts(response.data);
        const initialCollapsedState = response.data.reduce((acc, part) => {
          acc[part.id] = true;
          return acc;
        }, {});
        setCollapsedParts(initialCollapsedState);
        setError(null);
      } catch (err) {
        setError("Failed to fetch course parts.");
      }
    };

    fetchCourseParts();
  }, [skillId]);

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

  const handleCreateTestClick = async (partId) => {
    console.log("Create Test clicked for Part ID:", partId);
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseSkills/DescriptionByCoursePart/${partId}`
      );
      console.log("Course Part Description:", response.data);
    } catch (error) {
      console.error("Failed to fetch description:", error);
    }
  };

  const handleFormClose = (partId) => {
    setShowLessonForm((prev) => ({
      ...prev,
      [partId]: false,
    }));
  };

  const handleLessonCreated = () => {
    setShowLessonForm({});
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="border rounded-md p-4 mb-4 shadow-md relative">
      {courseParts.map((coursePart) => (
        <div key={coursePart.id} className="mb-4">
          <div className="flex gap-2 absolute top-4 right-4">
            {/* Render buttons only if userRole is not just "USER" */}
            {userRole && !(userRole.length === 1 && userRole[0] === "USER") && (
              <>
                <button
                  type="button"
                  onClick={() => handleCreateLessonClick(coursePart.id)}
                  className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  Create Lesson
                </button>
                <button
                  type="button"
                  onClick={() => handleCreateTestClick(coursePart.id)}
                  className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  Create Test
                </button>
              </>
            )}
          </div>

          <div
            onClick={() => toggleCollapse(coursePart.id)}
            className="cursor-pointer"
          >
            <h3 className="text-lg font-semibold">{coursePart.title}</h3>
          </div>

          <div
            className={`mt-4 transition-all duration-500 ease-in-out ${
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
              coursePartId={coursePart.id}
              onLessonCreated={handleLessonCreated}
              userRole={userRole} // Pass the userRole to CourseLessonCard
            />

            {showLessonForm[coursePart.id] && (
              <CreateCourseLesson
                coursePartId={coursePart.id}
                onClose={() => handleFormClose(coursePart.id)}
                onCreated={handleLessonCreated}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursePartCard;
