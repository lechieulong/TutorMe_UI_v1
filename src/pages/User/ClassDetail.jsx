import { useParams } from "react-router-dom";
import MentorHeader from "../../components/Mentor/MentorHeader";
import MentorSidebar from "../../components/Mentor/MentorSideBar";

const CourseDetail = () => {
  // Lấy tên khóa học từ URL thông qua useParams
  const { className } = useParams();

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MentorHeader />
      <div className="flex flex-1 mt-16 w-full">
        <MentorSidebar />
        <div className="flex-1 p-4">
          {/* Breadcrumb */}
          <ol className="flex items-center whitespace-nowrap">
            <li className="inline-flex items-center">
              <a
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                href="#"
              >
                Home
              </a>
              <svg
                className="shrink-0 mx-2 size-4 text-gray-400"
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
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li className="inline-flex items-center">
              <a
                className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                href="#"
              >
                Classes
              </a>
              <svg
                className="shrink-0 mx-2 size-4 text-gray-400"
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
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li
              className="inline-flex items-center text-sm font-semibold text-gray-800 truncate"
              aria-current="page"
            >
              {className} {/* Hiển thị tên khóa học */}
            </li>
          </ol>

          <div className="flex justify-start items-center mb-4">
            <p className="text-black font-bold text-4xl">{className}</p>
            <button
              type="button"
              className="ml-4 mt-2 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-[#88D66C] text-white shadow-sm hover:bg-[#76c35e] focus:outline-none focus:bg-[#76c35e] disabled:opacity-50 disabled:pointer-events-none transition-hover transition-transform duration-500"
            >
              Join class
            </button>
            <button
              type="button"
              className="ml-4 mt-2 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-gray-400 text-white shadow-sm  focus:outline-none  disabled:opacity-50 disabled:pointer-events-none transition-hover transition-transform duration-500"
            >
              Joined
            </button>
          </div>

          <div className="flex gap-4">
            {/* Phần chiếm 40% độ rộng */}
            <div className="flex-1 w-40% p-2">
              <div className="text-xs sm:text-sm md:text-base lg:text-lg">
                <div className="ps-2 my-2 first:mt-0">
                  <h3 className="text-xs sm:text-xs md:text-sm lg:text-base font-medium uppercase text-gray-500">
                    1 Aug, 2023
                  </h3>
                </div>
                <div className="flex gap-x-3 relative group rounded-lg hover:bg-gray-100">
                  <a className="absolute inset-0 z-[1]" href="#"></a>

                  <div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
                    <div className="relative z-10 size-7 flex justify-center items-center">
                      <div className="size-2 rounded-full bg-white border-2 border-gray-300 group-hover:border-gray-600"></div>
                    </div>
                  </div>
                  <div className="grow p-2 pb-8">
                    <h3 className="flex gap-x-1.5 text-gray-800 font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                      <svg
                        className="shrink-0 size-4 mt-1"
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
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" x2="8" y1="13" y2="13"></line>
                        <line x1="16" x2="8" y1="17" y2="17"></line>
                        <line x1="10" x2="8" y1="9" y2="9"></line>
                      </svg>
                      Created Preline in React task
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">
                      Find more detailed instructions here.
                    </p>
                    <button
                      type="button"
                      className="bg-white mt-1 -ms-1 p-1 relative z-10 inline-flex items-center gap-x-2 text-xs sm:text-sm md:text-base lg:text-lg rounded-lg border border-transparent text-gray-500 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <img
                        className="shrink-0 size-4 rounded-full"
                        src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                        alt="Avatar"
                      />
                      James Collins
                    </button>
                  </div>
                </div>

                <div className="ps-2 my-2 first:mt-0">
                  <h3 className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium uppercase text-gray-500">
                    31 Jul, 2023
                  </h3>
                </div>

                <div className="flex gap-x-3 relative group rounded-lg hover:bg-gray-100">
                  <a className="absolute inset-0 z-[1]" href="#"></a>

                  <div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
                    <div className="relative z-10 size-7 flex justify-center items-center">
                      <div className="size-2 rounded-full bg-white border-2 border-gray-300 group-hover:border-gray-600"></div>
                    </div>
                  </div>
                  <div className="grow p-2 pb-8">
                    <h3 className="flex gap-x-1.5 font-semibold text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl">
                      Take a break ⛳️
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">
                      Just chill for now... 😉
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phần chiếm 60% độ rộng */}
            <div className="flex-1 w-60% p-2">
              <div>
                <h2 className="text-black font-bold">Created by ...</h2>
                <p className="text-black font-normal">1. Content 1</p>
                <button
                  type="button"
                  className="py-2 w-6/12 items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   dark:border-neutral-700 transition-hover transition-transform duration-500 dark:hover:scale-110"
                >
                  Content 1
                </button>
              </div>
              <div>
                <h2 className="text-black font-bold">Created by ...</h2>
                <p className="text-black font-normal">1. Content 2</p>
                <button
                  type="button"
                  className="py-2 w-6/12 items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   dark:border-neutral-700 transition-hover transition-transform duration-500 dark:hover:scale-110"
                >
                  Content 2
                </button>
              </div>
              <div>
                <h2 className="text-black font-bold">Created by ...</h2>
                <p className="text-black font-normal">1. Content 3</p>
                <button
                  type="button"
                  className="py-2 w-6/12 items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   dark:border-neutral-700 transition-hover transition-transform duration-500 dark:hover:scale-110"
                >
                  Content 3
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
