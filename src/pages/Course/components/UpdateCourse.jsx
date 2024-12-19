import { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "../../../service/GetUser";
import { Checkbox, FormControlLabel } from "@mui/material";
import Notification from "../../../components/common/Notification";
import Confirm from "../../../components/common/Confirm";

const SkillMapping = {
  Reading: "0",
  Listening: "1",
  Writing: "2",
  Speaking: "3",
};

const UpdateCourse = ({ onClose, onCreateSuccess }) => {
  const [course, setCourse] = useState({
    courseName: "",
    content: "",
    hours: 0,
    days: 0,
    categories: [],
    price: 0,
    userId: "",
    imageUrl: "default_image_url.jpg",
  });

  const [notification, setNotification] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => {});

  useEffect(() => {
    const userFromToken = getUser();
    if (userFromToken?.sub) {
      setCourse((prevCourse) => ({
        ...prevCourse,
        userId: userFromToken.sub,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const SkillValue = SkillMapping[value];

    setCourse((prevCourse) => {
      const newCategories = checked
        ? [...prevCourse.categories, SkillValue]
        : prevCourse.categories.filter((Skill) => Skill !== SkillValue);
      return { ...prevCourse, categories: newCategories };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (course.hours < 0 || course.days < 0 || course.price < 0) {
      setNotification("Số giờ, số ngày và giá không được phép âm.");
      return;
    }

    // Định dạng ngày hiện tại thành dd/mm/yyyy
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const today = formatDate(new Date());

    // Thêm createdAt và updatedAt vào dữ liệu
    const courseWithTimestamps = {
      ...course,
      createdAt: today,
      updatedAt: today,
    };
    console.log(courseWithTimestamps);

    setConfirmMessage("Are you sure you want to create new course?");
    setConfirmAction(() => async () => {
      try {
        await axios.post(
          "https://localhost:7030/api/Courses",
          courseWithTimestamps
        );
        setNotification("Create new course success!");
        onCreateSuccess();
        onClose();
      } catch (error) {
        console.error("Fail to create new course!", error.response?.data);
        setNotification(
          "Fail to create new course!" +
            (error.response?.data.message || error.message)
        );
      } finally {
        setIsConfirmOpen(false);
      }
    });
    setIsConfirmOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification("")}
        />
      )}
      <Confirm
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmAction}
        message={confirmMessage}
        status="Create new course"
      />
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
        <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Course's Name</label>
            <input
              type="text"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Content</label>
            <textarea
              name="content"
              value={course.content}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Hours</label>
            <input
              type="number"
              name="hours"
              value={course.hours}
              onChange={handleChange}
              min="0"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Days</label>
            <input
              type="number"
              name="days"
              value={course.days}
              onChange={handleChange}
              min="0"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Skill</label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              {Object.keys(SkillMapping).map((skill) => (
                <FormControlLabel
                  key={skill}
                  control={
                    <Checkbox
                      value={skill}
                      onChange={handleCheckboxChange}
                      sx={{
                        color: "teal",
                        "&.Mui-checked": {
                          color: "teal",
                        },
                      }}
                    />
                  }
                  label={skill}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              min="0"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
