import React from "react";
import MainLayout from "../layout/MainLayout";
const RegistrationForm = () => {
  return (  
    <div className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:flex lg:items-center lg:justify-between space-y-8 lg:space-y-0">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">
            Website Policy
          </h1>
          <p className="text-lg text-gray-600">
            At [Your Website Name], we value the privacy and security of our
            users. Our website policies are designed to protect your personal
            information and ensure a safe browsing experience.
          </p>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Privacy Policy</h2>
            <p className="mt-2 text-gray-600">
              We are committed to safeguarding your personal data. This policy
              explains how we collect, use, and protect your information.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Terms of Service</h2>
            <p className="mt-2 text-gray-600">
              By accessing our website, you agree to comply with our terms and
              conditions. Please read them carefully to understand your rights
              and obligations.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Cookie Policy</h2>
            <p className="mt-2 text-gray-600">
              Our website uses cookies to enhance your browsing experience.
              Learn more about how we use cookies and how you can manage them.
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-lg ml-5">
          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-8">
            Đăng ký kiểm tra
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Họ và Tên
              </label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Nhập email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ngày kiểm tra
              </label>
              <input
                type="date"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mt-8">
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition duration-150 ease-in-out">
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
