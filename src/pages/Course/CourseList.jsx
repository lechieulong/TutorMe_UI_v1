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
  const {
    courses = [],
    status,
    error,
    totalPages,
  } = useSelector((state) => state.courses);

  const [selectedSkill, setSelectedSkill] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const coursesPerPage = 8;

  // Định nghĩa danh mục
  const categories = ["All", "Listening", "Reading", "Writing", "Speaking"];

  useEffect(() => {
    dispatch(
      fetchCourses({ pageNumber: currentPage, pageSize: coursesPerPage })
    );
  }, [dispatch, currentPage]);

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

  const filteredCourses = useMemo(() => {
    if (status === STATUS.SUCCESS) {
      return courses.filter((course) => {
        if (selectedSkill === "All") return true;
        return course.categories.includes(selectedSkill);
      });
    }
    return [];
  }, [courses, selectedSkill, status]);

  if (status === STATUS.PENDING) return <p>Loading...</p>;
  if (status === STATUS.FAILED) return <p>Error: {error}</p>;

  return (
    <MainLayout>
      <div className="px-4 py-6">
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
            categories={categories} // Sử dụng categories ở đây
            selectedSkill={selectedSkill}
            onSkillSelect={(Skill) => {
              setSelectedSkill(Skill);
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
            hidden={user?.role === "USER"}
          >
            My Course
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              imageUrl={course.imageUrl}
              courseName={course.courseName}
              title={course.title}
              Skill={course.categories}
              teacher={course.teacherName}
              price={course.price}
              courseId={course.id}
              isEnabled={course.isEnabled}
              content={course.content}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 fixed bottom-4 left-0 right-0">
            <div className="flex justify-center space-x-2">
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
        )}
      </div>
      <Calendar />
    </MainLayout>
  );
};

export default CourseList;
