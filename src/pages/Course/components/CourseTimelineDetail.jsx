import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseTimelineDetail = ({ timelineId }) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null); // Trạng thái để quản lý index đang mở
  const [timelineName, setTimelineName] = useState(""); // Thêm state để lưu tên lộ trình

  useEffect(() => {
    const fetchTimelineDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7030/api/CourseTimelineDetail/CourseTimeline/${timelineId}`
        );
        setDetails(response.data);

        // Nếu có thông tin chi tiết, lấy tên lộ trình từ phần tử đầu tiên
        if (response.data.length > 0) {
          setTimelineName(response.data[0].topic); // Giả sử topic là tên lộ trình
        }
        console.log(timelineName);
        setLoading(false);
      } catch (error) {
        setError(
          `Không thể lấy thông tin chi tiết của lộ trình ${timelineName}.`
        );
        setLoading(false);
      }
    };

    fetchTimelineDetails();
  }, [timelineId, timelineName]); // Thêm timelineName vào dependencies

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

            {/* Nội dung Collapse */}
            <div
              style={{
                maxHeight: activeIndex === index ? "400px" : "0",
                opacity: activeIndex === index ? 1 : 0,
                transition: "opacity 0.5s ease, max-height 0.5s ease",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%", // 16:9 aspect ratio (9/16 = 0.5625 or 56.25%)
                  height: 0,
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/ew-fVQyMZSo`}
                  title="Youtube Video"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-gray-700 mt-2">{detail.topic}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseTimelineDetail;
