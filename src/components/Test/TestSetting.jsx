import React from "react";
import {
  CheckCircleIcon,
  DocumentTextIcon,
  ChevronRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChevronDownIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const TestSetting = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 h-full p-8 ">
        <div className="lg:w-1/2 flex flex-col bg-white border shadow-md rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 h-full p-3 md:p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Hướng dẫn
            </h3>
            <div>
              <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <DocumentTextIcon className="h-5 w-5 text-gray-500 dark:text-neutral-500 mr-2" />
                Nội dung phần thi
              </h4>
              <ul className="list-inside text-gray-500 dark:text-neutral-400">
                <li>
                  <CheckCircleIcon className="inline-block h-4 w-4 text-gray-500 dark:text-neutral-500 mr-2" />{" "}
                  30 câu trắc nghiệm
                </li>
                <li>
                  <CheckCircleIcon className="inline-block h-4 w-4 text-gray-500 dark:text-neutral-500 mr-2" />{" "}
                  10 câu tự luận
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <ChevronRightIcon className="h-5 w-5 text-gray-500 dark:text-neutral-500 mr-2" />
                Bước làm
              </h4>
              <ol className="list-decimal list-inside text-gray-500 dark:text-neutral-400">
                <li>
                  <ChevronRightIcon className="inline-block h-4 w-4 text-gray-500 dark:text-neutral-500 mr-2" />{" "}
                  Chọn level
                </li>
                <li>
                  <ChevronRightIcon className="inline-block h-4 w-4 text-gray-500 dark:text-neutral-500 mr-2" />{" "}
                  Đăng ký thông tin
                </li>
                <li>
                  <ChevronRightIcon className="inline-block h-4 w-4 text-gray-500 dark:text-neutral-500 mr-2" />{" "}
                  Bắt đầu làm bài
                </li>
                <li>
                  <ChevronRightIcon className="inline-block h-4 w-4 text-gray-500 dark:text-neutral-500 mr-2" />{" "}
                  Bắt buộc phải trả lời hết
                </li>
              </ol>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <DocumentTextIcon className="h-5 w-5 text-gray-500 dark:text-neutral-500 mr-2" />
                Quy định
              </h4>
              <ul className="list-inside text-gray-500 dark:text-neutral-400">
                <li>
                  <CheckCircleIcon className="inline-block h-4 w-4 text-gray-500 dark:text-neutral-500 mr-2" />{" "}
                  Không được sử dụng phần mềm thứ 3
                </li>
                <li>
                  <CheckCircleIcon className="inline-block h-4 w-4 text-gray-500 dark:text-neutral-500 mr-2" />{" "}
                  Tự làm không có người hỗ
                </li>
                <li>
                  <CheckCircleIcon className="inline-block h-4 w-4 text-gray-500 dark:text-neutral-500 mr-2" />{" "}
                  Trung thực
                </li>
              </ul>
            </div>
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200">
              <p className="font-semibold">Note:</p>
              <p>Không được gian lận, bởi vì máy có theo dõi</p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto h-full bg-white rounded-xl p-4 sm:p-7 dark:bg-neutral-900 shadow-lg">
          <form>
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-400 dark:border-neutral-700 dark:first:border-transparent">
              <div className="sm:col-span-12">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  Đăng ký thông tin
                </h2>
              </div>
              <div className="sm:col-span-3 flex items-center">
                <UserIcon className="h-5 w-5 text-gray-500 dark:text-neutral-500 border-2  rounded-full p-1 mr-2" />
                <label
                  htmlFor="af-submit-application-name"
                  className="inline-block text-sm font-medium text-gray-500 dark:text-neutral-500"
                >
                  Họ và tên
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="af-submit-application-name"
                  type="text"
                  className="py-2 px-3 block w-full border border-gray-400 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
              </div>
              <div className="sm:col-span-3 flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-gray-500 dark:text-neutral-500 border-2  rounded-full p-1 mr-2" />
                <label
                  htmlFor="af-submit-application-email"
                  className="inline-block text-sm font-medium text-gray-500 dark:text-neutral-500"
                >
                  Email
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="af-submit-application-email"
                  type="email"
                  className="py-2 px-3 block w-full border border-gray-400 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
              </div>
              <div className="sm:col-span-3 flex items-center">
                <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-neutral-500 mr-2" />
                <label
                  htmlFor="af-submit-application-phone"
                  className="inline-block text-sm font-medium text-gray-500 dark:text-neutral-500"
                >
                  Số điện thoại
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="af-submit-application-phone"
                  type="text"
                  className="py-2 px-3 block w-full border border-gray-400 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
              </div>
              <div className="sm:col-span-3 flex items-center">
                <DocumentTextIcon className="h-5 w-5 text-gray-500 dark:text-neutral-500 mr-2" />
                <label
                  htmlFor="af-submit-application-resume-cv"
                  className="inline-block text-sm font-medium text-gray-500 dark:text-neutral-500"
                >
                  Resume/CV
                </label>
              </div>
              <div className="sm:col-span-9">
                <label
                  htmlFor="af-submit-application-resume-cv"
                  className="sr-only"
                >
                  Choose file
                </label>
                <input
                  type="file"
                  name="af-submit-application-resume-cv"
                  id="af-submit-application-resume-cv"
                  className="block w-full border border-gray-400 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                     file:border-0
                     file:me-4
                    file:py-2 file:px-4
                    dark:file:bg-neutral-700 dark:file:text-neutral-400"
                />
              </div>
              <div className="sm:col-span-3 flex items-center">
                <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-neutral-500 border-2  rounded-full p-1 mr-2" />
                <label
                  htmlFor="af-submit-application-level"
                  className="inline-block text-sm font-medium text-gray-500 dark:text-neutral-500"
                >
                  Cấp
                </label>
              </div>
              <div className="sm:col-span-9">
                <select
                  id="af-submit-application-level"
                  className="py-2 px-3 block w-full border border-gray-400 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                >
                  <option value="primary">Tiểu học</option>
                  <option value="secondary">Trung học</option>
                  <option value="highSchool">Cấp 3</option>
                  <option value="coledge">Cao đẳng/ Đại học</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="sm:col-span-3 flex items-center">
                <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-neutral-500 border-2  rounded-full p-1 mr-2" />
                <label
                  htmlFor="af-submit-application-subject"
                  className="inline-block text-sm font-medium text-gray-500 dark:text-neutral-500"
                >
                  Môn học
                </label>
              </div>
              <div className="sm:col-span-9">
                <select
                  id="af-submit-application-subject"
                  className="py-2 px-3 block w-full border border-gray-400 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                >
                  <option value="math">Toán</option>
                  <option value="english">Tiếng anh</option>
                  <option value="literal">Ngữ văn</option>
                  <option value="physical">Vật lí</option>
                  <option value="chemistry">Hóa Học</option>
                  <option value="geography">Địa lí</option>
                  <option value="history">Lịch sử</option>
                  <option value="csd">Cấu trúc dữ liệu giải thuật</option>
                  <option value="dbi">Database introduction</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            <div className="mt-5 grid">
              <button
                type="submit"
                className="inline-flex justify-center items-center gap-x-3 text-center bg-green-500 hover:bg-green-700 border border-transparent text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-neutral-900 dark:focus:ring-neutral-600 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                Bắt đầu
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TestSetting;
