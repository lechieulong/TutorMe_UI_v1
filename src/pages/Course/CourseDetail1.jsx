import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MentorHeader from "../../components/Mentor/MentorHeader";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import CourseTimeline from "./components/CourseTimeline";
import CourseTimelineDetail from "./components/CourseTimelineDetail";
import axios from "axios";
import { getUser } from "../../service/GetUser";
import ClassCard from "../Class/components/ClassCard";
import MainLayout from "../../layout/MainLayout";

const CourseDetail = () => {
  const { className, courseId } = useParams();
  const [timelineIds, setTimelineIds] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const fetchTimelines = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseTimeline/Course/${courseId}`
      );
      setTimelineIds(response.data.map((timeline) => timeline.id));
    } catch (error) {
      console.error("Failed to fetch timelines", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/class/course/${courseId}/classes`
      );
      const fetchedClasses = response.data.result;
      setClasses(fetchedClasses);
    } catch (error) {
      console.error("Failed to fetch classes", error);
    }
  };

  const checkEnrollment = async (userId) => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/Enrollment/check?courseId=${courseId}&userId=${userId}`
      );
      setIsEnrolled(response.data.isEnrolled);
      setErrorMessage(
        response.data.classId
          ? ""
          : "Bạn chưa gia nhập lớp nào. Hãy đăng ký tại"
      );
    } catch (error) {
      console.error("Failed to check enrollment", error);
    }
  };

  const initializeUser = () => {
    const userFromToken = getUser();
    const userIdFromToken = userFromToken?.sub;

    if (userIdFromToken) {
      setUserId(userIdFromToken);
      checkEnrollment(userIdFromToken);
    }
  };

  useEffect(() => {
    initializeUser();
    fetchTimelines();
    fetchClasses();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      if (userId && selectedClassId) {
        const enrollmentData = {
          courseId: courseId,
          userId: userId,
          classId: selectedClassId,
        };
        const response = await axios.post(
          "https://localhost:7030/api/Enrollment",
          enrollmentData
        );

        if (response.status === 200) {
          alert("Bạn đã ghi danh thành công!");
          setIsEnrolled(true);
        }
      } else {
        alert("Người dùng chưa đăng nhập hoặc chưa chọn lớp.");
      }
    } catch (error) {
      console.error("Không thể ghi danh", error);
      alert(
        `Không thể ghi danh vào khóa học. Chi tiết lỗi: ${
          error.response?.data || error.message
        }`
      );
    }
  };

  const handleSelectClass = (classId) => {
    if (classId === false) {
      setSelectedClassId(null); // Không có lớp nào được chọn nếu classId là false
    } else {
      setSelectedClassId(classId); // Cập nhật selectedClassId với classId hợp lệ
    }
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      Math.min(prev + 1, Math.ceil(classes.length / 3) - 1)
    );
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <MainLayout>
      <div className=" w-full">
        <div className="flex flex-1 w-full">
          <div className="flex-1 p-4">
            <ol className="flex items-center whitespace-nowrap">
              <li className="inline-flex items-center">
                <button
                  type="button"
                  onClick={handleEnroll}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-green-400 text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 transition-hover transition-transform duration-500 dark:hover:scale-110"
                  disabled={isEnrolled}
                >
                  {isEnrolled ? "Enrolled" : "Enroll"}
                </button>
                {className}
              </li>
            </ol>
            {errorMessage && (
              <p className="text-red-500">
                {errorMessage}{" "}
                <a
                  href={`http://localhost:5173/courseDetail/${courseId}/classes`}
                  className="text-blue-500 underline"
                >
                  đây
                </a>
              </p>
            )}
            <div className="flex flex-col bg-white border w-full shadow-sm rounded-xl p-4 md:p-5 relative group">
              <h4 className="text-md font-bold text-gray-800">Classes</h4>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {classes.map((classItem) => (
                    <ClassCard
                      key={classItem.id}
                      classItem={classItem}
                      isActive={selectedClassId === classItem.id}
                      onSelect={handleSelectClass}
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
                  disabled={currentSlide >= Math.ceil(classes.length / 3) - 1}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="flex justify-start items-center mb-4">
              <p className="text-black font-bold text-4xl">{className}</p>
            </div>
            <div className="flex gap-4">
              <div className="w-5/12">
                <CourseTimeline timelineIds={timelineIds} courseId={courseId} />
              </div>
              <div className="w-7/12">
                <CourseTimelineDetail timelineIds={timelineIds} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetail;
