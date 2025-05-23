import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHeader from "../../components/ADMIN/Header";
import Sidebar from "../../components/ADMIN/Sidebar";
import MainContent from "./MainContent";
import Dashboard from "./Dashboard";
import Users from "./User";
import Transaction from "./Transaction";
import ImportUser from "./ImportUser";
import TeacherRequest from "../../components/ADMIN/TeacherRequest";
import TeacherRequestDetail from "./Request/TeacherRequestDetail";
import TestLayoutAdmin from "../ExamTest/general/TestLayoutAdmin";
import TestList from "./TestList";
import GiftPage from "./Gifts";
import LivesPage from "./LiveStream";
import { ToastContainer } from "react-toastify";
import CourseReportList from "./Report/CourseReportList";
const AdminApp = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <ToastContainer />
      <Sidebar className="hidden sm:block w-64 bg-gray-800" />
      <div className="flex-1 flex flex-col">
        <AdminHeader className="bg-white shadow" />
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <div
            className="p-6 min-h-full"
            // style={{ backgroundColor: "#d4e9e2" }}
          >
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              {/* <Route path="/testsource" element={<TestList />} /> */}
              <Route path="/test" element={<TestLayoutAdmin />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/gifts" element={<GiftPage />} />
              <Route path="/liveStreams" element={<LivesPage />} />
              <Route path="/docs/importuser" element={<ImportUser />} />
              <Route path="/docs/teacherrequest" element={<TeacherRequest />} />
              <Route
                path="/docs/teacherrequest/:requestId"
                element={<TeacherRequestDetail />}
              />
              <Route path="/courseReport" element={<CourseReportList />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminApp;
