import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CreateCourseLessonContent from "./CreateCourseLessonContent";
import CourseLessonContent from "./CourseLessonContent";
import Confirm from "../../../components/common/Confirm";
import Notification from "../../../components/common/Notification";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import TestForm from "../../ExamTest/TestForm";
import { Link } from "react-router-dom";
const CourseLessonCard = ({ mentorAndList, coursePartId, isEnrolled }) => {
  const [collapsedLessons, setCollapsedLessons] = useState({});
  const [courseLessons, setCourseLessons] = useState([]);
  const [isCreateTest, setIsCreateTest] = useState(false);
  const [categories, setCategories] = useState([]);
  const [lessonId, setLessonId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dynamicForms, setDynamicForms] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => {});
  const [testExams, setTestExams] = useState([]);
  const token = Cookies.get("authToken");

  const toggleCollapse = (lessonId) => {
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

      const initialCollapsedState = response.data.courseLessons.reduce(
        (acc, lesson) => ({ ...acc, [lesson.id]: !mentorAndList }),
        {}
      );
      setCollapsedLessons(initialCollapsedState);

      setNotification("Course lessons loaded successfully.");
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch course lessons");
      setNotification("Failed to fetch course lessons.");
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
    setNotification("Dynamic form added successfully.");
  };

  const removeDynamicForm = (formId) => {
    setDynamicForms((prevForms) =>
      prevForms.filter((form) => form.id !== formId)
    );
    setNotification("Dynamic form removed successfully.");
  };

  const refreshCourseLessons = () => {
    fetchTestExams();
    setLoading(true);
    fetchCourseLessons();
    setNotification("Course lessons refreshed successfully.");
  };

  const handleCreateTest = async (lessonId) => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseSkills/DescriptionByCourseLesson/${lessonId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const skill = response.data;

      if (skill.length > 0) {
        setNotification("Test created successfully.");
      } else {
        setNotification("No course skill descriptions found for this lesson.");
      }
    } catch (error) {
      setNotification("Failed to create test.");
    }
  };

  const fetchTestExams = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseLessons/GetTestExamByLessonId/${courseLessonId}`
      );
      if (Array.isArray(response.data) && response.data.length > 0) {
        setTestExams(response.data); // Lưu danh sách bài kiểm tra vào state
      } else {
        console.error("No TestExams found for the class.");
      }
    } catch (err) {
      console.error("Error fetching test exams:", err);
    }
  };

  const confirmActionHandler = async () => {
    try {
      console.log("Executing confirm action..."); // Debug log
      await confirmAction();
      console.log("Action completed successfully."); // Debug log
      setNotification("Action completed successfully.");
      setIsCreateTest(true);
      setCategories([response.data]);
      setLessonId(lessonId);
    } catch (error) {
      console.error("Error executing confirm action:", error); // Debug log
      setNotification("Action failed.");
    } finally {
      setConfirmOpen(false);
    }
  };

  const confirmDeleteLesson = (lessonId) => {
    console.log("Setting confirm action for lesson ID:", lessonId); // Debug log
    setConfirmAction(() => async () => {
      try {
        await axios.delete(
          `https://localhost:7030/api/CourseLessons/${lessonId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Lesson deleted successfully."); // Debug log
        setNotification("Lesson deleted successfully.");
        refreshCourseLessons();
      } catch (error) {
        console.error("Error deleting lesson:", error); // Debug log
        setNotification("Failed to delete the lesson.");
      }
    });
    setConfirmOpen(true);
  };

  if (loading) {
    return <p>Loading lessons...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {!isCreateTest ? (
        <>
          {" "}
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
                      className="border rounded-md p-2 mb-2 shadow-sm flex flex-col items-start relative"
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

                      {mentorAndList && (
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Link
                            to={`/testDetail/${courseLesson.id}`}
                            className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                          >
                            Do Test
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleCreateTest(courseLesson.id)}
                            className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                          >
                            Create Test
                          </button>
                          <button
                            type="button"
                            onClick={() => addDynamicForm(courseLesson.id)}
                            className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                          >
                            Create Lesson Content
                          </button>
                          <button
                            type="button"
                            onClick={() => confirmDeleteLesson(courseLesson.id)}
                            className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-red-500 text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            Delete Lesson
                          </button>
                        </div>
                      )}

                      {dynamicForms
                        .filter((form) => form.lessonId === courseLesson.id)
                        .map((form) => (
                          <div key={form.id} className="mt-2 w-full">
                            <CreateCourseLessonContent
                              key={form.id}
                              courseLessonId={courseLesson.id}
                              onClose={() => removeDynamicForm(form.id)}
                              onContentCreated={refreshCourseLessons}
                            />
                          </div>
                        ))}

                      {!collapsedLessons[courseLesson.id] && (
                        <div className="mt-2 w-full">
                          <CourseLessonContent
                            courseLessontId={courseLesson.id}
                            key={courseLesson.id}
                          />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <Confirm
              isOpen={confirmOpen}
              onClose={() => setConfirmOpen(false)}
              onConfirm={confirmActionHandler}
              status="Confirmation"
              shoud="no"
              message="Are you sure you want to perform this action?"
            />

            <Notification
              message={notification}
              onClose={() => setNotification("")}
            />
          </div>
        </>
      ) : (
        <TestForm
          lessonId={lessonId}
          categories={categories}
          pageType={"lesson"}
        />
      )}
    </>
  );
};

export default CourseLessonCard;
