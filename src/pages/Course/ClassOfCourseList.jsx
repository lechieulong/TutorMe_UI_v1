import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ClassOfCourseList = () => {
  const { courseId } = useParams(); // Lấy courseId từ URL
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/class/course/${courseId}/classes`
      );
      if (Array.isArray(response.data.result)) {
        setClasses(response.data.result);
      } else {
        setClasses([]);
        setError("Dữ liệu không hợp lệ.");
      }
    } catch (error) {
      setError("Không thể lấy danh sách lớp.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [courseId]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <h2 className="text-lg font-semibold mb-4">Danh Sách Lớp Học</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p>{error}</p>
      ) : Array.isArray(classes) && classes.length === 0 ? (
        <p>Không có lớp học nào.</p>
      ) : (
        <ul>
          {classes.map((classItem) => (
            <li key={classItem.id}>
              <h3 className="font-semibold">{classItem.className}</h3>
              <p>{classItem.classDescription}</p>
              <p>
                Thời gian: {new Date(classItem.startDate).toLocaleDateString()}{" "}
                - {new Date(classItem.endDate).toLocaleDateString()}
              </p>
              <p>
                Trạng thái:{" "}
                {classItem.isEnabled ? "Kích hoạt" : "Không kích hoạt"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassOfCourseList;
