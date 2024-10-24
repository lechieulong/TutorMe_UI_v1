import { useState, useEffect } from "react";
import InputField from "./InputField"; // Đảm bảo InputField được export đúng
import { useDispatch, useSelector } from "react-redux";
import { createClassAPI } from "../../../redux/classes/ClassSlice"; // Sửa tên

const ButtonAddClass = ({ courseId, onClassCreated }) => {
  const dispatch = useDispatch();
  const { createStatus } = useSelector((state) => state.classes);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClassData, setNewClassData] = useState({
    className: "",
    classDescription: "",
    courseId: courseId,
    startDate: new Date().toISOString().substring(0, 10),
    imageUrl: null,
  });
  const [formErrors, setFormErrors] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewClassData({
      className: "",
      classDescription: "",
      courseId: courseId,
      startDate: new Date().toISOString().substring(0, 10),
      imageUrl: null,
    });
  };

  useEffect(() => {
    if (createStatus === "success") {
      onClassCreated();
      closeModal();
    }
  }, [createStatus, onClassCreated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClassData({
      ...newClassData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewClassData({
      ...newClassData,
      imageUrl: file.name,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!newClassData.className) errors.className = "Class Name is required";
    if (!newClassData.classDescription)
      errors.classDescription = "Description is required";
    if (!newClassData.startDate) errors.startDate = "Start Date is required";
    if (!newClassData.imageUrl) errors.imageUrl = "Image is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      dispatch(createClassAPI(newClassData)); // Sử dụng tên đúng
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <button
        className="border-dashed border-2 border-gray-300 rounded-lg p-3 w-64 flex items-center justify-center hover:bg-gray-50 transition duration-200"
        onClick={openModal}
      >
        Create Class
      </button>

      {/* Modal tạo lớp mới */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Create New Class</h2>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Class Name"
                id="className"
                type="text"
                name="className"
                value={newClassData.className}
                onChange={handleChange}
                placeholder="Enter class name"
                error={formErrors.className}
              />
              <InputField
                label="Class Description"
                id="classDescription"
                type="textarea"
                name="classDescription"
                value={newClassData.classDescription}
                onChange={handleChange}
                placeholder="Enter class description"
                error={formErrors.classDescription}
              />
              <div className="mb-4">
                <label
                  htmlFor="startDate"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={newClassData.startDate}
                  min={new Date().toISOString().substring(0, 10)}
                  onChange={handleChange}
                  className="block w-full h-12 px-4 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  required
                />
                {formErrors.startDate && (
                  <p className="font-mono text-red-500 text-xs mt-1">
                    {formErrors.startDate}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="imageUrl"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="imageUrl"
                  name="imageUrl"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full h-12 px-4 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  required
                />
                {formErrors.imageUrl && (
                  <p className="font-mono text-red-500 text-xs mt-1">
                    {formErrors.imageUrl}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-white py-1 px-3 rounded mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-1 px-3 rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonAddClass;
