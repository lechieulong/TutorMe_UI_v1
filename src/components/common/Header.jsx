// src/components/Header.js
import { Link } from "react-router-dom";
import useAuthToken from "../../hooks/useAuthToken"; // Import useAuthToken
import Cookies from "js-cookie"; // Import js-cookie
import { getUser } from "../../service/GetUser";
import { Roles } from "../../utils/config";
import defaulAvatar from "../../assets/images/defaul-avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGraduationCap  } from "react-icons/fa";
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

const Header = () => {
  const authToken = useAuthToken(); // Lấy token từ cookie

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      const fetchedUser = getUser(); // Fetch the user using getUser
      setUser(fetchedUser); // Set user data in state
    }
  }, [authToken]);

  const handleLogout = () => {
    Cookies.remove("authToken"); // Xoá cookie khi logout
    window.location.reload(); // Reload trang để cập nhật trạng thái
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white text-sm pt-3 shadow-lg z-50">
      <nav className="mx-auto pb-2 px-4 flex flex-wrap basis-full items-center shadow-lg justify-between">
        <a
          className="sm:order-1 flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
          href="#"
        >
          Brand
        </a>
        <div className="sm:order-3 flex items-center gap-x-2">
          {authToken ? (
            <>
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
              <Link to={`/user/${user?.userName}`}>
                <img
                  className="inline-block w-[38px] h-[38px] rounded-full transition-transform duration-300 transform hover:scale-110 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  src={user?.imageURL || defaulAvatar}
                  alt="Avatar"
                />
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            >
              LOGIN
            </Link>
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
              href="live-stream"
            >
              <span className="mr-2">
                <FontAwesomeIcon icon={faTv} />
              </span>
              Livestreams
            </a>
            <Link className="font-medium text-black focus:outline-none" to="/course" >
              <span className="mr-2">
                <FontAwesomeIcon icon={faBook} />
              </span>
              Course
            </Link>
            <a
              className="font-medium text-black focus:outline-none"
              href="skill-part"
            >
              <span className="mr-2">
                <FontAwesomeIcon icon={faPenNib} />
              </span>
              Test
            </a>
            {authToken && user?.role === Roles.USER && (
              <a className="font-medium text-black focus:outline-none" href="mylearning">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </span>
                MyLearning
              </a>
            )}
            {/* <a className="font-medium text-black focus:outline-none" href="#">
              <span className="mr-2">
                <FontAwesomeIcon icon={faUserGraduate} />
              </span>
              Mentor register
            </a> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
