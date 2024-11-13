import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CreateCourseLessonContent from "./CreateCourseLessonContent";
import CourseLessonContent from "./CourseLessonContent";

const CourseLessonCard = ({
  isReviewPath,
  coursePartId,
  userRole,
  isEnrolled,
}) => {
  const [collapsedLessons, setCollapsedLessons] = useState({});
  const [courseLessons, setCourseLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dynamicForms, setDynamicForms] = useState([]);
  const token = Cookies.get("authToken");

  const toggleCollapse = (lessonId) => {
    // Chỉ cho phép toggle collapse khi cả isReviewPath và isEnrolled đều là true
    if (isReviewPath && isEnrolled) {
      setCollapsedLessons((prev) => ({
        ...prev,
        [lessonId]: !prev[lessonId],
      }));
    }
  };

  const fetchCourseLessons = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseLessons/CoursePart/${coursePartId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourseLessons(response.data);
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

  console.log(isReviewPath + " " + isEnrolled); // Giữ nguyên dòng này

  return (
    <div className="h-vh100 p-4 mb-4 shadow-md relative">
      <div className="cursor-pointer">
        <h3 className="text-lg font-semibold text-red-600">Lessons</h3>
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
                <h4
                  className="text-md font-semibold cursor-pointer"
                  onClick={() => toggleCollapse(courseLesson.id)}
                >
                  {courseLesson.title}
                </h4>

                <div className="flex gap-2 mt-2">
                  {userRole !== "USER" && !isReviewPath && (
                    <>
                      <button
                        type="button"
                        className="py-2 px-3 text-sm font-medium bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                        onClick={() => addDynamicForm(courseLesson.id)}
                      >
                        Thêm nội dung mới
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCreateTest(courseLesson.id)}
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      >
                        Create Test
                      </button>
                    </>
                  )}
                </div>

                {/* Hiển thị CourseLessonContent khi lesson không bị collapsed */}
                {!collapsedLessons[courseLesson.id] && (
                  <CourseLessonContent
                    courseLessontId={courseLesson.id}
                    key={courseLesson.id}
                  />
                )}

                {/* Hiển thị dynamicForms nếu có */}
                {!collapsedLessons[courseLesson.id] &&
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseLessonCard;
