import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import MainLayout from "../../layout/MainLayout";
import { getUser } from "../../service/GetUser";
import ClassCard from "../Class/components/ClassCard";
import CourseSkillCard from "./component/CourseSkillCard";
import Rating from "../../components/common/Rating";
import { CheckUserEnrollment } from "../../redux/Enrollment/EnrollmentSlice";
import { fetchClasses } from "../../redux/classes/ClassSlice";

const CourseDetail = () => {
  const { className, courseId } = useParams();
  const location = useLocation();
  const Skill = location.state?.Skill;
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Lấy dữ liệu classes và trạng thái switch từ Redux
  const classes = useSelector((state) => state.classes.classes);
  const switchStates = useSelector((state) => state.classes.switchStates);
  const classesStatus = useSelector((state) => state.classes.status);
  const isEnrolled = useSelector((state) => state.enrollment.isEnrolled);

  // Lấy userId và role từ token
  const initializeUser = useCallback(() => {
    const userFromToken = getUser();
    const userIdFromToken = userFromToken?.sub;
    const userRoleFromToken = userFromToken?.role;

    if (userIdFromToken) setUserId(userIdFromToken);
    if (userRoleFromToken) setUserRole(userRoleFromToken);
  }, []);

  useEffect(() => {
    initializeUser();
    dispatch(fetchClasses(courseId)); // Gọi fetchClasses từ Redux
  }, [initializeUser, dispatch, courseId]);

  useEffect(() => {
    if (userId) {
      dispatch(CheckUserEnrollment({ userId, courseId }));
    }
  }, [dispatch, userId, courseId]);

  const handleEnroll = async () => {
    if (!selectedClassId || !userId || !courseId) {
      alert("Bạn chưa chọn lớp");
      return;
    }
    try {
      const enrollmentData = {
        courseId,
        userId,
        classId: selectedClassId,
      };
      await axios.post("https://localhost:7030/api/enrollment", enrollmentData);
      alert("Enrollment successful!");
      dispatch(CheckUserEnrollment({ userId, courseId })); // Cập nhật trạng thái sau khi đăng ký thành công
    } catch (error) {
      console.error("Enrollment failed", error);
      alert("Enrollment failed.");
    }
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

  return (
    <MainLayout>
      <div className="flex flex-col w-screen">
        <div className="flex flex-1 mt-16 w-full">
          <MentorSidebar />
          <div className="flex-1 p-4">
            <div className="flex justify-start items-center mb-4">
              <p className="text-black font-bold text-4xl">{className}</p>
            </div>

            {/* Chỉ render nút Enroll nếu người dùng chưa đăng ký */}
            {userRole === "USER" && !isEnrolled && (
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                onClick={handleEnroll}
              >
                Enroll
              </button>
            )}

            {/* Chỉ render danh sách lớp nếu người dùng chưa đăng ký */}
            {!isEnrolled && (
              <div className="flex flex-col bg-white border w-full shadow-sm rounded-xl p-4 md:p-5 relative group mb-4">
                <div className="mt-4 relative">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-bold text-gray-800">Classes</h4>
                    {userRole !== "USER" && (
                      <button
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                        onClick={() =>
                          navigate("/createClass", { state: { courseId } })
                        }
                      >
                        Create Class
                      </button>
                    )}
                  </div>

                  <div className="overflow-hidden">
                    <div
                      className="flex transition-transform duration-500"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
                    >
                      {classes.map((classItem) => (
                        <ClassCard
                          userRole={userRole}
                          key={classItem.id}
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
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      disabled={currentSlide === 0}
                    >
                      Prev
                    </button>
                    <button
                      onClick={handleNext}
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      disabled={
                        currentSlide >= Math.ceil(classes.length / 4) - 1
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <CourseSkillCard courseId={courseId} userRole={userRole} />
            </div>
            <div className="mt-8">
              {/* {userRole === "USER" && isEnrolled && (
                <Rating userId={userId} courseId={courseId} />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetail;
