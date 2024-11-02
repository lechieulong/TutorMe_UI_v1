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

const AdminApp = () => {
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar className="hidden sm:block w-64 bg-gray-800"/>
            <div className="flex-1 flex flex-col">
                <AdminHeader className="bg-white shadow"/>
                <div className="flex-1 overflow-y-auto bg-gray-100">
                    <div className="p-6 bg-purple-600 min-h-full">
                        <Routes>
                            <Route path="/" element={<MainContent />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/transactions" element={<Transaction />} />
                            <Route path="/docs/importuser" element={<ImportUser />} />
                            <Route path="/docs/teacherrequest" element={<TeacherRequest />} />
                            <Route path="/docs/teacherrequest/:requestId" element={<TeacherRequestDetail />} />
                            {/* Add more routes as needed */}
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminApp;
