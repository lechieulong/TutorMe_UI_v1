import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Nhập useNavigate từ react-router-dom

const CourseTimelineDetail = ({ timelineIds }) => {
  const [details, setDetails] = useState([]); // State để lưu thông tin chi tiết
  const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái tải
  const [error, setError] = useState(null); // State để lưu thông báo lỗi
  const [activeIndex, setActiveIndex] = useState(null); // State để theo dõi mục đang mở
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng

  useEffect(() => {
    const fetchTimelineDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = timelineIds
          .map((id) => `courseTimelineIds=${id}`)
          .join("&");

        const response = await axios.get(
          `https://localhost:7030/api/CourseTimelineDetail/CourseTimelines/Details?${params}`
        );

        if (Array.isArray(response.data) && response.data.length > 0) {
          setDetails(response.data);
        } else {
          setError("Không có phần học nào cho lộ trình này."); // Thông báo khi không có dữ liệu
        }
      } catch (error) {
        setError("Không thể lấy thông tin chi tiết của lộ trình."); // Thiết lập thông báo lỗi
      } finally {
        setLoading(false); // Kết thúc trạng thái tải
      }
    };

    if (timelineIds.length > 0) {
      fetchTimelineDetails();
    }
  }, [timelineIds]);

  const toggleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleCreateTest = (courseTimelineDetailId) => {
    navigate(`/create-test/${courseTimelineDetailId}`);
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex-1 w-60% p-12">
      {details.length === 0 ? (
        <p>Không có phần học nào cho lộ trình này.</p>
      ) : (
        details.map((detail, index) => (
          <div key={detail.id} className="mb-4">
            <h2 className="text-black font-bold">
              <button
                type="button"
                onClick={() => toggleCollapse(index)}
                className="focus:outline-none"
              >
                {detail.topic}
              </button>
            </h2>

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
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${detail.videoUrl}`}
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
              <p className="text-gray-700 mt-2">{detail.title}</p>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                onClick={() => handleCreateTest(detail.id)} // Gọi hàm và truyền ID chi tiết
              >
                Create Test
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseTimelineDetail;
