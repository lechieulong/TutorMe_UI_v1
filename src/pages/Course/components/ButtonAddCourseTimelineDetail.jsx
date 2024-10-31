import { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

const ButtonAddCourseTimelineDetail = ({
  courseId,
  timelineId,
  onDetailAdded,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    topic: "",
    selectedOption: "", // Trường cho giá trị select
  });
  const [options, setOptions] = useState([]); // State để lưu trữ các tùy chọn

  useEffect(() => {
    // Hàm để gọi API và lấy dữ liệu
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7030/api/CourseTimeline/9c70094f-a3b8-4f3f-a870-025ee9083e1e/timelines`
        );
        setOptions(response.data); // Lưu trữ dữ liệu vào state
      } catch (error) {
        console.error("Failed to fetch options", error);
      }
    };

    fetchOptions();
  }, []); // Chạy khi component được mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(`${name}: ${value}`); // Log giá trị mỗi khi input thay đổi
  };

  const handleAddDetail = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    try {
      // Log giá trị formData để kiểm tra
      console.log("Submitting data:", {
        courseTimelineId: timelineId,
        title: formData.title,
        videoUrl: formData.videoUrl,
        topic: formData.topic,
        selectedOptionId: formData.selectedOption, // Thêm ID tùy chọn
        isEnabled: true,
      });

      // Gửi dữ liệu theo định dạng mà API mong đợi
      await axios.post(`https://localhost:7030/api/CourseTimelineDetail`, [
        {
          courseTimelineId: formData.selectedOption,
          title: formData.title,
          videoUrl: formData.videoUrl,
          topic: formData.topic,
          isEnabled: true,
        },
      ]);

      onDetailAdded(); // Gọi lại hàm để cập nhật danh sách
      setShowForm(false); // Ẩn form sau khi thêm thành công
      setFormData({ title: "", videoUrl: "", topic: "", selectedOption: "" }); // Đặt lại giá trị form
    } catch (error) {
      console.error(
        "Failed to add course timeline detail",
        error.response?.data
      ); // Log thông tin lỗi chi tiết
      console.error("Validation errors:", error.response?.data?.errors); // Log thông tin lỗi xác thực
    }
  };

  return (
    <div className="flex flex-col items-start my-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="border-dashed border-2 border-gray-300 rounded-lg p-3 w-64 flex items-center justify-center hover:bg-gray-50 transition duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      {showForm && (
        <form
          className="mt-4 p-4 bg-white shadow-md rounded w-80"
          onSubmit={handleAddDetail}
        >
          <h2 className="text-lg font-semibold mb-4">Thêm Chi Tiết Lộ Trình</h2>

          <label className="block mb-2">
            Tiêu đề
            <input
              type="text"
              name="title"
              placeholder="Tiêu đề"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </label>

          <label className="block mb-2">
            URL video
            <input
              type="text"
              name="videoUrl"
              placeholder="URL video"
              value={formData.videoUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </label>

          <label className="block mb-2">
            Chủ đề
            <input
              type="text"
              name="topic"
              placeholder="Chủ đề"
              value={formData.topic}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </label>

          <label className="block mb-2">
            Chọn một tùy chọn
            <select
              name="selectedOption"
              value={formData.selectedOption}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="" disabled>
                Chọn tùy chọn
              </option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </select>
          </label>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-300 text-white py-1 px-3 rounded" // Giảm padding
              onClick={() => setShowForm(false)} // Đóng form nếu muốn hủy
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-1 px-3 rounded" // Giảm padding
            >
              Lưu chi tiết
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ButtonAddCourseTimelineDetail;
