import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseTimeline = ({ courseId, onSelectTimeline }) => {
  const [timelines, setTimelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimelines = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5156/api/CourseTimeline/Course/${courseId}`
        );
        setTimelines(response.data);
        onSelectTimeline(response.data.map((t) => t.id)); // Gọi onSelectTimeline với tất cả ID
        setLoading(false);
      } catch (error) {
        setError("Không thể lấy thông tin lộ trình của khóa học.");
        setLoading(false);
      }
    };

    fetchTimelines();
  }, [courseId, onSelectTimeline]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex-1 w-40% p-2">
      {timelines.length === 0 ? (
        <p>Không tìm thấy lộ trình nào cho khóa học này.</p>
      ) : (
        timelines.map((timeline) => (
          <div key={timeline.id} className="mb-4">
            <div className="flex gap-x-3">
              <div className="w-16 text-end">
                <span className="text-xs text-gray-500">
                  {timeline.eventDateFormatted}
                </span>
              </div>

              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-gray-400"></div>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8">
                <h3 className="flex gap-x-1.5 font-semibold text-gray-800">
                  {timeline.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {timeline.description}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseTimeline;
