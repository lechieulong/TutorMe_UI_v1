import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import MainLayout from "../../layout/MainLayout";
import CoursePartCard from "../Course/components/CoursePartCard";
import CreateCoursePart from "./component/CreateCoursePart";
import { getUser } from "../../service/GetUser";
import ClassCard from "../../pages/Class/components/ClassCard";

const MentorCourseDetail = () => {
  const { className, courseId } = useParams();
  const location = useLocation();
  const Skill = location.state?.Skill;
  const [userId, setUserId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [classes, setClasses] = useState([]);
  const [switchStates, setSwitchStates] = useState({});
  const [hasError, setHasError] = useState(false);
  const [courseParts, setCourseParts] = useState([]);
  const [courseLessonsByPart, setCourseLessonsByPart] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [courseSkillId, setCourseSkillId] = useState(null);
  const navigate = useNavigate();

  const initializeUser = useCallback(() => {
    const userFromToken = getUser();
    const userIdFromToken = userFromToken?.sub;
    if (userIdFromToken) setUserId(userIdFromToken);
  }, []);

  const fetchClasses = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/class/course/${courseId}/classes`
      );
      setClasses(response.data.result);
      const initialSwitchStates = {};
      response.data.result.forEach((classItem) => {
        initialSwitchStates[classItem.id] = classItem.isEnabled;
      });
      setSwitchStates(initialSwitchStates);
      setHasError(false);
    } catch (error) {
      console.error("Failed to fetch classes", error);
      setHasError(true);
    }
  }, [courseId]);

  const fetchCourseSkill = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseSkills/Course/${courseId}`
      );
      if (response.data.length > 0) {
        setCourseSkillId(response.data[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch course skill", error);
      setHasError(true);
    }
  }, [courseId]);

  const fetchCourseParts = useCallback(async () => {
    if (!courseSkillId) return; // Ensure courseSkillId is set before fetching
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseParts/ByCourseSkill/${courseSkillId}`
      );
      const courseParts = response.data;
      setCourseParts(courseParts);
      setHasError(false);
      courseParts.forEach((part) => fetchCourseLessons(part.id));
    } catch (error) {
      console.error("Failed to fetch course parts", error);
      setHasError(true);
    }
  }, [courseSkillId]);

  const fetchCourseLessons = useCallback(
    async (coursePartId) => {
      if (courseLessonsByPart[coursePartId]) return; // Skip API call if data already exists
      try {
        const response = await axios.get(
          `https://localhost:7030/api/CourseLessons?coursePartId=${coursePartId}`
        );
        setCourseLessonsByPart((prev) => ({
          ...prev,
          [coursePartId]: response.data,
        }));
      } catch (error) {
        console.error(
          `Failed to fetch lessons for CoursePart ${coursePartId}`,
          error
        );
      }
    },
    [courseLessonsByPart]
  );

  useEffect(() => {
    initializeUser();
    fetchClasses();
    fetchCourseSkill();
  }, [initializeUser, fetchClasses, fetchCourseSkill, courseId]);

  // Fetch course parts after courseSkillId is set
  useEffect(() => {
    if (courseSkillId) {
      fetchCourseParts();
    }
  }, [courseSkillId, fetchCourseParts]);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(prevSlide + 1, Math.ceil(classes.length / 4) - 1)
    );
  };

  const handleCreateCoursePart = () => {
    if (!courseSkillId) {
      alert("CourseSkillId is not available.");
      return;
    }
    setShowCreateModal(true);
  };

  const handleModalClose = () => {
    setShowCreateModal(false);
    if (showCreateModal) {
      fetchCourseParts();
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col w-screen">
        <div className="flex flex-1 mt-16 w-full">
          <MentorSidebar />
          <div className="flex-1 p-4">
            <div className="flex justify-start items-center mb-4">
              <p className="text-black font-bold text-4xl">{className}</p>
            </div>
            <div className="flex flex-col bg-white border w-full shadow-sm rounded-xl p-4 md:p-5 relative group mb-4">
              <div className="mt-4 relative">
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-bold text-gray-800">Classes</h4>
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    onClick={() =>
                      navigate("/createClass", { state: { courseId } })
                    }
                  >
                    Create Class
                  </button>
                </div>

                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {classes.map(
                      (classItem) => (
                        console.log(classItem.id),
                        (
                          <ClassCard
                            key={classItem.id}
                            classItem={classItem}
                            switchState={switchStates[classItem.id] || false}
                          />
                        )
                      )
                    )}
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={handlePrev}
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    disabled={currentSlide === 0}
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleNext}
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    disabled={currentSlide >= Math.ceil(classes.length / 4) - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-800">Learning</h2>

                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  onClick={handleCreateCoursePart}
                >
                  Create Course Part
                </button>
              </div>

              {courseParts.map((coursePart) => (
                <CoursePartCard
                  key={coursePart.id}
                  coursePart={coursePart}
                  courseLessons={courseLessonsByPart[coursePart.id] || []}
                  courseId={courseId}
                  refreshCourseLessons={fetchCourseLessons}
                />
              ))}

              {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full relative">
                    <CreateCoursePart
                      courseSkillId={courseSkillId}
                      onClose={handleModalClose}
                    />
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MentorCourseDetail;
