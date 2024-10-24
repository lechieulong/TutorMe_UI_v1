import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MentorHeader from "../../components/Mentor/MentorHeader";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import CourseTimeline from "./components/CourseTimeline";
import CourseTimelineDetail from "./components/CourseTimelineDetail";
import axios from "axios";
import { getUser } from "../../service/GetUser";

const CourseDetail = () => {
  const { className, courseId } = useParams();
  const [timelineIds, setTimelineIds] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch timelines from API
  const fetchTimelines = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseTimeline/Course?courseId=${courseId}`
      );
      setTimelineIds(response.data.map((timeline) => timeline.id));
    } catch (error) {
      console.error("Failed to fetch timelines", error);
    }
  };

  // Fetch all classes for the course
  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/class/course/${courseId}/classes`
      );
      setClasses(response.data.result);
    } catch (error) {
      console.error("Failed to fetch classes", error);
    }
  };

  // Check enrollment status
  const checkEnrollment = async (userId) => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/Enrollment/check?courseId=${courseId}&userId=${userId}`
      );
      setIsEnrolled(response.data.isEnrolled);
      if (response.data.classId === null) {
        setErrorMessage("Bạn chưa gia nhập lớp nào. Hãy đăng ký tại");
      } else {
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Failed to check enrollment", error);
    }
  };

  // Initialize user
  const initializeUser = () => {
    const userFromToken = getUser();
    const userIdFromToken = userFromToken?.sub;

    if (userIdFromToken) {
      setUserId(userIdFromToken);
      checkEnrollment(userIdFromToken);
    }
  };

  // useEffect to initialize user and fetch data
  useEffect(() => {
    initializeUser();
    fetchTimelines();
    fetchClasses();
  }, [courseId]);

  // Handle enrollment
  const handleEnroll = async () => {
    try {
      if (userId) {
        const enrollmentData = {
          courseId: courseId,
          userId: userId,
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
        alert("Người dùng chưa đăng nhập.");
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

  // Functions to handle slideshow navigation
  const handleNext = () => {
    setCurrentSlide((prev) =>
      Math.min(prev + 1, Math.ceil(classes.length / 3) - 1)
    );
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MentorHeader />
      <div className="flex flex-1 mt-16 w-full">
        <MentorSidebar />
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
            {/* Title */}

            {/* Card slider for classes */}
            <div className="mt-4 relative">
              <h4 className="text-md font-bold text-gray-800">Classes</h4>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {classes.map((classItem) => (
                    <div key={classItem.id} className="flex-shrink-0 w-1/3 p-2">
                      <div className="bg-gray-100 border rounded-md p-4">
                        <h5 className="font-bold text-gray-700">
                          {classItem.className}
                        </h5>
                        <p className="text-gray-600">
                          {classItem.classDescription}
                        </p>
                        <p className="text-gray-500">
                          Student Count: {classItem.count}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                  disabled={currentSlide === 0}
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                  disabled={currentSlide >= Math.ceil(classes.length / 3) - 1}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Popup for full text */}
          </div>
          <div className="flex justify-start items-center mb-4">
            <p className="text-black font-bold text-4xl">{className}</p>
          </div>
          <div className="flex gap-4">
            <div className="w-2/5">
              <CourseTimeline
                courseId={courseId}
                onSelectTimeline={setTimelineIds}
              />
            </div>
            <div className="w-3/5">
              <CourseTimelineDetail timelineIds={timelineIds} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
