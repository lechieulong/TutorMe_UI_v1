import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MentorHeader from "../../components/Mentor/MentorHeader";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import CourseTimeline from "./components/CourseTimeline";
import CourseTimelineDetail from "./components/CourseTimelineDetail";

const CourseDetail = () => {
  const { className, courseId } = useParams();
  const [timelineIds, setTimelineIds] = useState([]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MentorHeader />
      <div className="flex flex-1 mt-16 w-full">
        <MentorSidebar />
        <div className="flex-1 p-4">
          <ol className="flex items-center whitespace-nowrap">
            <li className="inline-flex items-center">
              <a
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                href="#"
              >
                Home
              </a>
              <svg
                className="shrink-0 mx-2 size-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" x2="8" y1="13" y2="13"></line>
                <line x1="16" x2="8" y1="17" y2="17"></line>
                <line x1="10" x2="8" y1="9" y2="9"></line>
              </svg>
              {className}
            </li>
          </ol>

          <div className="flex justify-start items-center mb-4">
            <p className="text-black font-bold text-4xl">{className}</p>
          </div>

          <div className="flex gap-4">
            <div className="w-2/5">
              <CourseTimeline
                courseId={courseId}
                onSelectTimeline={setTimelineIds} // Lưu danh sách ID
              />
            </div>
            <div className="w-3/5">
              {timelineIds.length > 0 ? (
                timelineIds.map((timelineId) => (
                  <CourseTimelineDetail
                    key={timelineId}
                    timelineId={timelineId}
                  />
                ))
              ) : (
                <p>Vui lòng chọn một lộ trình để xem chi tiết.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
