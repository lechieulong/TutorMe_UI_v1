import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CreateCourseLessonContent from "./CreateCourseLessonContent";
import CourseLessonContent from "./CourseLessonContent";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const CourseLessonCard = ({
  mentorAndList,
  coursePartId,
  userRole,
  isEnrolled,
}) => {
  const [collapsedLessons, setCollapsedLessons] = useState({});
  const [courseLessons, setCourseLessons] = useState([]);
  const [lessionCount, setLessionCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dynamicForms, setDynamicForms] = useState([]);
  const token = Cookies.get("authToken");

  const toggleCollapse = (lessonId) => {
    if (!mentorAndList && !isEnrolled) return;

    setCollapsedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const fetchCourseLessons = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseLessons/CoursePart/${coursePartId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourseLessons(response.data.courseLessons);

      if (!mentorAndList) {
        // Set all lessons as collapsed initially
        const initialCollapsedState = response.data.courseLessons.reduce(
          (acc, lesson) => ({ ...acc, [lesson.id]: true }),
          {}
        );
        setCollapsedLessons(initialCollapsedState);
      }

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch course lessons");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coursePartId) {
      fetchCourseLessons();
    }
  }, [coursePartId]);

  const addDynamicForm = (lessonId) => {
    setDynamicForms((prevForms) => [
      ...prevForms,
      { id: Date.now(), lessonId: lessonId },
    ]);
  };

  const removeDynamicForm = (formId) => {
    setDynamicForms((prevForms) =>
      prevForms.filter((form) => form.id !== formId)
    );
  };

  const handleCreateTest = async (lessonId) => {
    try {
      console.log("Lesson ID:", lessonId);
      const response = await axios.get(
        `https://localhost:7030/api/CourseSkills/DescriptionByCourseLesson/${lessonId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("API Response Data:", response.data);
    } catch (error) {
      console.error("Failed to fetch data from API", error);
    }
  };

  if (loading) {
    return <p>Loading lessons...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="h-vh100 px-4 mb-4 relative">
      <div className="cursor-pointer">
        <h3 className="text-sm font-semibold text-gray-400">
          {courseLessons.length} Lessons
        </h3>
      </div>

      <div className="mt-4 overflow-hidden transition-all duration-1000 ease-in-out">
        <div>
          {courseLessons.length === 0 ? (
            <p>No lessons found for this course part.</p>
          ) : (
            courseLessons.map((courseLesson) => (
              <div
                key={courseLesson.id}
                className="border rounded-md p-2 mb-2 shadow-sm flex flex-col items-start"
              >
                <div
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => toggleCollapse(courseLesson.id)}
                >
                  {collapsedLessons[courseLesson.id] ? (
                    <FaAngleDown className="text-gray-600" />
                  ) : (
                    <FaAngleUp className="text-gray-600" />
                  )}
                  <h4 className="text-md font-semibold">
                    {courseLesson.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => handleCreateTest(courseLesson.id)}
                  className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  Create Test
                </button>
                {!collapsedLessons[courseLesson.id] && (
                  <>
                    {mentorAndList &&
                      dynamicForms
                        .filter((form) => form.lessonId === courseLesson.id)
                        .map((form) => (
                          <div key={form.id} className="mt-2 w-full">
                            <CreateCourseLessonContent
                              courseLessonId={courseLesson.id}
                              onClose={() => removeDynamicForm(form.id)}
                            />
                          </div>
                        ))}

                    <CourseLessonContent
                      courseLessontId={courseLesson.id}
                      key={courseLesson.id}
                    />
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseLessonCard;
