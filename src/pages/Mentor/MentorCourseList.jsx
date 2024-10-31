import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaSurprise,
  FaAssistiveListeningSystems,
  FaPenAlt,
} from "react-icons/fa";
import MainLayout from "../../layout/MainLayout";
import Filter from "../Course/components/Filter";
import CourseCard from "../Course/components/CourseCard";
import { fetchCoursesByUserId } from "../../redux/courses/CourseSlice";
import axios from "axios";
import { getUser } from "../../service/GetUser";

const MentorCourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { courses = [], status, error } = useSelector((state) => state.courses);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const coursesPerPage = 8;

  useEffect(() => {
    const userFromToken = getUser();
    setUser(userFromToken);
  }, []);

  useEffect(() => {
    if (user?.sub) {
      dispatch(fetchCoursesByUserId(user.sub));
    }
  }, [dispatch, user]);

  const categories = useMemo(
    () => ["All", "Listening", "Reading", "Writing", "Speaking"],
    []
  );

  const filteredCourses = useMemo(() => {
    return courses
      .filter(
        (course) =>
          selectedCategory === "All" ||
          course.categories.includes(selectedCategory)
      )
      .filter((course) => {
        const courseTitle = course.title || "";
        const term = searchTerm || "";
        return courseTitle.toLowerCase().includes(term.toLowerCase());
      });
  }, [courses, selectedCategory, searchTerm]);

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

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`https://localhost:7030/api/Courses/${courseId}`);
      dispatch(fetchCoursesByUserId(user.sub));
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

  return (
    <MainLayout>
      <div className="px-4 py-6">
        <div className="bg-blue-100 p-4 rounded-lg mb-6 text-center">
          <h2 className="text-2xl font-semibold text-blue-700">
            Manage Your Courses as a Mentor!
          </h2>
          <p className="text-gray-700 mt-2">
            View, manage, and delete your created courses here.
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
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            onClick={() => navigate("/createCourse")}
          >
            Create Course
          </button>
        </div>

        {status === "pending" && <p>Loading courses...</p>}

        {currentCourses.length === 0 && status !== "pending" && (
          <div className="flex justify-center items-center h-32">
            <p className="text-red-500 text-lg font-semibold text-center">
              Bạn chưa có khoá học nào
            </p>
          </div>
        )}

        {currentCourses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {currentCourses.map((course) => (
              <CourseCard
                key={course.id}
                courseName={course.courseName}
                content={course.content}
                title={course.title}
                description={course.description}
                category={course.categories
                  .map((category) => {
                    if (category === "Reading") return 0;
                    if (category === "Listening") return 1;
                    if (category === "Writing") return 2;
                    if (category === "Speaking") return 3;
                    return -1; // giá trị không hợp lệ
                  })
                  .join(", ")} // Hiển thị tất cả category dưới dạng số
                icon={getIcon(course.categories[0])} // Lấy icon cho category đầu tiên
                teacher={user?.name}
                courseId={course.id}
                onDelete={handleDelete}
                isEnabled={course.isEnabled}
              />
            ))}
          </div>
        )}

        {currentCourses.length > 0 && (
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 mx-1 text-sm font-medium ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-600"
              } text-white border border-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              Previous
            </button>
            <span className="text-sm mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 mx-1 text-sm font-medium ${
                currentPage === totalPages ? "bg-gray-300" : "bg-blue-600"
              } text-white border border-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MentorCourseList;
