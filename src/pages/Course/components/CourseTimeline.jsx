import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseTimeline = ({ courseId, onUpdateStatus }) => {
  const [timelines, setTimelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimelines = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7030/api/CourseTimeline/Course/${courseId}`
        );

        // Log dữ liệu nhận được từ API
        console.log("Dữ liệu timeline nhận được:", response.data);

        // Đảm bảo dữ liệu được lưu vào state
        setTimelines(response.data);
      } catch (error) {
        setError("Hiện chưa có lịch học nào");
        console.error("Error fetching timelines:", error); // Log lỗi để kiểm tra
      } finally {
        setLoading(false);
      }
    };

    fetchTimelines();
  }, [courseId]);

  const handleSwitchChange = async (timelineId, currentState) => {
    const newStatus = !currentState;
    const confirmationMessage = newStatus
      ? "Bạn có chắc muốn bật hiển thị timeline không?"
      : "Bạn có chắc muốn tắt hiển thị timeline không?";

    if (window.confirm(confirmationMessage)) {
      try {
        await axios.put(
          `https://localhost:7030/api/CourseTimeline/${timelineId}/enabled`,
          newStatus,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setTimelines((prevTimelines) =>
          prevTimelines.map((t) =>
            t.id === timelineId ? { ...t, isEnabled: newStatus } : t
          )
        );

        if (onUpdateStatus) {
          onUpdateStatus(timelineId, newStatus);
        }

        alert(`Timeline đã được ${newStatus ? "hiển thị" : "ẩn"} thành công.`);
      } catch (error) {
        console.error("Error updating timeline status", error);
        alert("Cập nhật trạng thái timeline thất bại.");
      }
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex-1 w-40% p-2">
      {timelines.length === 0 ? (
        <p className="text-red-500">
          Không tìm thấy lộ trình nào cho khóa học này.
        </p>
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

              {/* Switch Button */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="hidden peer"
                  id={`switch-${timeline.id}`}
                  checked={timeline.isEnabled || false}
                  onChange={() =>
                    handleSwitchChange(timeline.id, timeline.isEnabled)
                  }
                />
                <label
                  htmlFor={`switch-${timeline.id}`}
                  className="cursor-pointer w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 transition-colors duration-300 ease-in-out peer-checked:bg-green-400"
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out peer-checked:translate-x-4"></div>
                </label>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseTimeline;
