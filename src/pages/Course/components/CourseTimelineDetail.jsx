import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Nhập useNavigate từ react-router-dom

const CourseTimelineDetail = ({ courseId, setCreateTest, setSkills }) => {
  const [details, setDetails] = useState([]); // State để lưu thông tin chi tiết
  const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái tải
  const [error, setError] = useState(null); // State để lưu thông báo lỗi
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimelineDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Mock data to replace API call
        const mockData = [
          {
            id: 1,
            topic: "Introduction to IELTS",
            videoUrl: "dQw4w9WgXcQ", // Mock YouTube video ID
            title: "Introduction Video",
          },
          {
            id: 2,
            topic: "Listening Skills",
            videoUrl: "dQw4w9WgXcQ", // Mock YouTube video ID
            title: "Listening Techniques",
          },
          {
            id: 3,
            topic: "Reading Techniques",
            videoUrl: "dQw4w9WgXcQ", // Mock YouTube video ID
            title: "Tips for Reading",
          },
        ];

        // call api here and set to setDetails
        setDetails(mockData); // Set mock data directly to state
      } catch (error) {
        setError("Không thể lấy thông tin chi tiết của lộ trình."); // Thiết lập thông báo lỗi
      } finally {
        setLoading(false); // Kết thúc trạng thái tải
      }
    };

    fetchTimelineDetails();
  }, []);

  const toggleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleCreateTest = (courseTimelineDetailId) => {
    setSkills(["Listening", "Reading"]); // truyen course zô đây, hiện tại đang fake
    setCreateTest(true);
  };

  const handleAddSectionContent = (courseTimelineDetailId) => {
    // handle call add content here
  };

  if (loading) return <div>Đang tải...</div>;
  return (
    <div className="flex-1  bg-green-50 p-4">
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
                {index + 1} {detail.topic}
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
                {/* <iframe
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
                ></iframe> */}
              </div>

              <p className="text-gray-700 mt-2">{detail.title}</p>
            </div>
            <div className="flex gap-2">
              {/* {isAdmin ? buttonCreateTest : button TakeTest} */}
              <button
                type="button"
                className="py-2 bg-red-200 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200  text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                onClick={() => handleCreateTest(detail.id)} // Gọi hàm và truyền ID chi tiết
              >
                Create Test
              </button>
              <button
                type="button"
                className="py-2 bg-red-200 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200  text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                onClick={() => handleAddSectionContent(detail.id)} // Gọi hàm và truyền ID chi tiết
              >
                Add section content
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseTimelineDetail;
