import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Class } from "@mui/icons-material";

const UpdateClass = ({ classItem, courseId, onClose, onCreateSuccess }) => {
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [inputErrors, setInputErrors] = useState({
    className: false,
    classDescription: false,
    count: false,
    startDate: false,
    endDate: false,
  });
  console.log(classItem);

  useEffect(() => {
    if (classItem) {
      setClassName(classItem.className || "");
      setClassDescription(classItem.classDescription || "");
      setCount(classItem.count || 0);
      setStartDate(classItem.startDate || "");
      setEndDate(classItem.endDate || "");
      setIsEnabled(
        classItem.isEnabled !== undefined ? classItem.isEnabled : true
      );
    }
  }, [classItem]);

  const validateStartDate = () => {
    const today = new Date().toISOString().split("T")[0];
    setInputErrors((prev) => ({ ...prev, startDate: startDate < today }));
  };

  const validateEndDate = () => {
    setInputErrors((prev) => ({ ...prev, endDate: endDate < startDate }));
  };

  const validateFields = () => {
    validateStartDate();
    validateEndDate();
    return !Object.values(inputErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const updatedClass = {
      Id,
      className,
      classDescription,
      count,
      courseId,
      startDate,
      endDate,
      isEnabled,
    };

    try {
      // Gửi PUT request đến API để cập nhật lớp học
      const response = await axios.put(
        `https://localhost:7030/api/class/${classItem.Id}`, // API endpoint
        updatedClass
      );

      if (response.data.isSuccess) {
        // Nếu thành công, gọi onCreateSuccess và onClose
        onCreateSuccess();
        onClose();
      } else {
        alert("Cập nhật lớp học thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật lớp học:", error);
      alert("Đã xảy ra lỗi khi cập nhật lớp học.");
    }
  };

  // Render the UpdateClass modal using a Portal to make sure it appears on top of other components
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative z-60">
        <h2 className="text-2xl font-bold mb-4">Cập Nhật Lớp Học</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Tên Lớp Học
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
            {/* <input
              type="hidden"
              value={Id}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full border p-2 rounded"
            /> */}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Mô Tả</label>
            <textarea
              value={classDescription}
              onChange={(e) => setClassDescription(e.target.value)}
              required
              className="w-full border p-2 rounded"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Số Lượng Học Viên
            </label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Ngày Bắt Đầu
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  validateStartDate();
                }}
                required
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Ngày Kết Thúc
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  validateEndDate();
                }}
                required
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={(e) => setIsEnabled(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-semibold">Kích Hoạt</span>
            </label>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 mr-4 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>,
    document.body // Render the modal directly to the body to make it appear on top of all other components
  );
};

export default UpdateClass;
