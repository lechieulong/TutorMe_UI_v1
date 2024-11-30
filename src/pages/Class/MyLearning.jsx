import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MainLayout from "../../layout/MainLayout";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {
  FaGraduationCap,
  FaPeopleArrows,
  FaAudible,
  FaThList,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getUser } from "../../service/GetUser";
import CourseCard from "../Course/components/CourseCard";

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLink, setActiveLink] = useState("mylearning");
  const scrollContainerRef = useRef(null);
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

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <MainLayout>
      <nav className="bg-white flex flex-col">
        <div className="px-24 border-t border-gray-700">
          <ul className="flex space-x-10 border-b border-gray-500">
            <li>
              <Link
                to="/a"
                className={`flex items-center space-x-2 py-2 px-4 rounded-t-lg hover:text-black transition-colors duration-200 ease-in-out 
                                ${
                                  activeLink === "allcourse"
                                    ? "text-black border-b-2 border-gray-400"
                                    : ""
                                }`}
                onClick={() => setActiveLink("allcourse")}
              >
                <FaAudible className="text-lg" />
                <span>All Course</span>
              </Link>
            </li>
            <li>
              <Link
                to="/mylearning"
                className={`flex items-center space-x-2 py-2 px-4 rounded-t-lg hover:text-black transition-colors duration-200 ease-in-out 
                                ${
                                  activeLink === "mylearning"
                                    ? "text-black border-b-2 border-gray-400"
                                    : ""
                                }`}
                onClick={() => setActiveLink("mylearning")}
              >
                <FaGraduationCap className="text-lg" />
                <span>My Learning</span>
              </Link>
            </li>
            <li>
              <Link
                to="/mylearning"
                className={`flex items-center space-x-2 py-2 px-4 rounded-t-lg hover:text-black transition-colors duration-200 ease-in-out 
                                ${
                                  activeLink === "coaching"
                                    ? "text-black border-b-2 border-gray-400"
                                    : ""
                                }`}
                onClick={() => setActiveLink("coaching")}
              >
                <FaPeopleArrows className="text-lg" />
                <span>Coaching 1:1</span>
              </Link>
            </li>
            <li>
              <Link
                to="/mylearning"
                className={`flex items-center space-x-2 py-2 px-4 rounded-t-lg hover:text-black transition-colors duration-200 ease-in-out 
                                ${
                                  activeLink === "setting"
                                    ? "text-black border-b-2 border-gray-400"
                                    : ""
                                }`}
                onClick={() => setActiveLink("setting")}
              >
                <FaThList className="text-lg" />
                <span>Setting</span>
              </Link>
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
        <div className="relative flex items-center">
          <div
            ref={scrollContainerRef}
            className="flex overflow-hidden space-x-4 px-12 py-2 scroll-smooth"
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
