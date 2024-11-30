import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
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
import {
  FaStopwatch,
  FaRegLightbulb,
  FaRegListAlt,
  FaRegStickyNote,
  FaRegPlayCircle,
} from "react-icons/fa";

const CourseDetail = () => {
  const { className, courseId } = useParams();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);

  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.classes);
  const switchStates = useSelector((state) => state.classes.switchStates);

  const isEnrolled = useSelector((state) => state.enrollment.isEnrolled);

  const isReviewPath = location.pathname.includes("/review");
  console.log("URL contains /review:", isReviewPath);

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
    dispatch(fetchClasses(courseId))
      .then(() => {
        alert("Danh sách lớp học đã được cập nhật!");
      })
      .catch((error) => {
        console.error("Failed to reload classes:", error);
        alert("Không thể tải lại danh sách lớp học. Vui lòng thử lại.");
      });
    handleCloseCreateClass();
  };

  return (
    <MainLayout>
      <div className="flex w-screen h-full">
        <MentorSidebar />

        <div className="flex-1 bg-gray-100 overflow-y-auto p-6 indent-0">
          <div className="mx-auto bg-houseGreen text-white rounded-lg shadow-lg flex flex-col lg:flex-row p-8 space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="flex flex-col lg:w-2/3">
              <h1 className="text-3xl font-bold mb-4">C# cơ bản</h1>
              <p className="mb-4 leading-relaxed">
                Khóa học lập trình C# kèm thực hành, khóa học sẽ giúp bạn làm
                quen với lập trình cũng như tạo nền tảng tư duy và kỹ năng cơ
                bản khi giải các bài tập.
              </p>
              <div className="flex items-center text-sm space-x-4 mb-4">
                <span>
                  Tác giả{" "}
                  <a href="#" className="text-blue-300 underline">
                    namle
                  </a>
                </span>
                <span className="flex items-center">
                  <i className="fas fa-user mr-1"></i> 44486 Học viên
                </span>
                <span className="flex items-center">
                  <i className="fas fa-star text-yellow-400 mr-1"></i> 4.4
                </span>
              </div>
            </div>

            {/* Right Section - Course Information and CTA */}
            <div className="bg-lightGreen p-6 rounded-lg w-full lg:w-1/3 flex flex-col items-center text-center shadow-md">
              <h2 className="text-2xl text-black font-bold mb-4">Miễn phí</h2>

              <h3 className="text-lg text-houseGreen font-semibold mb-4">
                The course information
              </h3>

              <ul className="space-y-3 mb-6 text-sm text-black">
                <li className="flex items-center justify-center space-x-2">
                  <FaStopwatch className="text-houseGreen" />
                  <span>26 hours</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <FaRegLightbulb className="text-houseGreen" />
                  <span>1 overall test</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <FaRegListAlt className="text-houseGreen" />
                  <span>81 progress tests</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <FaRegStickyNote className="text-houseGreen" />
                  <span>10 units</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <FaRegPlayCircle className="text-houseGreen" />
                  <span>25 lessons</span>
                </li>
              </ul>
              <button
                className="bg-accentGreen hover:bg-accentGreen-dark text-white py-2 px-4 rounded-lg w-full flex items-center justify-center transition duration-300"
                onClick={handleEnroll}
              >
                Enroll now
              </button>
            </div>
          </div>

          <div
            className="flex-1 p-4"
            style={{ maxHeight: "calc(100vh - 65px)", overflowY: "auto" }}
          >
            <div className="mt-2">
              <CourseSkillCard
                isReviewPath={isReviewPath}
                courseId={courseId}
                userRole={userRole}
                isEnrolled={isEnrolled}
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

export default CourseDetail;
