import React, { useEffect, useState, useMemo } from "react";
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
import Notification from "../../components/common/Notification";
import Confirm from "../../components/common/Confirm";
import axios from "axios";
import { STATUS } from "../../constant/SliceName";
import { getUser } from "../../service/GetUser";
import CreateCourse from "../Course/components/CreateCourse";
import { GetCreatedCourses } from "../../redux/courses/CourseSlice";
import { toast, ToastContainer } from "react-toastify";
import apiURLConfig from "../../redux/common/apiURLConfig";
import { ClipLoader } from "react-spinners";

const MentorCourseList = () => {
  const dispatch = useDispatch();
  const { createdCourses = [], status } = useSelector((state) => state.courses);
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmContent, setConfirmContent] = useState({
    message: "",
    onConfirm: null,
  });
  const coursesPerPage = 8;

  useEffect(() => {
    const userFromToken = getUser();
    if (userFromToken) {
      dispatch(GetCreatedCourses());
    }
  }, [dispatch]);

  const categories = useMemo(
    () => ["All", "Listening", "Reading", "Writing", "Speaking"],
    []
  );

  const filteredCourses = useMemo(() => {
    const courses = Array.isArray(createdCourses) ? createdCourses : [];
    return courses
      .filter((course) => {
        if (selectedSkill === "All") return true;
        return course.categories.includes(selectedSkill);
      })
      .filter((course) => {
        const courseTitle = course.courseName || "";
        return courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }, [createdCourses, selectedSkill, searchTerm]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    return filteredCourses.slice(startIndex, endIndex);
  }, [filteredCourses, currentPage, coursesPerPage]);

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

  const handleDelete = (courseId) => {
    setConfirmContent({
      message: "Are you sure you want to delete this?",
      onConfirm: async () => {
        try {
          await axios.delete(`${apiURLConfig.baseURL}/Courses/${courseId}`);
          dispatch(GetCreatedCourses());
          toast.success("Delete course success!");
        } catch (error) {
          toast.error("Delete course failed!");
        }
        setIsConfirmOpen(false);
      },
    });
    setIsConfirmOpen(true);
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

  const handleOpenCreateCourse = () => setIsCreateCourseOpen(true);
  const handleCloseCreateCourse = () => setIsCreateCourseOpen(false);
  const handleCreateSuccess = () => {
    dispatch(GetCreatedCourses());
    handleCloseCreateCourse();
  };

  return (
    <MainLayout>
      <div className="px-4 py-6">
        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification("")}
          />
        )}
        <Confirm
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => confirmContent.onConfirm()}
          message={confirmContent.message}
          status="Delete Confirmation"
        />
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
              onClose={handleCloseCreateCourse}
              onCreateSuccess={handleCreateSuccess}
            />
          )}
        </div>

        {paginatedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {status === STATUS.PENDING ? (
              <div className="col-span-full flex justify-center items-center">
                <ClipLoader color="#000000" size={50} />
              </div>
            ) : (
              paginatedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  courseName={course.courseName}
                  content={course.content}
                  title={course.title}
                  description={course.description}
                  Skill={course.categories}
                  icon={getIcon(course.categories)}
                  teacher={course.teacherName}
                  courseId={course.id}
                  onDelete={handleDelete}
                  isEnabled={course.isEnabled}
                  price={course.price}
                  imageUrl={course.imageUrl}
                />
              ))
            )}
          </div>
        ) : null}

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
        <ToastContainer autoClose={3000} newestOnTop closeOnClick />
      </div>
    </MainLayout>
  );
};

export default MentorCourseList;
