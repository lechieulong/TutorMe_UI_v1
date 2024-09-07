import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faTv,
  faBook,
  faPenNib,
  faUserGraduate,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white text-sm pt-3 shadow-lg z-50">
      <nav className="mx-auto pb-2 px-4 flex flex-wrap basis-full items-center shadow-lg justify-between ">
        <a
          className="sm:order-1 flex-none text-xl font-semibold  focus:outline-none focus:opacity-80"
          href="#"
        >
          Brand
        </a>
        <div className="sm:order-3 flex items-center gap-x-2">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   dark:border-neutral-700 transition-hover transition-transform duration-500 dark:hover:scale-110"
          >
            Stream now
            <FontAwesomeIcon icon={faHeadset} />
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   dark:border-neutral-700 transition-hover transition-transform duration-500 dark:hover:scale-110"
          >
            Log In
          </button>
          <img
            className="inline-block size-[38px] rounded-full"
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
            alt="Avatar"
          />
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
              className="font-medium text-black  focus:outline-none "
              href="live-stream"
            >
              <span className="mr-2">
                <FontAwesomeIcon icon={faTv} />
              </span>
              Livestreams
            </a>
            <a className="font-medium text-black focus:outline-none  " href="#">
              <span className="mr-2">
                <FontAwesomeIcon icon={faBook} />
              </span>
              Course
            </a>
            <a
              className="font-medium text-black  focus:outline-none  "
              href="#"
            >
              <span className="mr-2">
                <FontAwesomeIcon icon={faPenNib} />
              </span>
              Test
            </a>
            <a
              className="font-medium text-black  focus:outline-none  "
              href="#"
            >
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
