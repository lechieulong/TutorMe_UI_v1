import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import ClassCard from "../Class/components/ClassCard";

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

  const handleSwitchChange = (classId, newStatus) => {
    setClasses((prevClasses) =>
      prevClasses.map((classItem) =>
        classItem.id === classId
          ? { ...classItem, isEnabled: newStatus }
          : classItem
      )
    );
  };

  const handleSelectClass = (classId) => {
    console.log(`Class selected: ${classId}`);
  };

  useEffect(() => {
    fetchClasses();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col w-screen min-h-screen bg-gray-50">
        <div className="flex flex-1 mt-16 w-full">
          <MentorSidebar />
          <div className="flex-1 p-6 bg-white rounded-lg shadow-md mx-4">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Danh sách các lớp học
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {classes.map((classItem) => (
                <ClassCard
                  key={classItem.id}
                  classItem={classItem}
                  switchState={classItem.isEnabled}
                  onSwitchChange={handleSwitchChange}
                  onSelect={handleSelectClass}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClassOfCourseList;
