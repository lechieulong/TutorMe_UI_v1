// src/components/Header.js
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import useAuthToken from "../../hooks/useAuthToken"; // Import useAuthToken
import Cookies from "js-cookie"; // Import js-cookie
import { getUser } from "../../service/GetUser";
import { GetUserByID } from "../../redux/users/UserSlice";
import { Roles } from "../../utils/config";
import defaulAvatar from "../../assets/images/default-avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGraduationCap } from "react-icons/fa";
import { FaInfinity } from "react-icons/fa";
import {
  faHouse,
  faTv,
  faBook,
  faPenNib,
  faUserGraduate,
  faHeadset,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { CheckAuthUser } from "../../service/checkAuth";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = CheckAuthUser();
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const handleOpenModal = () => {
    setModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  const authToken = useAuthToken(); // Lấy token từ cookie

  const [user, setUser] = useState(null);
  const [userFrormToken, setUserFromToke] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authToken && isAuthenticated) {
        try {
          //Get user form token
          const userFromToken = getUser();
          if (userFromToken) {
            setUserFromToke(userFromToken);
            //get user from DB by ID get from token
            const fetchedUser = await dispatch(GetUserByID(userFromToken.sub)).unwrap();
            setUser(fetchedUser);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    fetchUserData();
  }, [authToken, isAuthenticated, dispatch]);

  const handleLogout = () => {
    Cookies.remove("authToken");
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <header className="top-0 left-0 right-0 w-full bg-white text-sm pt-3 z-50 border border-gray-300">
        <nav className="mx-auto pb-2 px-4 flex flex-wrap basis-full items-center justify-between">
          <a
            className="sm:order-1 flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
            href="#"
          >
            Brand
          </a>
          <div className="sm:order-3 flex items-center gap-x-2">
            {authToken ? (
              <>
                {userFrormToken?.role?.includes(Roles.ADMIN) && (
                  <Link
                    to="/admin/app"
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 transition-hover transition-transform duration-500 dark:hover:scale-110"
                  >
                    <FaInfinity className="text-xl" />
                  </Link>
                )}
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   dark:border-neutral-700 transition-hover transition-transform duration-500 dark:hover:scale-110"
                >
                  Stream now
                  <FontAwesomeIcon icon={faHeadset} />
                </button>
                <button
                  onClick={handleLogout}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  Logout
                </button>
                {!userFrormToken?.role?.includes(Roles.ADMIN) && (
                  <Link to={`/user/${user?.userName}`}>
                    <img
                      className="inline-block w-[38px] h-[38px] rounded-full transition-transform duration-300 transform hover:scale-110 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      src={user?.imageURL || defaulAvatar}
                      alt="Avatar"
                    />
                  </Link>
                )}
              </>
            ) : (
              <button
                onClick={handleOpenModal}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              >
                LOGIN
              </button>
            )}
          </div>
          <div
            id="hs-navbar-alignment"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
              <a
                className="font-medium text-black focus:outline-none"
                href="/"
                aria-current="page"
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faHouse} />
                </span>
                Home
              </a>
              <a
                className="font-medium text-black focus:outline-none"
                href={`/live-stream${
                  user === null || user.role === "USER"
                    ? ""
                    : `?RoomId=${user.sub}`
                }`}
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faTv} />
                </span>
                Livestreams
              </a>
              <Link
                className="font-medium text-black focus:outline-none"
                to="/courseList"
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faBook} />
                </span>
                Course
              </Link>

              <Link
                className="font-medium text-black focus:outline-none"
                to="/listTest"
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faPenNib} />
                </span>
                Test
              </Link>

              <Link
                className="font-medium text-black focus:outline-none"
                to="/mylearning"
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </span>
                MyLearning
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />{" "}
      {/* Render the modal */}
    </>
  );
};

export default Header;
