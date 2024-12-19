/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CreateCourseLessonContent from "./CreateCourseLessonContent";
import CourseLessonContent from "./CourseLessonContent";
import Confirm from "../../../components/common/Confirm";
import Notification from "../../../components/common/Notification";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import TestForm from "../../ExamTest/TestForm";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

const CourseLessonCard = ({
  mentorAndList,
  coursePartId,
  isEnrolled,
  isMentor,
}) => {
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

  const { courseId } = useParams();

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

      // Sau khi load các bài học, gọi fetchTestExams cho mỗi lesson
      response.data.courseLessons.forEach((lesson) => {
        fetchTestExams(lesson.id);
      });

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
      setIsCreateTest(true);
      setCategories([response.data]);
      setLessonId(lessonId);
    } catch (error) {
      console.error("Failed to fetch data from API", error);
    }
  };

  const fetchTestExams = async (lessonId) => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseLessons/GetTestExamByLessonId/${lessonId}`
      );
      if (Array.isArray(response.data) && response.data.length > 0) {
        setTestExams(response.data);
      } else {
        console.error("No TestExams found for the lesson.");
      }
    } catch (err) {
      console.error("Error fetching test exams:", err);
    }
  };

  const confirmActionHandler = async () => {
    try {
      await confirmAction();
      setNotification("Action completed successfully.");
    } catch (error) {
      console.error("Error executing confirm action:", error);
      setNotification("Action failed.");
    } finally {
      setConfirmOpen(false);
    }
  };

  const confirmDeleteLesson = (lessonId) => {
    // In ra lessonId để kiểm tra
    console.log(lessonId);

    // Sử dụng window.confirm() để hỏi người dùng
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this lesson?"
    );

    if (isConfirmed) {
      // Nếu người dùng xác nhận, thực hiện xóa
      axios
        .delete(`https://localhost:7030/api/CourseLessons/${lessonId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setNotification("Lesson deleted successfully.");
          refreshCourseLessons();
        })
        .catch((error) => {
          console.error("Error deleting lesson:", error);
          setNotification("Failed to delete the lesson.");
        });
    } else {
      // Nếu người dùng không xác nhận, không làm gì cả
      console.log("Lesson deletion cancelled.");
    }
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
                      className="border rounded-md p-2 mb-2 bg-gray-50 shadow-sm flex flex-col items-start relative"
                    >
                      <div
                        className="cursor-pointer flex justify-between w-full items-center bg-green-600 rounded-lg p-2 text-white gap-2"
                        onClick={() => toggleCollapse(courseLesson.id)}
                      >
                        {collapsedLessons[courseLesson.id] ? (
                          <FaAngleDown className="text-gray-600" />
                        ) : (
                          <FaAngleUp className="text-gray-600" />
                        )}
                        <div className="flex w-11/12 justify-between items-center">
                          <h4 className="text-md font-semibold">
                            {courseLesson.title}
                          </h4>
                          <button
                            type="button"
                            onClick={() => confirmDeleteLesson(courseLesson.id)}
                            className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-red-500 text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            Delete Lesson
                          </button>
                        </div>
                      </div>

                      {!collapsedLessons[courseLesson.id] &&
                        (isEnrolled || mentorAndList || isMentor) && (
                          <div className="mt-2 w-full ">
                            <CourseLessonContent
                              isEnrolled={isEnrolled}
                              courseLessontId={courseLesson.id}
                              key={courseLesson.id}
                            />
                            <div className="bg-green-50 p-6 rounded-lg shadow-lg">
                              <h3 className="font-extrabold text-2xl text-green-700 py-3 mb-5 border-b-2 border-green-200">
                                Practice Test
                              </h3>
                              {testExams
                                .filter(
                                  (exam) => exam.lessonId === courseLesson.id
                                )
                                .map((exam, index) => (
                                  <div
                                    key={exam.id}
                                    className="mb-4 bg-white p-4 rounded-lg shadow-md border border-gray-100"
                                  >
                                    <p className="text-gray-600 text-sm font-semibold">
                                      Test No. {index + 1}
                                    </p>
                                    <Link
                                      to={`/testDetail/${exam.id}`}
                                      className="inline-block mt-2 py-2 px-4 text-sm font-medium rounded-lg border border-green-300 bg-green-100 text-green-700 shadow-sm hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >
                                      {exam.testName}
                                    </Link>
                                  </div>
                                ))}

                              {mentorAndList && (
                                <div className="mt-6 flex justify-start gap-4">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCreateTest(courseLesson.id)
                                    }
                                    className="flex items-center py-2 px-4 text-sm font-medium rounded-lg border border-green-300 bg-green-700 text-white shadow-sm hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-green-300"
                                  >
                                    <FontAwesomeIcon
                                      icon={faClipboard}
                                      className="mr-2"
                                    />
                                    Create Test
                                  </button>
                                </div>
                              )}
                            </div>

                            {dynamicForms
                              .filter(
                                (form) => form.lessonId === courseLesson.id
                              )
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
                            <button
                              type="button"
                              onClick={() => addDynamicForm(courseLesson.id)}
                              className="py-2 px-3 text-sm font-medium rounded-lg mt-6 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            >
                              Create Lesson Content
                            </button>
                          </div>
                        )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <TestForm
          categories={categories}
          lessonId={lessonId}
          courseId={courseId}
          pageType="lesson"
          testType={1}
          setIsCreateTest={setIsCreateTest}
        />
      )}

      <Notification message={notification} />
      <Confirm
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmActionHandler}
        message="Are you sure you want to delete this lesson?"
      />
    </>
  );
};

export default CourseLessonCard;
