import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { STATUS } from "../../constant/SliceName";
import { getUser } from "../../service/GetUser";
import CreateCourse from "../Course/components/CreateCourse";

const MentorCourseList = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const { courses = [], status, error } = useSelector((state) => state.courses);

  const [selectedSkill, setSelectedSkill] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isCourseCreated, setIsCourseCreated] = useState(false);
  const coursesPerPage = 8;

  useEffect(() => {
    const userFromToken = getUser();
    setUser(userFromToken);
  }, []);

  useEffect(() => {
    if (isCourseCreated && user?.sub) {
      dispatch(fetchCoursesByUserId(user.sub));
      setIsCourseCreated(false);
    }
  }, [isCourseCreated, dispatch, user]);

  const categories = useMemo(
    () => ["All", "Listening", "Reading", "Writing", "Speaking"],
    []
  );

  const filteredCourses = useMemo(() => {
    if (status === STATUS.SUCCESS) {
      return courses
        .filter((course) => {
          if (selectedSkill === "All") return true;
          return course.categories.includes(selectedSkill);
        })
        .filter((course) => {
          const courseTitle = course.courseName || "";
          const term = searchTerm || "";
          return courseTitle.toLowerCase().includes(term.toLowerCase());
        });
    }
    return [];
  }, [courses, selectedSkill, searchTerm, status]);

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

  const getIcon = (Skill) => {
    switch (Skill) {
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
  const handleOpenCreateCourse = () => setIsCreateCourseOpen(true);
  const handleCloseCreateCourse = () => setIsCreateCourseOpen(false);
  const handleCreateSuccess = () => {
    setIsCourseCreated(true);
    handleCloseCreateCourse();
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
            selectedSkill={selectedSkill}
            onSkillSelect={(Skill) => {
              setSelectedSkill(Skill);
              setCurrentPage(1);
            }}
            searchTerm={searchTerm}
            onSearchChange={(term) => setSearchTerm(term)}
          />
          <button onClick={handleOpenCreateCourse} className="btn">
            Create Course
          </button>

          {isCreateCourseOpen && (
            <CreateCourse
              onClose={handleOpenCreateCourse}
              onCreateSuccess={handleCreateSuccess}
            />
          )}
        </div>

        {/* Hiển thị lỗi nếu có */}
        {error && (
          <div className="text-red-500 text-center mb-4">Error: {error}</div>
        )}

        {currentCourses.length === 0 && !error && (
          <div className="flex justify-center items-center h-32">
            <p className="text-red-500 text-lg font-semibold text-center">
              Bạn chưa có khoá học nào
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {currentCourses.map((course) => {
            console.log("Categories:", course.categories); // Log categories của từng course
            return (
              <CourseCard
                key={course.id}
                courseName={course.courseName}
                content={course.content}
                title={course.title}
                description={course.description}
                Skill={course.categories}
                icon={getIcon(course.categories)}
                teacher={course.userId}
                courseId={course.id}
                onDelete={handleDelete}
                isEnabled={course.isEnabled}
              />
            );
          })}
        </div>

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
    </MainLayout>
  );
};

export default MentorCourseList;
