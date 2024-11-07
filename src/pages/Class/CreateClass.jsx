import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Thêm useNavigate
import axios from "axios";

const CreateClass = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Khai báo biến navigate
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [count, setCount] = useState(0);
  const [courseId, setCourseId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [inputErrors, setInputErrors] = useState({
    className: false,
    classDescription: false,
    count: false,
    startDate: false,
    endDate: false,
    startTime: false,
    endTime: false,
    imageUrl: false,
  });

  useEffect(() => {
    if (location.state?.courseId) {
      setCourseId(location.state.courseId);
    }
  }, [location.state?.courseId]);

  const validateStartDate = () => {
    const today = new Date().toISOString().split("T")[0];
    if (startDate < today) {
      setInputErrors((prev) => ({ ...prev, startDate: true }));
    } else {
      setInputErrors((prev) => ({ ...prev, startDate: false }));
    }
  };

  const validateEndDate = () => {
    if (endDate < startDate) {
      setInputErrors((prev) => ({ ...prev, endDate: true }));
    } else {
      setInputErrors((prev) => ({ ...prev, endDate: false }));
    }
  };

  const validateStartTime = () => {
    const [hours] = startTime.split(":").map(Number);
    if (hours < 6 || hours >= 22) {
      setInputErrors((prev) => ({ ...prev, startTime: true }));
    } else {
      setInputErrors((prev) => ({ ...prev, startTime: false }));
    }
  };

  const validateEndTime = () => {
    const [startHours] = startTime.split(":").map(Number);
    const [endHours] = endTime.split(":").map(Number);
    if (endHours < startHours || endHours >= 22) {
      setInputErrors((prev) => ({ ...prev, endTime: true }));
    } else {
      setInputErrors((prev) => ({ ...prev, endTime: false }));
    }
  };

  const validateFields = () => {
    validateStartDate();
    validateEndDate();
    validateStartTime();
    validateEndTime();
    return !Object.values(inputErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra trường trước khi gửi
    if (!validateFields()) return;

    const newClass = {
      className,
      classDescription,
      count,
      courseId,
      startDate,
      endDate,
      startTime: { ticks: new Date(startTime).getTime() * 10000 },
      endTime: { ticks: new Date(endTime).getTime() * 10000 },
      isEnabled,
      imageUrl,
    };

    try {
      const response = await axios.post(
        "https://localhost:7030/api/class",
        newClass
      );
      console.log("Class created successfully:", response.data);

      // Reset form nếu cần thiết
      setClassName("");
      setClassDescription("");
      setCount(0);
      setStartDate("");
      setEndDate("");
      setStartTime("");
      setEndTime("");
      setIsEnabled(true);
      setImageUrl("");
      setInputErrors({
        className: false,
        classDescription: false,
        count: false,
        startDate: false,
        endDate: false,
        startTime: false,
        endTime: false,
        imageUrl: false,
      }); // Reset lỗi input

      navigate(-1); // Trở về trang trước đó
    } catch (error) {
      console.error("Failed to create class:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Thêm Lớp Học Mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Tên Lớp Học
          </label>
          <input
            type="text"
            value={className}
            onChange={(e) => {
              setClassName(e.target.value);
              setInputErrors((prev) => ({ ...prev, className: false })); // Reset lỗi khi người dùng nhập
            }}
            required
            className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
              inputErrors.className ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Mô Tả</label>
          <textarea
            value={classDescription}
            onChange={(e) => {
              setClassDescription(e.target.value);
              setInputErrors((prev) => ({ ...prev, classDescription: false })); // Reset lỗi khi người dùng nhập
            }}
            required
            className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
              inputErrors.classDescription
                ? "border-red-500"
                : "border-gray-300"
            }`}
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
            onChange={(e) => {
              setCount(e.target.value);
              setInputErrors((prev) => ({ ...prev, count: false })); // Reset lỗi khi người dùng nhập
            }}
            required
            className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
              inputErrors.count ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        <input type="hidden" value={courseId} />

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
                validateStartDate(); // Kiểm tra khi thay đổi
              }}
              required
              className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                inputErrors.startDate ? "border-red-500" : "border-gray-300"
              }`}
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
                validateEndDate(); // Kiểm tra khi thay đổi
              }}
              required
              className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                inputErrors.endDate ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Thời Gian Bắt Đầu
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                validateStartTime(); // Kiểm tra khi thay đổi
              }}
              required
              className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                inputErrors.startTime ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Thời Gian Kết Thúc
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                validateEndTime(); // Kiểm tra khi thay đổi
              }}
              required
              className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                inputErrors.endTime ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            URL Hình Ảnh
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setInputErrors((prev) => ({ ...prev, imageUrl: false })); // Reset lỗi khi người dùng nhập
            }}
            required
            className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
              inputErrors.imageUrl ? "border-red-500" : "border-gray-300"
            }`}
          />
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
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Tạo Lớp Học
        </button>
      </form>
    </div>
  );
};

export default CreateClass;
