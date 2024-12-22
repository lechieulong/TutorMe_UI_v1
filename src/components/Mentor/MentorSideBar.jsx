import { useLocation, useNavigate } from "react-router-dom";
import { FaInfo } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import { getUser } from "../../service/GetUser";
import useAuthToken from "../../hooks/useAuthToken"; // Import useAuthToken
import { useParams } from "react-router-dom";

const MentorSidebar = ({ mentorAndList, setSelectedComponent, isMentor, showReport }) => {
  const [user, setUser] = useState(null);
  const authToken = useAuthToken(); // Get token from cookie
  const { courseId } = useParams();
  const { pathname } = useLocation(); // Get current path and location state
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Hook để điều hướng

  const initializeUser = useCallback(() => {
    const userFromToken = getUser();
    setUserId(userFromToken?.sub);
  }, []);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  useEffect(() => {
    if (authToken) {
      const fetchUser = async () => {
        const fetchedUser = await getUser(); // Fetch the user using getUser
        setUser(fetchedUser); // Set user data in state
      };
      fetchUser();
    }
  }, [authToken]);

  const handleNavigate = (path, state = {}) => {
    // Add additional state to track current tab selection
    navigate(path, { state: { ...state, from: pathname } }); // Save the current page path
  };

  // Function to check if we're on the courseDetail or mentorCourseDetail page
  const isCurrentPage = (path) => pathname.includes(path);

  return (
    <div>
      <div
        id="hs-offcanvas-example"
        className="block shadow-lg sticky top-0 left-0 transition-all duration-300 transform w-64 bg-white border-e border-gray-200 pb-10 overflow-y-auto"
        role="dialog"
        tabIndex="-1"
        aria-label="Sidebar"
        style={{
          height: "calc(100vh - 67px)",
        }}
      >
        <nav className="p-6 w-full flex flex-col">
          <div className="border-b border-gray-200">
            <nav
              className="flex gap-x-1 flex-col"
              aria-label="Tabs"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                onClick={() => {
                  // Kiểm tra nếu mentorAndList là true
                  if (showReport) {
                    handleNavigate(`/mentorCourseDetail/${courseId}`, {
                      state: { userId, mentorAndList },
                    });
                    setSelectedComponent("Information");
                  } else {
                    handleNavigate(`/courseDetail/${courseId}`, {
                      state: { userId, mentorAndList },
                    });
                    setSelectedComponent("Information");
                  }
                }}
                className={`py-4 px-1 inline-flex items-center gap-x-2 text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 ${
                  isCurrentPage(`/courseDetail/${courseId}`)
                    ? "font-semibold border-blue-600 text-blue-600"
                    : "border-transparent"
                }`}
                role="tab"
              >
                <FaInfo />
                Information
              </button>

              {userId && (
                <button
                  onClick={() => {
                    if (showReport) {
                      handleNavigate(`/courseDetail/${courseId}/mentorClassOfCourse`, {
                        isMentor,
                        mentorAndList,
                      });
                    } else {
                      handleNavigate(`/courseDetail/${courseId}/classOfCourse`, {
                        isMentor,
                        mentorAndList,
                      });
                    }

                  }}
                  className={`py-4 px-1 inline-flex items-center gap-x-2 text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 ${
                    isCurrentPage(`/courseDetail/${courseId}/classOfCourse`)
                      ? "font-semibold border-blue-600 text-blue-600"
                      : "border-transparent"
                  }`}
                  role="tab"
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Classes
                </button>
              )}

              {userId && (
                <button
                  onClick={() => {
                    handleNavigate(`/manageTest/${courseId}`, {
                      userId,
                      showReport,
                    });
                  }}
                  className={`py-4 px-1 inline-flex items-center gap-x-2 text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 ${
                    isCurrentPage(`/manageTest/${courseId}`)
                      ? "font-semibold border-blue-600 text-blue-600"
                      : "border-transparent"
                  }`}
                  role="tab"
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 1 1 3-3h7z" />
                  </svg>
                  Test
                </button>
              )}

              {showReport && (
                <button
                  onClick={() => {
                    handleNavigate(
                      `/mentorCourseDetail/${courseId}/reportOfCourse`,
                      { courseId }
                    );
                  }}
                  className={`py-4 px-1 inline-flex items-center gap-x-2 text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 ${
                    isCurrentPage(
                      `/mentorCourseDetail/${courseId}/reportOfCourse`
                    )
                      ? "font-semibold border-blue-600 text-blue-600"
                      : "border-transparent"
                  }`}
                  role="tab"
                >
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 1 1 3-3h7z" />
                  </svg>
                  Report
                </button>
              )}
            </nav>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MentorSidebar;
