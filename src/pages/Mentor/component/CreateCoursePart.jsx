import { useState } from "react";
import axios from "axios";

const CreateCoursePart = ({ courseSkillId, onClose, onCreated }) => {
  const [coursePart, setCoursePart] = useState({
    courseSkillId: courseSkillId || "", // Gán giá trị mặc định là courseSkillId
    title: "",
    contentType: "",
    contentUrl: "",
    order: 0,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoursePart((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("https://localhost:7030/api/CourseParts", coursePart);
      alert("Course Part created successfully!");
      onClose(); // Đóng form khi tạo thành công
      onCreated(); // Gọi onCreated để component cha cập nhật CoursePartCard
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create course part");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create Course Part</h2>
      <form onSubmit={handleSubmit}>
        {/* Input ẩn để chứa courseSkillId */}
        <input
          type="hidden"
          name="courseSkillId"
          value={coursePart.courseSkillId}
        />

        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={coursePart.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content Type</label>
          <input
            type="text"
            name="contentType"
            value={coursePart.contentType}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content URL</label>
          <input
            type="text"
            name="contentUrl"
            value={coursePart.contentUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Order</label>
          <input
            type="number"
            name="order"
            value={coursePart.order}
            onChange={handleChange}
            min="0"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Course Part"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default CreateCoursePart;
