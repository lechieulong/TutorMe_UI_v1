import { useState } from "react";
import axios from "axios";
import Confirm from "../../../components/common/Confirm";
import Notification from "../../../components/common/Notification";

const CreateCoursePart = ({
  courseSkillId,
  onClose,
  onCreated,
  mentorAndList,
}) => {
  console.log("Props in CreateCoursePart:", { courseSkillId, mentorAndList });

  const [coursePart, setCoursePart] = useState({
    courseSkillId: courseSkillId || "",
    title: "",
    contentType: "",
    contentUrl: "",
    order: 0,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoursePart((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setConfirmOpen(true); // Mở modal Confirm trước khi tạo
  };

  const confirmActionHandler = async () => {
    setLoading(true);
    try {
      await axios.post("https://localhost:7030/api/CourseParts", coursePart);
      setNotification("Course Part created successfully!");
      onCreated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create course part");
      setNotification("Failed to create course part.");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  console.log("State in CreateCoursePart:", coursePart);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create Course Part</h2>
      <form onSubmit={handleSubmit}>
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
            className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-green-500 text-white shadow-sm hover:bg-green-600 focus:outline-none"
          >
            {loading ? "Creating..." : "Create Course Part"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-gray-500 text-white shadow-sm hover:bg-gray-600 focus:outline-none"
          >
            Cancel
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>

      <Confirm
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmActionHandler}
        status="Confirmation"
        shoud="yes"
        message="Are you sure you want to create this Course Part?"
      />

      <Notification
        message={notification}
        onClose={() => setNotification("")}
        shoud={error ? "no" : "yes"}
      />
    </div>
  );
};

export default CreateCoursePart;
