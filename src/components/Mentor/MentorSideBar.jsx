/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaInfo } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import { getUser } from "../../service/GetUser";
import useAuthToken from "../../hooks/useAuthToken"; // Import useAuthToken
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

const MentorSidebar = ({ mentorAndList, setSelectedComponent, isMentor }) => {
  const [user, setUser] = useState(null);
  const authToken = useAuthToken(); // Lấy token từ cookie
  const { courseId } = useParams();
  const { pathname } = useLocation(); // Lấy đường dẫn hiện tại
  const [userId, setUserId] = useState(null);

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

  return (
    <div>
      <div
        id="hs-offcanvas-example"
        className="block shadow-lg sticky top-0 left-0 transition-all duration-300 transform w-64 bg-white border-e border-gray-200 pb-10 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
        role="dialog"
        tabIndex="-1"
        aria-label="Sidebar"
        style={{
          height: "calc(100vh - 67px)",
        }}
      >
        <nav className="p-6 w-full flex flex-col flex-wrap">
          <ul className="space-y-1.5">
            <li>
              <Link
                to={`/courseDetail/${courseId}`}
                onClick={() => setSelectedComponent("Information")}
                className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                style={{
                  backgroundColor:
                    pathname === `/courseDetail/${courseId}`
                      ? "lightblue"
                      : "transparent",
                }}
                state={{ userId, mentorAndList }}
              >
                <FaInfo />
                Information
              </Link>
            </li>
            <>
              {userId && (
                <li>
                  <Link
                    to={`/courseDetail/${courseId}/classOfCourse`}
                    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                    state={{ mentorAndList, isMentor }}
                    style={{
                      backgroundColor:
                        pathname === `/courseDetail/${courseId}/classOfCourse`
                          ? "lightblue"
                          : "transparent",
                    }} // Đổi background
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
                  </Link>
                </li>
              )}

              {userId && (
                <li>
                  <Link
                    to={`/manageTest/${courseId}`}
                    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                    state={{ userId, mentorAndList }}
                    style={{
                      backgroundColor:
                        pathname === `/manageTest/${courseId}`
                          ? "lightblue"
                          : "transparent",
                    }} // Đổi background
                  >
                    <FontAwesomeIcon icon={faSchool} />
                    Test
                  </Link>
                </li>
              )}

              {isMentor && (
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    style={{
                      backgroundColor:
                        pathname === "#" ? "lightblue" : "transparent",
                    }}
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
                  </a>
                </li>
              )}
            </>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MentorSidebar;
