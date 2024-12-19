import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import MainLayout from "../../layout/MainLayout";
import ClassCard from "../Class/components/ClassCard";
import CourseSkillCard from "./component/CourseSkillCard";
import { FaFlag } from "react-icons/fa";
import Report from "../../components/common/Report";
import useAuthToken from "../../hooks/useAuthToken";
import {
  CheckUserEnrollment,
  enrollUser,
} from "../../redux/Enrollment/EnrollmentSlice";
import { fetchClasses } from "../../redux/classes/ClassSlice";
import {
  fetchSkills,
  fetchSkillDescription,
} from "../../redux/courses/CourseSkillSlice";
import CreateClass from "../Class/CreateClass";
import Rating from "../../components/common/Rating";
import Notification from "../../components/common/Notification";
import Confirm from "../../components/common/Confirm";
import axios from "axios";
import { formatCurrency } from "../../utils/Validator";
import {
  FaRegStar,
  FaStarHalfAlt,
  FaStar,
  FaStopwatch,
  FaRegLightbulb,
  FaRegListAlt,
  FaRegStickyNote,
  FaRegPlayCircle,
} from "react-icons/fa";
import { getUser } from "../../service/GetUser";
import { LecturerOfCourse } from "../../redux/courses/CourseSlice";
import { GetCourseById } from "../../redux/courses/CourseSlice";
import { CheckBanlance, GiveMeMyMoney } from "../../components/common/PayOS";
import Comment from "../../components/common/Comment";
const MentorCourseDetail = () => {
  const navigate = useNavigate();
  const { className, courseId } = useParams();
  const location = useLocation();
  const [skillCount, setSkillCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [userName, setUsername] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [notification, setNotification] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmStatus, setConfirmStatus] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => {});
  const [isMentor, setIsMentor] = useState(false);
  const [course, setCourse] = useState(null);
  const [notificationUpdated, setNotificationUpdated] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => ({
    classes: state.classes.classes[courseId] || [], // Lấy danh sách lớp học theo courseId
  }));
  const switchStates = useSelector((state) => state.classes.switchStates || {});
  const isEnrolled = useSelector(
    (state) => state.enrollment.isEnrolled || false
  );
  const isReviewPath = location.pathname.includes("/review");
  const { fromMentorCourseList = false } = location.state || {};
  const mentorAndList = isMentor && fromMentorCourseList;
  const authToken = useAuthToken();
  const initializeUser = useCallback(() => {
    const userFromToken = getUser();
    setUserId(userFromToken?.sub);
    setUsername(userFromToken?.name);
  }, []);
  const handleOpenReport = () => {
    setIsReportOpen(true);
  };
  const handleCloseReport = () => {
    setIsReportOpen(false);
  };
  const handleSubmitReport = () => {
    handleCloseReport();
  };
  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const courseDetail = await dispatch(GetCourseById(courseId)).unwrap(); // Truyền courseId vào action
        setCourse(courseDetail); // Kết quả trả về là thông tin chi tiết của khóa học
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      }
    };

    if (courseId) {
      fetchCourseDetail();
    }
  }, [dispatch, courseId]);

  useEffect(() => {
    initializeUser();
    if (courseId) {
      dispatch(fetchClasses(courseId));
      dispatch(fetchSkills(courseId));
    }
  }, [initializeUser, dispatch, courseId]);

  useEffect(() => {
    if (userId && courseId) {
      dispatch(CheckUserEnrollment({ userId, courseId }));
    }
  }, [dispatch, userId, courseId]);

  const handleDeleteClassSuccess = () => {
    dispatch(fetchClasses(courseId));
  };
  const updateClassSuccessfull = () => {
    dispatch(fetchClasses(courseId));
  };
  useEffect(() => {
    const checkIfRated = async () => {
      if (!userId || !courseId) return;

      try {
        const response = await axios.get(
          `https://localhost:7030/api/CourseRating/${courseId}/ratings`,
          { params: { userId } }
        );
        setHasRated(response?.data?.length > 0);
      } catch {
        setHasRated(false);
      }
    };
    checkIfRated();
  }, [userId, courseId]);

  useEffect(() => {
    const checkIfMentor = async () => {
      try {
        const { data } = await axios.get(
          `https://localhost:7030/api/Courses/check-lecturer?courseId=${courseId}&userId=${userId}`
        );
        setIsMentor(!!data.result);
      } catch {
        setIsMentor(false);
      }
    };
    checkIfMentor();
  }, [userId, courseId]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <FaStar key={`full-${index}`} className="text-yellow-500" />
          ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <FaRegStar key={`empty-${index}`} className="text-gray-300" />
          ))}
      </>
    );
  };

  const handleEnroll = async () => {
    if (authToken == null) {
      navigate("/login");
    }
    if (!selectedClassId) {
      setNotification("Bạn chưa chọn lớp.");
      return;
    }

    const price = course?.price;

    const hasSufficientBalance = await CheckBanlance(price);
    if (!hasSufficientBalance) {
      const userChoice = window.confirm(
        "Số dư không đủ. Bạn có muốn nạp tiền không?"
      );
      if (userChoice) {
        window.location.href = "/Payment";
      } else {
        setNotification("Đăng ký thất bại! Bạn không có đủ tiền.");
      }
      return;
    }

    setConfirmMessage("Are you sure you want to enroll this course?");
    setConfirmStatus("Enroll");
    setConfirmAction(() => async () => {
      try {
        await GiveMeMyMoney(
          userId,
          price * -1,
          `Enroll in course ${course?.name}`
        );
        await GiveMeMyMoney(
          course?.userId,
          price,
          `Your course has been enrolled by ${userName}`
        );

        await dispatch(
          enrollUser({ courseId, userId, classId: selectedClassId })
        ).unwrap();

        setNotification("Đăng ký thành công!");
        dispatch(CheckUserEnrollment({ userId, courseId }));
      } catch (error) {
        setNotification("Đăng ký thất bại! Vui lòng thử lại.");
      }
      setIsConfirmOpen(false);
    });

    setIsConfirmOpen(true);
  };

  const handlePrev = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentSlide((prev) =>
      Math.min(prev + 1, Math.ceil(classes.length / 4) - 1)
    );

  const handleOpenCreateClass = () => setIsCreateClassOpen(true);
  const handleCloseCreateClass = () => setIsCreateClassOpen(false);

  const handleCreateTestClick = (skillId) => {
    dispatch(fetchSkillDescription(skillId))
      .unwrap()
      .catch(() => {});
  };
  useEffect(() => {
    if (userId) {
      dispatch(CheckUserEnrollment({ userId, courseId }));
    }
    dispatch(LecturerOfCourse(courseId));
    dispatch(GetCourseById(courseId));
  }, [dispatch, userId, courseId]);

  const handleOpenRating = () => setIsRatingOpen(true);
  const handleCloseRating = async () => {
    setIsRatingOpen(false);
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseRating/${courseId}/ratings`,
        { params: { userId } }
      );
      setHasRated(response?.data?.length > 0);
    } catch {
      console.log();
    }
  };

  useEffect(() => {
    if ((mentorAndList || isMentor) && !notificationUpdated) {
      setNotification("This is your course!");
      setNotificationUpdated(true);
    }
  }, [mentorAndList, isMentor, notificationUpdated]);

  return (
    <MainLayout>
      <div className="flex flex-col w-screen">
        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification("")}
          />
        )}
        <Confirm
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={confirmAction}
          message={confirmMessage}
          status={confirmStatus}
        />
        <div className="flex w-full">
          <MentorSidebar mentorAndList={true} isMentor={true} />
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="mx-auto bg-houseGreen text-white rounded-lg shadow-lg flex flex-col lg:flex-row p-8 space-y-8 lg:space-y-0 lg:space-x-8 ">
              <div className="flex flex-col lg:w-2/3">
                <h1 className="text-3xl font-bold mb-4">
                  {course?.courseName}
                </h1>
                <div className="mb-4 flex justify-between items-center">
                  <h1 className="text-4xl font-bold text-black">{className}</h1>
                </div>
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
                    {course?.enrollmentCount !== undefined
                      ? `${course.enrollmentCount} students`
                      : "No students"}
                  </span>

                  <div className="flex items-center">
                    <span className="ml-2">
                      {course?.averageRating?.toFixed(1)}
                    </span>
                    {renderStars(course?.averageRating || 0)}
                  </div>
                </div>
              </div>
              <div className="bg-lightGreen p-4 rounded-lg w-full lg:w-1/3 flex flex-col items-center text-center shadow-md relative h-auto lg:h-[200px]">
                {isEnrolled && (
                  <button
                    onClick={handleOpenReport}
                    className="absolute top-2 right-2 text-red-700 text-xl"
                  >
                    <FaFlag />
                  </button>
                )}

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
                {!mentorAndList && !isEnrolled && !isMentor && (
                  <button
                    onClick={handleEnroll}
                    className="bg-accentGreen hover:bg-accentGreen-dark text-white py-2 px-4 rounded-lg w-full flex items-center justify-center transition duration-300"
                  >
                    Enroll now
                  </button>
                )}
              </div>
            </div>
            <section className="mb-4 mt-4">
              {(mentorAndList || !isEnrolled) && (
                <>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold">Classes</p>
                    {mentorAndList && (
                      <button
                        className="py-2 px-3 text-sm font-medium rounded-lg border bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                        onClick={handleOpenCreateClass}
                      >
                        Create Class
                      </button>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <div
                      className="flex transition-transform"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
                    >
                      {classes.map((classItem) => (
                        <ClassCard
                          key={classItem.id}
                          classItem={classItem}
                          switchState={switchStates[classItem.id] || false}
                          onSelect={() => setSelectedClassId(classItem.id)}
                          isActive={selectedClassId === classItem.id}
                          mentorAndList={mentorAndList}
                          handleDeleteClassSuccess={handleDeleteClassSuccess}
                          updateClassSuccessfull={updateClassSuccessfull}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={handlePrev}
                      disabled={currentSlide === 0}
                      className="py-2 px-3 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300"
                    >
                      Prev
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={
                        currentSlide >= Math.ceil(classes.length / 4) - 1
                      }
                      className="py-2 px-3 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </section>
            <div className="mt-4">
              <CourseSkillCard
                isReviewPath={isReviewPath}
                courseId={courseId}
                isEnrolled={isEnrolled}
                mentorAndList={mentorAndList}
                onCreateTestClick={handleCreateTestClick}
                onSkillCountUpdate={setSkillCount}
                isMentor={isMentor}
              />
              <Comment courseId={courseId} />
            </div>
          </div>
        </div>
      </div>
      {isRatingOpen && (
        <Rating
          courseId={courseId}
          userId={userId}
          onClose={handleCloseRating}
        />
      )}
      {isCreateClassOpen && (
        <CreateClass
          courseId={courseId}
          onClose={handleCloseCreateClass}
          onCreateSuccess={() => dispatch(fetchClasses(courseId))}
        />
      )}
      {isReportOpen && (
        <Report
          userId={userId}
          courseId={courseId}
          onSubmit={handleSubmitReport}
          onClose={handleCloseReport} // Truyền hàm đóng qua props
        />
      )}
    </MainLayout>
  );
};

export default MentorCourseDetail;
