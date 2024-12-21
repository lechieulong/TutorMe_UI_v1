import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import MainLayout from "../../layout/MainLayout";
import ClassCard from "../Class/components/ClassCard";
import CourseSkillCard from "./component/CourseSkillCard";
import { fetchClasses } from "../../redux/classes/ClassSlice";
import CreateClass from "../Class/CreateClass";
import Notification from "../../components/common/Notification";
import axios from "axios";
import { formatCurrency } from "../../utils/Validator";
import { getUser } from "../../service/GetUser";
import { LecturerOfCourse } from "../../redux/courses/CourseSlice";
import { GetCourseById } from "../../redux/courses/CourseSlice";
import Comment from "../../components/common/Comment";
import apiURLConfig from "../../redux/common/apiURLConfig";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import {
  fetchSkills,
  fetchSkillDescription,
} from "../../redux/courses/CourseSkillSlice";
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
  CheckUserEnrollment,
  enrollUser,
} from "../../redux/Enrollment/EnrollmentSlice";
const MentorCourseDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { className, courseId } = useParams();
  const location = useLocation();
  const [skillCount, setSkillCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [isMentor, setIsMentor] = useState(false);
  const [course, setCourse] = useState(null);
  const [notificationUpdated, setNotificationUpdated] = useState(false);
  const dispatch = useDispatch();
  const switchStates = useSelector((state) => state.classes.switchStates || {});
  const { classes } = useSelector((state) => ({
    classes: state.classes.classes[courseId] || [], // Lấy danh sách lớp học theo courseId
  }));
  const isEnrolled = useSelector(
    (state) => state.enrollment.isEnrolled || false
  );
  const { pathname } = useLocation();
  const handleOpenCreateClass = () => setIsCreateClassOpen(true);
  const handleCloseCreateClass = () => setIsCreateClassOpen(false);
  const isDelete = course?.enrollmentCount > 0 ? false : true;
  const { fromMentorCourseList = false } = location.state || {};
  let mentorAndList = isMentor && fromMentorCourseList; // Dùng let thay vì const
  const isRelevantPage = pathname.includes(`/mentorCourseDetail/${courseId}`);
  if (isRelevantPage) {
    mentorAndList = true; // Cập nhật giá trị khi điều kiện thỏa mãn
  }

  const initializeUser = useCallback(() => {
    const userFromToken = getUser();
    setUserId(userFromToken?.sub);
  }, []);

  useEffect(() => {
    const checkIfMentor = async () => {
      setIsLoading(true); // Bắt đầu trạng thái loading
      try {
        const { data } = await axios.get(
          `${apiURLConfig.baseURL}/Courses/check-lecturer?courseId=${courseId}&userId=${userId}`
        );
        setIsMentor(!!data.result);
      } catch {
        setIsMentor(false);
      } finally {
        setIsLoading(false); // Kết thúc trạng thái loading
      }
    };
    if (userId && courseId) {
      checkIfMentor();
    }
  }, [userId, courseId]);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      setIsLoading(true); // Bắt đầu trạng thái loading
      try {
        const courseDetail = await dispatch(GetCourseById(courseId)).unwrap(); // Truyền courseId vào action
        setCourse(courseDetail); // Lưu thông tin chi tiết của khóa học
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        toast.error("Failed to fetch course details!");
      } finally {
        setIsLoading(false); // Kết thúc trạng thái loading
      }
    };
    if (courseId) {
      fetchCourseDetail();
    }
  }, [dispatch, courseId]);

  useEffect(() => {
    setIsLoading(true); // Bắt đầu trạng thái loading

    initializeUser();
    if (courseId) {
      dispatch(fetchClasses(courseId));
      dispatch(fetchSkills(courseId));
    }

    setIsLoading(false); // Kết thúc trạng thái loading
  }, [initializeUser, dispatch, courseId]);

  useEffect(() => {
    if (userId && courseId) {
      setIsLoading(true); // Bắt đầu trạng thái loading
      dispatch(CheckUserEnrollment({ userId, courseId })).finally(() => {
        setIsLoading(false); // Kết thúc trạng thái loading
      });
    }
  }, [dispatch, userId, courseId]);

  const handleDeleteClassSuccess = async () => {
    setIsLoading(true); // Bắt đầu trạng thái loading
    try {
      await dispatch(fetchClasses(courseId));
      toast.success("Class deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete class!");
    } finally {
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  };

  const updateClassSuccessfull = async () => {
    setIsLoading(true); // Bắt đầu trạng thái loading
    try {
      await dispatch(fetchClasses(courseId));
      toast.success("Class updated successfully!");
    } catch (error) {
      toast.error("Failed to update class!");
    } finally {
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  };

  const handlePrev = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentSlide((prev) =>
      Math.min(prev + 1, Math.ceil(classes.length / 4) - 1)
    );

  const handleCreateTestClick = (skillId) => {
    setIsLoading(true); // Bắt đầu trạng thái loading
    dispatch(fetchSkillDescription(skillId))
      .unwrap()
      .catch(() => {
        toast.error("Failed to fetch skill description!");
      })
      .finally(() => {
        setIsLoading(false); // Kết thúc trạng thái loading
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Bắt đầu trạng thái loading

      try {
        if (userId) {
          await dispatch(CheckUserEnrollment({ userId, courseId })).unwrap();
        }
        await dispatch(LecturerOfCourse(courseId)).unwrap();
        await dispatch(GetCourseById(courseId)).unwrap();
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to fetch data!");
      } finally {
        setIsLoading(false); // Kết thúc trạng thái loading
      }
    };
    fetchData();
  }, [dispatch, userId, courseId]);

  useEffect(() => {
    if ((mentorAndList || isMentor) && !notificationUpdated) {
      setIsLoading(true); // Bắt đầu trạng thái loading
      setNotification("This is your course!");
      setNotificationUpdated(true);
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  }, [mentorAndList, isMentor, notificationUpdated]);

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
        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification("")}
          />
        )}
        <div className="flex w-full relative">
          <MentorSidebar mentorAndList={true} isMentor={true} />
          <div className="flex-1 p-4 overflow-y-auto relative">
            {/* Loader hiển thị trong khu vực nội dung chính */}
            {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <ClipLoader color="#000000" size={50} />
              </div>
            )}
            {!isLoading && (
              <div className="mx-auto bg-houseGreen text-white rounded-lg shadow-lg flex flex-col lg:flex-row p-8 space-y-8 lg:space-y-0 lg:space-x-8 ">
                <div className="flex flex-col lg:w-2/3">
                  <h1 className="text-3xl font-bold mb-4">
                    {course?.courseName}
                  </h1>
                  <div className="mb-4 flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-black">
                      {className}
                    </h1>
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
                </div>
              </div>
            )}
            {!isLoading && (
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
                            isDelete={isDelete}
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
            )}
            {!isLoading && (
              <div className="mt-4">
                <CourseSkillCard
                  courseId={courseId}
                  isEnrolled={isEnrolled}
                  mentorAndList={mentorAndList}
                  onCreateTestClick={handleCreateTestClick}
                  onSkillCountUpdate={setSkillCount}
                  isMentor={isMentor}
                  isDelete={isDelete}
                  onLoadingChange={handleLoadingStateSkill}
                />
                <Comment
                  courseId={courseId}
                  onLoadingChange={handleLoadingStateComment}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {isCreateClassOpen && (
        <CreateClass
          courseId={courseId}
          onClose={handleCloseCreateClass}
          onCreateSuccess={() => dispatch(fetchClasses(courseId))}
        />
      )}
    </MainLayout>
  );
};

export default MentorCourseDetail;
