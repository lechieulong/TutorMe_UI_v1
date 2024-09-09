import MentorHeader from "../../components/Mentor/MentorHeader";
import MentorSidebar from "../../components/Mentor/MentorSideBar";

const CourseDetail = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header nằm trên cùng */}
      <MentorHeader />
      {/* Container chứa Sidebar và nội dung */}
      <div className="flex flex-1 mt-16 w-full">
        <MentorSidebar />
        {/* Nội dung chính nằm bên phải */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center">
            <p className="mb-4 text-black font-bold text-4xl">Courses</p>
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 transition-hover transition-transform duration-500 dark:hover:scale-110"
            >
              Đăng nhập
            </button>
          </div>

          {/* Thẻ card với layout điều chỉnh */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Thẻ card 1 */}
            <div className="flex flex-col bg-white border border-t-4 border-t-grey-800 shadow-sm rounded-xl w-full">
              <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800">Course 1</h3>
                <p className="mt-2 text-gray-500">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a
                  className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  Card link
                  <svg
                    className="shrink-0 size-4"
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
                </a>
              </div>
            </div>

            {/* Thẻ card 2 */}
            <div className="flex flex-col bg-white border border-t-4 border-t-grey-800 shadow-sm rounded-xl w-full">
              <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800">Course 2</h3>
                <p className="mt-2 text-gray-500">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a
                  className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  Card link
                  <svg
                    className="shrink-0 size-4"
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
                </a>
              </div>
            </div>

            {/* Thẻ card 3 */}
            <div className="flex flex-col bg-white border border-t-4 border-t-grey-800 shadow-sm rounded-xl w-full">
              <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800">Course 3</h3>
                <p className="mt-2 text-gray-500">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a
                  className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  Card link
                  <svg
                    className="shrink-0 size-4"
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
                </a>
              </div>
            </div>

            {/* Thẻ card 4 */}
            <div className="flex flex-col bg-white border border-t-4 border-t-grey-800 shadow-sm rounded-xl w-full">
              <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800">Course 4</h3>
                <p className="mt-2 text-gray-500">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a
                  className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  Card link
                  <svg
                    className="shrink-0 size-4"
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
