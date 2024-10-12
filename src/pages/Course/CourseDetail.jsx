import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MentorHeader from "../../components/Mentor/MentorHeader";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import CourseTimeline from "./components/CourseTimeline";
import CourseTimelineDetail from "./components/CourseTimelineDetail";
import ButtonAddCourseTimeline from "./components/ButtonAddCourseTimeline";
import ButtonAddCourseTimelineDetail from "./components/ButtonAddCourseTimelineDetail"; // Import nút thêm chi tiết
import axios from "axios";

const CourseDetail = () => {
  const { className, courseId } = useParams();
  const [timelineIds, setTimelineIds] = useState([]);

  // Fetch danh sách timeline
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

  useEffect(() => {
    fetchTimelines();
  }, [courseId]);

  const handleTimelineAdded = () => {
    fetchTimelines();
  };

  const handleDetailAdded = () => {
    fetchTimelines(); // Cập nhật sau khi thêm chi tiết
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MentorHeader />
      <div className="flex flex-1 mt-16 w-full">
        <MentorSidebar />
        <div className="flex-1 p-4">
          <ol className="flex items-center whitespace-nowrap">
            <li className="inline-flex items-center">
              <a
                className="flex items-center text-sm text-gray-500 hover:text-blue-600"
                href="#"
              >
                Home
              </a>
              <svg
                className="mx-2 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 3v8H3v5a2 2 0 002 2h14a2 2 0 002-2V7.5L14 3z"
                />
              </svg>
              {className}
            </li>
          </ol>

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
                onSelectTimeline={setTimelineIds}
              />
            </div>
            <div className="w-3/5">
              {timelineIds.length > 0 ? (
                timelineIds.map((timelineId) => (
                  <div key={timelineId} className="mb-4">
                    {/* Chi tiết lộ trình */}
                    <CourseTimelineDetail timelineId={timelineId} />
                    {/* Nút thêm chi tiết cho mỗi timeline */}
                    <ButtonAddCourseTimelineDetail
                      courseId={courseId}
                      timelineId={timelineId} // Truyền ID timeline
                      onDetailAdded={handleDetailAdded} // Xử lý khi thêm chi tiết
                    />
                  </div>
                ))
              ) : (
                <p className="text-red-500">Hiện chưa có lộ trình nào.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
