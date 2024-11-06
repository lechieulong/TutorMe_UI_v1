import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import MainLayout from "../../layout/MainLayout";
import { getUser } from "../../service/GetUser";
import ClassCard from "../Class/components/ClassCard";
import CourseSkillCard from "./component/CourseSkillCard";
import { GetUserEnrollments } from "../../redux/Enrollment/EnrollmentSlice";

const CourseDetail = () => {
  const { className, courseId } = useParams();
  const location = useLocation();
  const Skill = location.state?.Skill;
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [classes, setClasses] = useState([]);
  const [switchStates, setSwitchStates] = useState({});
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enrollments, getEnrollmentsStatus } = useSelector(
    (state) => state.enrollment
  );

  const initializeUser = useCallback(() => {
    const userFromToken = getUser();
    const userIdFromToken = userFromToken?.sub;
    const userRoleFromToken = userFromToken?.role;

    if (userIdFromToken) setUserId(userIdFromToken);
    if (Array.isArray(userRoleFromToken)) {
      setUserRole(userRoleFromToken);
    }
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

  useEffect(() => {
    initializeUser();
    fetchClasses();
  }, [initializeUser, fetchClasses, courseId]);

  useEffect(() => {
    if (userId) {
      dispatch(GetUserEnrollments(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (getEnrollmentsStatus === "succeeded") {
      const isEnrolled = enrollments.some(
        (enrollment) => enrollment.courseId === courseId
      );
    }
  }, [getEnrollmentsStatus, enrollments, courseId]);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(prevSlide + 1, Math.ceil(classes.length / 4) - 1)
    );
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

            {/* Hiển thị nút Enroll nếu người dùng không có vai trò "TEACHER" */}
            {userRole && !userRole.includes("TEACHER") && (
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                onClick={() =>
                  navigate("/createClass", { state: { courseId } })
                }
              >
                Enroll
              </button>
            )}

            <div className="flex flex-col bg-white border w-full shadow-sm rounded-xl p-4 md:p-5 relative group mb-4">
              <div className="mt-4 relative">
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-bold text-gray-800">Classes</h4>
                  {userRole &&
                    !(userRole.length === 1 && userRole[0] === "USER") && (
                      <button
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                        onClick={() =>
                          navigate("/createClass", { state: { courseId } })
                        }
                      >
                        Create Class
                      </button>
                    )}
                </div>

                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {classes.map((classItem) => (
                      <ClassCard
                        key={classItem.id}
                        classItem={classItem}
                        switchState={switchStates[classItem.id] || false}
                      />
                    ))}
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
              <CourseSkillCard courseId={courseId} userRole={userRole} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetail;
