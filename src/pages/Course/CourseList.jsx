import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaSurprise,
  FaAssistiveListeningSystems,
  FaPenAlt,
} from "react-icons/fa";
import MainLayout from "../../layout/MainLayout";
import Filter from "./components/Filter";
import CourseCard from "./components/CourseCard";
import { fetchCourses } from "../../redux/courses/CourseSlice";
import { STATUS } from "../../constant/SliceName";
import axios from "axios"; // Import axios
import Calendar from "../../components/common/linkToCalendar";

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses = [], status, error } = useSelector((state) => state.courses);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const coursesPerPage = 8;

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const categories = useMemo(
    () => ["All", "Listening", "Reading", "Writing", "Speaking"],
    []
  );

  const filteredCourses = useMemo(() => {
    if (status === STATUS.SUCCESS) {
      return courses
        .filter(
          (course) =>
            selectedCategory === "All" || course.category === selectedCategory
        )
        .filter((course) => {
          const courseTitle = course.title || "";
          const term = searchTerm || "";
          return courseTitle.toLowerCase().includes(term.toLowerCase());
        });
    }
    return [];
  }, [courses, selectedCategory, searchTerm, status]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCourseClick = (courseId) => {
    if (courseId) {
      navigate(`/courseDetail/${courseId}`);
    } else {
      console.error("Course ID is undefined");
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`https://localhost:7030/api/Courses/${courseId}`);
      dispatch(fetchCourses()); // Tải lại danh sách khóa học sau khi xóa
    } catch (error) {
      console.error("Error deleting course", error);
      alert("Failed to delete course.");
    }
  };

  const getIcon = (category) => {
    switch (category) {
      case "Reading":
        return <FaBook className="text-blue-500 text-2xl" />;
      case "Listening":
        return (
          <FaAssistiveListeningSystems className="text-blue-500 text-2xl" />
        );
      case "Writing":
        return <FaPenAlt className="text-blue-500 text-2xl" />;
      case "Speaking":
        return <FaSurprise className="text-blue-500 text-2xl" />;
      default:
        return <FaBook className="text-blue-500 text-2xl" />;
    }
  };

  if (status === STATUS.PENDING) return <p>Loading...</p>;
  if (status === STATUS.FAILED) return <p>Error: {error}</p>;

  return (
    <MainLayout>
      <div className="px-4 py-6">
        {/* Banner Section */}
        <div className="bg-blue-100 p-4 rounded-lg mb-6 text-center">
          <h2 className="text-2xl font-semibold text-blue-700">
            Enhance Your IELTS Skills with Our Comprehensive Courses!
          </h2>
          <p className="text-gray-700 mt-2">
            Browse through our range of courses designed to help you ace the
            IELTS exam. Explore and start learning today!
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={(category) => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            searchTerm={searchTerm}
            onSearchChange={(term) => setSearchTerm(term)}
          />
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 transition-transform duration-500 dark:hover:scale-110"
            onClick={() => navigate("/createCourse")}
          >
            Create
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {currentCourses.map((course) => (
            <div key={course.id} className="cursor-pointer">
              <CourseCard
                courseName={course.courseName}
                content={course.content}
                title={course.title}
                description={course.description}
                category={course.category}
                icon={getIcon(course.category)}
                teacher={course.teacher}
                courseId={course.id}
                onDelete={handleDelete} // Truyền hàm xóa
              />
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-label="Previous Page"
            className={`px-3 py-1.5 mx-1 text-sm font-medium ${
              currentPage === 1 ? "bg-gray-300" : "bg-blue-600"
            } text-white border border-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            Previous
          </button>
          <span className="text-sm mx-2 text-black">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
            className={`px-3 py-1.5 mx-1 text-sm font-medium ${
              currentPage === totalPages ? "bg-gray-300" : "bg-blue-600"
            } text-white border border-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            Next
          </button>
        </div>
      </div>
      <Calendar/>
    </MainLayout>
  );
};

export default CourseList;
