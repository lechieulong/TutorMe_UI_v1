import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Calendar from "../../components/common/linkToCalendar";
import { Link } from "react-router-dom";
import { getUser } from "../../service/GetUser";

const CourseList = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { courses = [], status, error } = useSelector((state) => state.courses);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const coursesPerPage = 8;

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    const userFromToken = getUser();
    setUser(userFromToken);
  }, []);
  const categories = useMemo(
    () => ["All", "Listening", "Reading", "Writing", "Speaking"],
    []
  );

  // useEffect(() => {
  //   if (user?.sub) {
  //     dispatch(fetchCoursesByUserId(user.sub));
  //   }
  // }, [dispatch, user]);

  const filteredCourses = useMemo(() => {
    if (status === STATUS.SUCCESS) {
      return courses
        .filter((course) => {
          // Kiểm tra xem selectedCategory có phải là "All" không
          if (selectedCategory === "All") return true;

          // Kiểm tra xem category của khóa học có nằm trong danh sách categories không
          return course.categories.includes(selectedCategory);
        })
        .filter((course) => {
          const courseTitle = course.courseName || ""; // Sử dụng courseName thay vì title
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
          <Link
            to="/mentorCourseList"
            className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
              user?.role === "USER" ? "hidden opacity-50" : ""
            }`}
            hidden={user?.role === "USER"} // Vô hiệu hóa nút nếu Role là "USER"
          >
            My Course
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {currentCourses.map((course) => (
            <CourseCard
              key={course.id}
              courseName={course.courseName}
              content={course.content}
              title={course.title}
              description={course.description}
              category={course.category}
              icon={getIcon(course.category)}
              teacher={course.userId}
              courseId={course.id}
              isEnabled={course.isEnabled}
              // onDelete={handleDelete} // Pass the handleDelete function
            />
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
      <Calendar />
    </MainLayout>
  );
};

export default CourseList;
