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
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State mới để lưu thông báo lỗi

  // Hàm fetch timelines từ API
  const fetchTimelines = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseTimeline?courseId=${courseId}`
      );
      setTimelineIds(response.data.map((timeline) => timeline.id));
    } catch (error) {
      console.error("Failed to fetch timelines", error);
    }
  };

  // Hàm kiểm tra trạng thái ghi danh từ API
  const checkEnrollment = async (userId) => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/Enrollment/check?courseId=${courseId}&userId=${userId}`
      );

      setIsEnrolled(response.data.isEnrolled); // Cập nhật trạng thái isEnrolled dựa trên API response

      // Kiểm tra classId và thiết lập thông báo nếu là null
      if (response.data.classId === null) {
        setErrorMessage("Bạn chưa gia nhập lớp nào. Hãy đăng ký tại"); // Cập nhật thông báo lỗi
      } else {
        setErrorMessage(""); // Xóa thông báo nếu đã có classId
      }
    } catch (error) {
      console.error("Failed to check enrollment", error);
    }
  };

  // Lấy userId từ token và kiểm tra ghi danh
  const initializeUser = () => {
    const userFromToken = getUser(); // Lấy thông tin người dùng từ token
    const userIdFromToken = userFromToken?.sub;

    if (userIdFromToken) {
      setUserId(userIdFromToken); // Lưu userId vào trạng thái
      checkEnrollment(userIdFromToken); // Kiểm tra trạng thái ghi danh ngay sau khi có userId
    }
  };

  // useEffect để thực hiện các tác vụ khởi tạo
  useEffect(() => {
    initializeUser(); // Gọi hàm khởi tạo người dùng
    fetchTimelines(); // Gọi hàm fetch timeline
  }, [courseId]); // Chạy lại khi courseId thay đổi

  // Xử lý ghi danh
  const handleEnroll = async () => {
    console.log("Course ID:", courseId);
    console.log("User ID:", userId);

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
          setIsEnrolled(true); // Cập nhật trạng thái sau khi ghi danh thành công
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
                disabled={isEnrolled} // Nếu đã ghi danh, làm mờ nút
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
          )}{" "}
          {/* Hiển thị thông báo lỗi nếu có */}
          <div className="flex justify-start items-center mb-4">
            <p className="text-black font-bold text-4xl">{className}</p>
          </div>
          <div className="flex gap-4">
            <div className="w-2/5">
              <CourseTimeline
                courseId={courseId}
                onSelectTimeline={setTimelineIds} // Cập nhật danh sách timelineIds
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
