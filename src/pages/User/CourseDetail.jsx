import { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import MainLayout from "../../layout/MainLayout";
import ClassCard from "../Class/components/ClassCard";
import CourseSkillCard from "../Mentor/component/CourseSkillCard";
import Comment from "../../components/common/Comment";
import RatingTeacher from "../../components/common/RatingTeacher";
import Report from "../../components/common/Report";
import useAuthToken from "../../hooks/useAuthToken";
import apiURLConfig from "../../redux/common/apiURLConfig";
import Rating from "../../components/common/Rating";
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
import {
  fetchSkills,
  fetchSkillDescription,
} from "../../redux/courses/CourseSkillSlice";
import {
  CheckUserEnrollment,
  enrollUser,
} from "../../redux/Enrollment/EnrollmentSlice";
import { toast, ToastContainer } from "react-toastify";
import { getUser } from "../../service/GetUser";
import { LecturerOfCourse } from "../../redux/courses/CourseSlice";
import { GetCourseById } from "../../redux/courses/CourseSlice";
import { checkIfRatedTeacher } from "../../redux/courses/CourseSlice";
import { CheckBanlance, GiveMeMyMoney } from "../../components/common/PayOS";
import { FaFlag } from "react-icons/fa";
import { fetchClasses } from "../../redux/classes/ClassSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
const CourseDetail = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();
  const [skillCount, setSkillCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [userName, setUsername] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmStatus, setConfirmStatus] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => {});
  const [course, setCourse] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isRatingTeacherOpen, setIsRatingTeacherOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const classes = useSelector((state) => state.classes.classes[courseId] || []);
  const isMentor = useSelector((state) => state.courses.isMentor);
  const handleOpenTeacherRating = (teacherId) => {
    setSelectedTeacherId(teacherId);
    setIsRatingTeacherOpen(true);
  };
  const handleCloseTeacherRating = async () => {
    setIsRatingTeacherOpen(false);
  };
  const hasRatedTeacher = useSelector(
    (state) => state.enrollment.hasRatedTeacher || false
  );
  const switchStates = useSelector((state) => state.classes.switchStates || {});
  const isEnrolled = useSelector(
    (state) => state.enrollment.isEnrolled || false
  );
  const isReviewPath = location.pathname.includes("/review");
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
      setIsLoading(true); // Bắt đầu hiển thị spinner
      try {
        const courseDetail = await dispatch(GetCourseById(courseId)).unwrap(); // Truyền courseId vào action
        setCourse(courseDetail); // Kết quả trả về là thông tin chi tiết của khóa học
      } finally {
        setIsLoading(false); // Ẩn spinner sau khi fetch xong
      }
    };

    if (courseId) {
      fetchCourseDetail();
    }
  }, [dispatch, courseId]);

  useEffect(() => {
    setIsLoading(true);
    try {
      if (userId && course?.userId) {
        // Kiểm tra chắc chắn course.userId và userId có giá trị
        dispatch(
          checkIfRatedTeacher({ userId: course.userId, learnerId: userId })
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, userId, course?.userId]);

  useEffect(() => {
    setIsLoading(true);
    initializeUser();
    try {
      if (courseId) {
        dispatch(fetchClasses(courseId));
        dispatch(fetchSkills(courseId));
      }
    } finally {
      setIsLoading(false);
    }
  }, [initializeUser, dispatch, courseId]);

  useEffect(() => {
    setIsLoading(true);
    try {
      if (userId && courseId) {
        dispatch(CheckUserEnrollment({ userId, courseId }));
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, userId, courseId]);

  useEffect(() => {
    const checkIfRated = async () => {
      if (!userId || !courseId) return;
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${apiURLConfig.baseURL}/CourseRating/${courseId}/ratings`,
          { params: { userId } }
        );
        setHasRated(response?.data?.length > 0);
      } finally {
        setIsLoading(false);
      }
    };
    checkIfRated();
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
      toast.error("Bạn chưa chọn lớp.");
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
        toast.error("Đăng ký thất bại! Bạn không có đủ tiền.");
      }
      return;
    }

    setConfirmMessage("Are you sure you want to enroll this course?");
    setConfirmStatus("Enroll");
    setConfirmAction(() => async () => {
      try {
        setIsLoading(true);
        await GiveMeMyMoney(
          userId,
          price * -1,
          `Enroll in course ${course?.name}`,
          `${courseId}`
        );
        await GiveMeMyMoney(
          course?.userId,
          price,
          `Your course has been enrolled by ${userName}`,
          `${courseId}`
        );
        const enrollAt = new Date().toISOString().split("T")[0];
        await dispatch(
          enrollUser({ courseId, userId, classId: selectedClassId, enrollAt })
        ).unwrap();

        toast.success("Đăng ký thành công!");
        dispatch(CheckUserEnrollment({ userId, courseId }));
      } finally {
        setIsLoading(false); // Kết thúc trạng thái loading
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

  const handleCreateTestClick = (skillId) => {
    dispatch(fetchSkillDescription(skillId))
      .unwrap()
      .catch(() => {});
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      if (userId) {
        dispatch(CheckUserEnrollment({ userId, courseId }));
        dispatch(LecturerOfCourse({ courseId, userId }));
      }
      dispatch(GetCourseById(courseId));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, userId, courseId]);

  const handleOpenRating = () => setIsRatingOpen(true);
  const handleCloseRating = async () => {
    setIsRatingOpen(false);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseRating/${courseId}/ratings`,
        { params: { userId } }
      );
      setHasRated(response?.data?.length > 0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadingState = (loading) => {
    setIsLoading(loading);
  };
  const handleLoadingStateSkill = (loading) => {
    setIsLoading(loading);
  };
  const handleLoadingStateComment = (loading) => {
    setIsLoading(loading);
  };
  return (
    <MainLayout>
      <div className="flex flex-col w-screen">
        <div className="flex w-full">
          <MentorSidebar isEnrolled={isEnrolled} isMentor={isMentor} />
          <div className="flex-1 p-4 overflow-y-auto">
            {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <ClipLoader color="#000000" size={50} />
              </div>
            )}
            <div className="mx-auto bg-houseGreen text-white  rounded-lg shadow-lg flex flex-between  p-8 space-y-8 lg:space-y-0 lg:space-x-8 py-7">
              <div className="flex flex-col flex-1 gap-6  w-5/12 ">
                <h1 className="text-3xl font-bold mb-4">
                  {course?.courseName}
                </h1>
                <p className="mb-4 leading-relaxed">{course?.content}</p>

                <div className="flex gap-4">
                  {isEnrolled && !hasRated && !isMentor && (
                    <button
                      className="py-2 px-3 text-sm font-medium rounded-lg border bg-green-400 text-gray-800 shadow-sm hover:bg-green-500"
                      onClick={handleOpenRating}
                    >
                      Rate Course
                    </button>
                  )}
                  {!isMentor && isEnrolled && !hasRatedTeacher && (
                    <button
                      className="py-2 px-3 text-sm font-medium rounded-lg border bg-white text-gray-800 shadow-sm hover:bg-gray-300"
                      onClick={() => handleOpenTeacherRating(course?.userId)}
                    >
                      <FontAwesomeIcon
                        icon={faChalkboardTeacher}
                        className="mr-4"
                      />
                      Rate Teacher
                    </button>
                  )}
                </div>
              </div>
              <div className="bg-lightGreen p-4 rounded-lg w-6/12 flex flex-col items-center text-center shadow-md relative h-auto lg:h-[220px]">
                <div className=" flex w-full   items-center justify-between px-6">
                  <div className="flex gap-4">
                    {!isEnrolled && !isMentor && (
                      <button
                        onClick={handleEnroll}
                        className="p-2 bg-green-500"
                      >
                        Enroll now
                      </button>
                    )}
                    {isEnrolled && (
                      <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight sm:text-4xl lg:text-5xl bg-green-700 text-transparent bg-clip-text">
                        {formatCurrency(course?.price)}
                      </h2>
                    )}
                  </div>

                  {isEnrolled && (
                    <button
                      onClick={handleOpenReport}
                      className=" top-2 right-2 text-red-700 text-xl"
                    >
                      <FaFlag />
                    </button>
                  )}
                </div>

                <div className="flex justify-center w-full gap-36 text-sm text-black mb-6">
                  <div className="flex flex-col gap-6 justify-center text-sm space-x-4 ">
                    <div className="flex gap-4 items-center">
                      <span className=" font-bold">Lecturer: </span>
                      <Link
                        to={`/coachingschedule/${course?.username}`}
                        className="text-green-800 underline text-xl"
                      >
                        {course?.teacherName}
                      </Link>
                    </div>

                    <div className="  ">
                      <div className=" ">
                        {course?.enrollmentCount !== undefined
                          ? `${course.enrollmentCount} students`
                          : "No students"}
                      </div>

                      <div className="flex justify-center  mt-4 items-center">
                        <span className="mr-4">
                          {course?.averageRating?.toFixed(1)}
                        </span>
                        {renderStars(course?.averageRating || 0)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <FaStopwatch className="text-houseGreen" />
                      <span>{course?.hours} hours</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaRegLightbulb className="text-houseGreen" />
                      <span>1 overall test</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaRegStickyNote className="text-houseGreen" />
                      <span>{skillCount} Skills</span>
                    </li>
                  </div>
                </div>
              </div>
            </div>

            <section className="mb-4 mt-4">
              {!isEnrolled && !isMentor && (
                <>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold">Classes</p>
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
                          onLoadingChange={handleLoadingState}
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
                onCreateTestClick={handleCreateTestClick}
                onSkillCountUpdate={setSkillCount}
                isMentor={isMentor}
                onLoadingChange={handleLoadingStateSkill}
              />
              <Comment
                courseId={courseId}
                onLoadingChange={handleLoadingStateComment}
              />
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

      {isRatingTeacherOpen && (
        <RatingTeacher
          teacherId={selectedTeacherId}
          userId={userId}
          onClose={handleCloseTeacherRating}
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
      <ToastContainer autoClose={3000} newestOnTop closeOnClick />
      <Confirm
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmAction}
        message={confirmMessage}
        status={confirmStatus}
      />
    </MainLayout>
  );
};

export default CourseDetail;
