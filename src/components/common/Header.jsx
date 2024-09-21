// src/components/Header.js
import { Link } from "react-router-dom";
import useAuthToken from "../../hooks/useAuthToken"; // Import useAuthToken
import Cookies from "js-cookie"; // Import js-cookie
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faTv,
  faBook,
  faPenNib,
  faUserGraduate,
  faHeadset,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const authToken = useAuthToken(); // Lấy token từ cookie

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
              <img
                className="inline-block size-[38px] rounded-full"
                src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/428608379_1107729527084945_699601624333735778_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGyVNuzP4Hc8Dbdt9fO1j7gqcEP5iSFCnKpwQ_mJIUKckbEXT7w3bFwY3fwedmZXiSmhLJmd69z1YqhZFIY0buO&_nc_ohc=tHAMdD9qR38Q7kNvgEnH1NK&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=A67UmE9Be5K2Zko00Modiwb&oh=00_AYA5r3fzu3zouyXE0nx_Hu8-p3hqSGQu96x0HsJ0cHJb1Q&oe=66EA5AF0" alt="Avatar"
              />
            </>
          ) : (
            <Link
              to="/login"
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            >
              Log In
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
            <a className="font-medium text-black focus:outline-none" href="course">
              <span className="mr-2">
                <FontAwesomeIcon icon={faBook} />
              </span>
              Course
            </a>
            <a
              className="font-medium text-black focus:outline-none"
              href="skill-part"
            >
              <span className="mr-2">
                <FontAwesomeIcon icon={faPenNib} />
              </span>
              Test
            </a>
            {authToken && (
              <a className="font-medium text-black focus:outline-none" href="mylearning">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </span>
                My Learning
              </a>
            )}
            <a className="font-medium text-black focus:outline-none" href="#">
              <span className="mr-2">
                <FontAwesomeIcon icon={faUserGraduate} />
              </span>
              Mentor register
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
