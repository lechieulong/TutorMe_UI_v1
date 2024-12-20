import { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import apiURLConfig from "../../../redux/common/apiURLConfig";
const ButtonAddCourseTimelineDetail = ({ courseId, onDetailAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    topic: "",
    selectedOption: "",
    isEnabled: true,
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          `${apiURLConfig}/CourseTimeline/Course/${courseId}`
        );

        if (response.data && response.data.length > 0) {
          setOptions(response.data);
          console.log(response.data);
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error("Failed to fetch options", error);
      }
    };

    fetchOptions();
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDetail = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting data:", {
        courseTimelineId: formData.selectedOption,
        title: formData.title,
        videoUrl: formData.videoUrl,
        topic: formData.topic,
        isEnabled: true,
      });

      await axios.post(`${apiURLConfig}/CourseTimelineDetail`, [
        {
          courseTimelineId: formData.selectedOption,
          title: formData.title,
          videoUrl: formData.videoUrl,
          topic: formData.topic,
          isEnabled: true,
        },
      ]);

      onDetailAdded();
      setShowForm(false);
      setFormData({ title: "", videoUrl: "", topic: "", selectedOption: "" });
    } catch (error) {
      console.error(
        "Failed to add course timeline detail",
        error.response?.data
      );
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
              placeholder="Nhập tiêu đề"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </label>

          <label className="block mb-2">
            URL Video
            <input
              type="text"
              name="videoUrl"
              placeholder="Nhập URL video"
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
              placeholder="Nhập chủ đề"
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
              className="bg-gray-300 text-white py-1 px-3 rounded"
              onClick={() => setShowForm(false)}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-1 px-3 rounded"
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
