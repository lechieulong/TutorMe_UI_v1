import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseTimelineDetail = ({ timelineId }) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null); // Trạng thái để quản lý index đang mở

  useEffect(() => {
    const fetchTimelineDetails = async () => {
      setLoading(true); // Bắt đầu trạng thái tải
      setError(null); // Reset lỗi trước khi tải lại

      try {
        // Gọi API để lấy chi tiết của CourseTimeline cụ thể
        const response = await axios.get(
          `https://localhost:7030/api/CourseTimelineDetail/CourseTimeline/${timelineId}`
        );

        // Kiểm tra nếu response.data không phải là một mảng rỗng
        if (Array.isArray(response.data) && response.data.length > 0) {
          setDetails(response.data); // Lưu thông tin chi tiết
        } else {
          setError("Không có phần học nào cho lộ trình này."); // Thiết lập thông báo lỗi
        }
      } catch (error) {
        setError("Không thể lấy thông tin chi tiết của lộ trình."); // Thiết lập thông báo lỗi
      } finally {
        setLoading(false); // Kết thúc trạng thái tải
      }
    };

    fetchTimelineDetails();
  }, [timelineId]); // Chỉ phụ thuộc vào timelineId

  const toggleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Đổi trạng thái khi click
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex-1 w-60% p-2">
      {details.length === 0 ? (
        <p>Không có phần học nào cho lộ trình này.</p> // Thông báo khi không có chi tiết
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
                  paddingBottom: "56.25%", // 16:9 aspect ratio
                  height: 0,
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/ew-fVQyMZSo`} // Thay thế bằng URL video động nếu cần
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
              <p className="text-gray-700 mt-2">{detail.description}</p>{" "}
              {/* Thay thế bằng mô tả nếu có */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseTimelineDetail;
