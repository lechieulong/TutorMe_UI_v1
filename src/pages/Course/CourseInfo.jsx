import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../layout/MainLayout";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import { getUser } from "../../service/GetUser";
import ClassCard from "../Class/components/ClassCard";
import CourseSkillCard from "../Mentor/component/CourseSkillCard";
import { CheckUserEnrollment } from "../../redux/Enrollment/EnrollmentSlice";
import { fetchClasses } from "../../redux/classes/ClassSlice";
import { enrollUser } from "../../redux/Enrollment/EnrollmentSlice";
import CreateClass from "../Class/CreateClass";
import { CheckLecturerOfCourse } from "../../redux/courses/CourseSlice";
import { GetCourseById } from "../../redux/courses/CourseSlice";
import { formatCurrency } from "../../utils/Validator";
import {
  FaStopwatch,
  FaRegLightbulb,
  FaRegListAlt,
  FaRegStickyNote,
  FaRegPlayCircle,
  FaRegGrinStars,
} from "react-icons/fa";

const CourseInfo = () => {
  const { className, courseId } = useParams();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [skillCount, setSkillCount] = useState(0);
  const { course, checkLecturer } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.classes);
  const switchStates = useSelector((state) => state.classes.switchStates);
  const isEnrolled = useSelector((state) => state.enrollment.isEnrolled);
  const initializeUser = useCallback(() => {
    const userFromToken = getUser();
    const userIdFromToken = userFromToken?.sub;
    const userRoleFromToken = userFromToken?.role;

    if (userIdFromToken) setUserId(userIdFromToken);
    if (userRoleFromToken) setUserRole(userRoleFromToken);
  }, []);

  useEffect(() => {
    initializeUser();
    dispatch(fetchClasses(courseId));
  }, [initializeUser, dispatch, courseId]);

  useEffect(() => {
    if (userId) {
      dispatch(CheckUserEnrollment({ userId, courseId })).then((result) => {
        console.log("Enrollment check completed:", result);
      });
    }
    dispatch(CheckLecturerOfCourse(courseId));
    dispatch(GetCourseById(courseId));
  }, [dispatch, userId, courseId]);

  const handleEnroll = () => {
    if (!selectedClassId || !userId || !courseId) {
      alert("Bạn chưa chọn lớp");
      return;
    }
    dispatch(enrollUser({ courseId, userId, classId: selectedClassId }))
      .unwrap()
      .then(() => {
        alert("Enrollment successful!");
        dispatch(CheckUserEnrollment({ userId, courseId }));
      })
      .catch((error) => {
        console.error("Enrollment failed", error);
        alert("Enrollment failed.");
      });
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(prevSlide + 1, Math.ceil(classes.length / 4) - 1)
    );
  };

  const handleClassCardClick = (classId) => {
    setSelectedClassId(classId);
    console.log(`Selected ClassId: ${classId}`);
  };

  const handleOpenCreateClass = () => setIsCreateClassOpen(true);
  const handleCloseCreateClass = () => setIsCreateClassOpen(false);

  const handleCreateClassSuccess = () => {
    dispatch(fetchClasses(courseId));
    handleCloseCreateClass();
  };

  return (
    <MainLayout>
      <div className="flex w-screen h-full">
        <MentorSidebar />

        <div className="flex-1 bg-gray-100 overflow-y-auto p-6 indent-0">
          <div className="mx-auto bg-houseGreen text-white rounded-lg shadow-lg flex flex-col lg:flex-row p-8 space-y-8 lg:space-y-0 lg:space-x-8">
            {/* Left Section - Course Details */}
            <div className="flex flex-col lg:w-2/3">
              <h1 className="text-3xl font-bold mb-4">{course?.courseName}</h1>
              <p className="mb-4 leading-relaxed">{course?.content}</p>
              <div className="flex items-center text-sm space-x-4 mb-4">
                <span>
                  Lecturer:{" "}
                  <Link
                    to={`/coachingschedule/${course?.username}`}
                    className="text-blue-300 underline"
                  >
                    {course?.teacherName}
                  </Link>
                </span>
                <span className="flex items-center">
                  {course?.enrollmentCount} students
                </span>
                <span className="flex items-center">
                  4.4 <FaRegGrinStars />
                  <FaRegGrinStars />
                  <FaRegGrinStars />
                  <FaRegGrinStars />
                </span>
              </div>
            </div>

            <div className="bg-lightGreen p-4 rounded-lg w-full lg:w-1/3 flex flex-col items-center text-center shadow-md">
              <h2 className="text-2xl text-black font-bold mb-4">
                {formatCurrency(course?.price)}
              </h2>

              <ul className="flex flex-wrap justify-center items-center gap-4 text-sm text-black mb-6">
                <li className="flex items-center space-x-2">
                  <FaStopwatch className="text-houseGreen" />
                  <span>{course?.hours} hours</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaRegLightbulb className="text-houseGreen" />
                  <span>1 overall test</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaRegListAlt className="text-houseGreen" />
                  <span>81 progress tests</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaRegStickyNote className="text-houseGreen" />
                  <span>{skillCount} Skills</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaRegPlayCircle className="text-houseGreen" />
                  <span>25 lessons</span>
                </li>
              </ul>

              {checkLecturer ? (
                <button className="bg-accentGreen hover:bg-accentGreen-dark text-white py-2 px-4 rounded-lg w-full flex items-center justify-center transition-transform transform hover:scale-95 duration-500">
                  Enroll
                </button>
              ) : isEnrolled?.isEnrolled ? (
                <button className="bg-accentGreen hover:bg-accentGreen-dark text-white py-2 px-4 rounded-lg w-full flex items-center justify-center transition duration-300">
                  Go to course
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="bg-accentGreen hover:bg-accentGreen-dark text-white py-2 px-4 rounded-lg w-full flex items-center justify-center transition duration-300"
                >
                  Enroll now
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col bg-white border w-full shadow-sm rounded-xl p-4 relative group mb-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-bold text-gray-800">Classes</h4>
              {userRole !== "USER" && (
                <button
                  type="button"
                  className="py-2 px-3 text-sm font-medium rounded-lg border bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none"
                  onClick={handleOpenCreateClass}
                >
                  Create Class
                </button>
              )}
            </div>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {classes.map((classItem) => (
                  <ClassCard
                    key={classItem.id}
                    userRole={userRole}
                    classItem={classItem}
                    switchState={switchStates[classItem.id] || false}
                    onSelect={() => handleClassCardClick(classItem.id)}
                    isActive={selectedClassId === classItem.id}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-2">
              <button
                onClick={handlePrev}
                className="py-2 px-3 text-sm font-medium rounded-lg border bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none"
                disabled={currentSlide === 0}
              >
                Prev
              </button>
              <button
                onClick={handleNext}
                className="py-2 px-3 text-sm font-medium rounded-lg border bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none"
                disabled={currentSlide >= Math.ceil(classes.length / 4) - 1}
              >
                Next
              </button>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="mt-2">
              <CourseSkillCard
                isCourseLecture={checkLecturer}
                courseId={courseId}
                userRole={userRole}
                isEnrolled={isEnrolled}
                onSkillCountUpdate={setSkillCount}
              />
            </div>
          </div>
        </div>
      </div>
      {isCreateClassOpen && (
        <CreateClass
          courseId={courseId}
          onClose={handleCloseCreateClass}
          onCreateSuccess={handleCreateClassSuccess}
        />
      )}
    </MainLayout>
  );
};

export default CourseInfo;
