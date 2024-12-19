import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../layout/MainLayout";
import { FaGraduationCap } from "react-icons/fa";
import { getUser } from "../../service/GetUser";
import CourseCard from "../Course/components/CourseCard";

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getUser();
    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.sub) return;

      setLoading(true);
      try {
        // Fetch Enrollment Data
        const enrollmentResponse = await axios.get(
          `https://localhost:7030/api/Enrollment/User/${user.sub}`
        );

        const enrolledCourses = enrollmentResponse.data || [];
        const courseInfoPromises = enrolledCourses.map((enrollment) =>
          axios
            .get(
              `https://localhost:7030/api/Courses/course-info/${enrollment.courseId}`
            )
            .then((response) => ({
              ...response.data.result, // Kết hợp thông tin course
              classId: enrollment.classId, // Thêm classId từ Enrollment
            }))
        );

        const coursesData = await Promise.all(courseInfoPromises);
        setCourses(coursesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <MainLayout>
      <nav className="bg-white flex flex-col">
        <div className="px-24 border-t border-gray-700">
          <ul className="flex space-x-10 border-b border-gray-500">
            <li>
              <h2
                className={`flex items-center space-x-2 py-2 px-4 rounded-t-lg hover:text-black transition-colors duration-200 ease-in-out`}
              >
                <FaGraduationCap className="text-lg" />
                <span>My Learning</span>
              </h2>
            </li>
          </ul>
        </div>
      </nav>

      <div className="flex-1 p-12">
        {loading && (
          <p className="font-mono text-xs text-yellow-500 text-center mt-2">
            Loading...
          </p>
        )}
        {error && (
          <p className="font-mono text-xs text-red-500 text-center mt-2">
            {error}
          </p>
        )}
        {courses && courses.length === 0 && !loading && (
          <p className="font-mono text-xs text-red-500 text-center mt-2">
            Bạn chưa tham gia khóa học nào.
          </p>
        )}
        <div className="relative flex items-center">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-12 py-2"
            style={{ scrollBehavior: "smooth" }}
          >
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                courseId={course.id}
                classId={course.classId} // Truyền classId từ Enrollment
                courseName={course.courseName}
                content={course.content}
                teacher={course.teacherName || "Unknown"}
                price={course.price || 0}
                Skill={course.categories?.join(", ") || "N/A"}
                imageUrl={
                  course.imageUrl || "https://via.placeholder.com/320x180"
                }
                isEnabled={course.isEnabled}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyLearning;
