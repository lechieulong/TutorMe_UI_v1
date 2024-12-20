// src/components/Header.js
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAuthToken from "../../hooks/useAuthToken"; // Import useAuthToken
import Cookies from "js-cookie"; // Import js-cookie
import { getUser } from "../../service/GetUser";
import { GetUserByID } from "../../redux/users/UserSlice";
import { Roles } from "../../utils/config";
import defaulAvatar from "../../assets/images/default-avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGraduationCap } from "react-icons/fa";
import { FaInfinity, FaPlusCircle } from "react-icons/fa";
import FormWithModal from "./StreamButton";
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
import { CheckAuthUser, CheckLockUser } from "../../service/checkAuth";
import { ConsoleLevel } from "@zegocloud/zego-uikit-prebuilt";
import { GetUserBalanceByUserID } from "../../redux/users/BalanceSlice";
import LockedNotifyModal from "./LockedNotifyModal";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = CheckAuthUser();
  const { isLocked, lockMessage } = CheckLockUser();
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

  const { user_balance } = useSelector((state) => state.user_balance);

  const formattedAmount = new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(user_balance);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authToken && isAuthenticated) {
        try {
          //Get user form token
          const userFromToken = getUser();
          if (userFromToken) {
            setUserFromToke(userFromToken);
            //get user from DB by ID get from token
            const fetchedUser = await dispatch(
              GetUserByID(userFromToken.sub)
            ).unwrap();
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

  useEffect(() => {
    if (user?.id) {
      dispatch(GetUserBalanceByUserID(user.id));
    }
  }, [user?.id, dispatch]);

  const handleLogout = () => {
    Cookies.remove("authToken");
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <header className="top-0 left-0  py-[17px] right-0 bg-accentGreen text-white w-full bg text-sm z-50 border-b border-gray-300">
        <nav className="mx-auto  px-4 flex  basis-full items-center justify-between">
          <a
            className="sm:order-1 flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
            href="#"
          >
            <img src="https://hydra13.blob.core.windows.net/63a5630a-687a-4c38-98e2-f5ce440f3f09/logo_1.png" alt="profile" className="w-16 h-8"/>
          </a>
          <div className="sm:order-3 flex items-center gap-x-2">
            {authToken ? (
              <>
                {userFrormToken?.role?.includes(Roles.ADMIN) && (
                  <Link
                    to="/admin/app"
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-lightGreen text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 transition-hover transition-transform duration-500 dark:hover:scale-110"
                  >
                    <FaInfinity className="text-xl" />
                  </Link>
                )}
                <p
                  type="button"
                  className="inline-flex items-center text-sm font-medium  rounded-lg border 
                  border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 
                  transition-hover transition-transform duration-500 dark:hover:scale-110 max-w-[160px]"
                >
                  <p className=" text-black opacity-80 truncate  px-1">
                    {formattedAmount}
                  </p>
                  <Link
                    to="/Payment"
                    className="flex-shrink-0 bg-gray-200 p-3 rounded-lg hover:bg-gray-100"
                  >
                    <FaPlusCircle />
                  </Link>
                </p>
                {/* <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-lightGreen text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   dark:border-neutral-700 transition-hover transition-transform duration-500 dark:hover:scale-110"
                >
                  Stream now
                  <FontAwesomeIcon icon={faHeadset} />
                  
                </button> */}
                {(userFrormToken?.role?.includes(Roles.ADMIN) ||
                  userFrormToken?.role?.includes(Roles.TEACHER)) && (
                  <FormWithModal LiveStreamId={userFrormToken?.sub} />
                )}

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
                      src={user?.imageURL || "https://hydra13.blob.core.windows.net/2aa17120-4bef-478a-8ea9-cb0788def29e/default-avatar.jpg"}
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
            <div className="flex text-[15px] flex-col gap-5 mt-5 ml-4 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
              <a
                className="font-medium text-white focus:outline-none"
                href="/"
                aria-current="page"
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faHouse} />
                </span>
                Home
              </a>
              <a
                className="font-medium text-white focus:outline-none"
                href={`/live-stream${
                  user === null || user.role === "USER"
                    ? ""
                    : `?roomID=${userFrormToken?.sub}`
                }`}
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faTv} />
                </span>
                Livestreams
              </a>
              <Link
                className="font-medium text-white focus:outline-none"
                to="/courseList"
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faBook} />
                </span>
                Course
              </Link>

              <Link
                className="font-medium text-white focus:outline-none"
                to="/listTest"
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faPenNib} />
                </span>
                Test
              </Link>

              <Link
                className="font-medium text-white focus:outline-none"
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
      {isLocked && (
        <LockedNotifyModal
          isOpen={isLocked}
          onLogout={handleLogout}
          message={lockMessage}
        />
      )}
      <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />{" "}
      {/* Render the modal */}
    </>
  );
};

export default Header;
