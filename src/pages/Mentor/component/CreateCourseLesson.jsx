import React, { useState } from "react";
import axios from "axios";

const questionTypes = [
  { value: 1, label: "Multiple Choice Questions" },
  { value: 2, label: "True/False/Not Given Questions" },
  { value: 3, label: "Yes/No/Not Given Questions" },
  { value: 4, label: "Matching Headings" },
  { value: 5, label: "Matching Information" },
  { value: 6, label: "Matching Features" },
  { value: 7, label: "Matching Sentence Endings" },
  { value: 8, label: "Sentence Completion" },
  { value: 11, label: "Summary Completion" },
  { value: 9, label: "Short-answer Questions" },
  { value: 10, label: "Diagram Completion" },
];

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
          <select
            name="title"
            value={lesson.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          >
            <option value="">Select Question Type</option>
            {questionTypes.map((type) => (
              <option key={type.value} value={type.label}>
                {type.label}
              </option>
            ))}
          </select>
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
