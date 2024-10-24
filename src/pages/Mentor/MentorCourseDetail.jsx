import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MentorHeader from "../../components/Mentor/MentorHeader";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import CourseTimeline from "../Course/components/CourseTimeline";
import CourseTimelineDetail from "../Course/components/CourseTimelineDetail";
import ButtonAddCourseTimeline from "../Course/components/ButtonAddCourseTimeline";
import ButtonAddCourseTimelineDetail from "../Course/components/ButtonAddCourseTimelineDetail";
import axios from "axios";
import { getUser } from "../../service/GetUser";

const MentorCourseDetail = () => {
  const { className, courseId } = useParams();
  const [timelineIds, setTimelineIds] = useState([]);
  const [userId, setUserId] = useState(null);

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

  // Lấy userId từ token
  const initializeUser = () => {
    const userFromToken = getUser(); // Lấy thông tin người dùng từ token
    const userIdFromToken = userFromToken?.sub;

    if (userIdFromToken) {
      setUserId(userIdFromToken); // Lưu userId vào trạng thái
    }
  };

  // useEffect để thực hiện các tác vụ khởi tạo
  useEffect(() => {
    initializeUser(); // Gọi hàm khởi tạo người dùng
    fetchTimelines(); // Gọi hàm fetch timeline
  }, [courseId]); // Chạy lại khi courseId thay đổi

  // Xử lý sau khi thêm mới timeline hoặc chi tiết timeline
  const handleTimelineAdded = () => {
    fetchTimelines();
  };

  const handleDetailAdded = () => {
    fetchTimelines();
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MentorHeader />
      <div className="flex flex-1 mt-16 w-full">
        <MentorSidebar />
        <div className="flex-1 p-4">
          <div className="flex justify-start items-center mb-4">
            <p className="text-black font-bold text-4xl">{className}</p>
          </div>

          <div className="flex gap-4">
            <div className="w-2/5">
              <ButtonAddCourseTimeline
                courseId={courseId}
                onTimelineAdded={handleTimelineAdded}
              />
              <CourseTimeline
                courseId={courseId}
                onSelectTimeline={setTimelineIds} // Cập nhật danh sách timelineIds
              />
              <div className="flex justify-center mt-4">
                {" "}
                {/* Thêm div này để căn giữa */}
                <button className="items-center p-2 bg-green-400">
                  Submit
                </button>
              </div>
            </div>
            <div className="w-3/5">
              <ButtonAddCourseTimelineDetail
                timelineIds={timelineIds}
                onDetailAdded={handleDetailAdded}
              />
              <CourseTimelineDetail timelineIds={timelineIds} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCourseDetail;
