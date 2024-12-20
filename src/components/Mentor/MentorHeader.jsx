import { useEffect, useState } from "react"; // Thêm useState và useEffect
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faTv, faBook } from "@fortawesome/free-solid-svg-icons";
import useAuthToken from "../../hooks/useAuthToken"; // Import useAuthToken
import Cookies from "js-cookie"; // Import js-cookie
import { getUser } from "../../service/GetUser";
import defaulAvatar from "../../assets/images/default-avatar.jpg";
import { Link } from "react-router-dom";

const MentorHeader = () => {
  const authToken = useAuthToken(); // Lấy token từ cookie
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      const fetchUser = async () => {
        const fetchedUser = await getUser(); // Fetch the user using getUser
        setUser(fetchedUser); // Set user data in state
      };
      fetchUser();
    }
  }, [authToken]);

  const handleLogout = () => {
    Cookies.remove("authToken"); // Xoá cookie khi logout
    setUser(null); // Đặt lại trạng thái người dùng
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
          {user ? (
            <>
              <Link
                type="button"
                className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                onClick={handleLogout}
              >
                Log Out
              </Link>
              <Link to={`/user/${user?.userName}`}>
                <img
                  className="inline-block size-[38px] rounded-full"
                  src={user?.imageURL || "https://hydra13.blob.core.windows.net/2aa17120-4bef-478a-8ea9-cb0788def29e/default-avatar.jpg"}
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
              Log In
            </Link>
          )}
        </div>
        <div
          id="hs-navbar-alignment"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
          aria-labelledby="hs-navbar-alignment-collapse"
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
            <a className="font-medium text-black focus:outline-none" href="#">
              <span className="mr-2">
                <FontAwesomeIcon icon={faBook} />
              </span>
              Khoá học
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MentorHeader;
