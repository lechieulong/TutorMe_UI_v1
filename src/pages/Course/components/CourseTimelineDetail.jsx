import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseTimelineDetail = ({ timelineId }) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null); // Thêm trạng thái để quản lý index đang mở

  useEffect(() => {
    const fetchTimelineDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5156/api/CourseTimelineDetail/CourseTimeline/${timelineId}`
        );
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError("Không thể lấy thông tin chi tiết của lộ trình.");
        setLoading(false);
      }
    };

    fetchTimelineDetails();
  }, [timelineId]);

  const toggleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Đổi trạng thái khi click
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex-1 w-60% p-2">
      {details.length === 0 ? (
        <p>Không tìm thấy chi tiết nào cho lộ trình này.</p>
      ) : (
        details.map((detail, index) => (
          <div key={detail.id} className="mb-4">
            <h2 className="text-black font-bold">
              <button
                type="button"
                onClick={() => toggleCollapse(index)} // Gọi hàm toggle khi click
                className="focus:outline-none"
              >
                {detail.topic}
              </button>
            </h2>

            {/* Collapse content */}
            <div
              style={{
                maxHeight: activeIndex === index ? "100px" : "0",
                opacity: activeIndex === index ? 1 : 0,
                transition: "opacity 0.5s ease, max-height 0.5s ease",
                overflow: "hidden",
              }}
            >
              <p className="text-gray-700 mt-2">
                Video URL:{" "}
                <a
                  href={detail.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {detail.videoUrl}
                </a>
              </p>
              <p className="text-gray-700">{detail.topic}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseTimelineDetail;
