import React, { useState } from "react";
import axios from "axios";

const CreateCourseLesson = ({ coursePartId, onClose, onCreated }) => {
  const [lesson, setLesson] = useState({
    coursePartId: coursePartId || "",
    title: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      await axios.post("https://localhost:7030/api/CourseLessons", lesson);
      alert("Course Lesson created successfully!");
      onCreated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create course lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="coursePartId" value={lesson.coursePartId} />

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={lesson.title}
            onChange={handleChange}
            required
            placeholder="Enter Lesson Topic"
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Lesson"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default CreateCourseLesson;
