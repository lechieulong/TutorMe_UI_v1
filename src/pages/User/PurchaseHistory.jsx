import React, { useState, useEffect } from 'react';
import Sidebar from "./components/Sidebar";
import MainLayout from "../../layout/MainLayout";
import { FaShoppingCart } from "react-icons/fa";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const PurchaseHistory = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("authToken");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    const purchases = [
        {
            id: 1,
            name: "IELTS Band 7+ Complete Prep Course",
            date: "May 21, 2024",
            price: "₫249,000",
            paymentMethod: "₫249,000 Balance",
        },
        {
            id: 2,
            name: "The Complete IELTS Guide- 7 Courses in One - IELTS Band 7+",
            date: "May 21, 2024",
            price: "₫249,000",
            paymentMethod: "₫249,000 Balance",
        },
    ];

    return (
        <MainLayout>
            <div className="flex w-full h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 p-5">
                    <div className="w-full mx-auto bg-gray-100 flex flex-col">
                        {/* Header Section */}
                        <h1 className="text-3xl font-bold mb-4">Purchase History</h1>
                        <div className="flex space-x-8 mb-4">
                            <a
                                href="#"
                                className="text-black font-semibold border-b-2 border-black"
                            >
                                Courses
                            </a>
                            <a href="#" className="text-gray-500">
                                Coachings
                            </a>
                            <a href="#" className="text-gray-500">
                                Deposit and Withdraw
                            </a>
                        </div>
                        <div className="border-t border-gray-300"></div>

                        {/* Purchase List */}
                        {purchases.map((purchase) => (
                            <div key={purchase.id}>
                                <div className="flex justify-between items-center py-4">
                                    <FaShoppingCart className="mr-2" />
                                    <div className="flex items-center space-x-2 w-2/4">
                                        <a href="#" className="text-purple-600">
                                            {purchase.name}
                                        </a>
                                    </div>
                                    <div className="text-gray-500 w-1/4">{purchase.date}</div>
                                    <div className="text-green-600 w-1/4">{purchase.price}</div>
                                    <div className="text-green-600 w-1/4">{purchase.paymentMethod}</div>
                                    {/* <div className="flex space-x-2">
                                        <button className="border border-gray-500 px-2 py-1">
                                        Receipt
                                        </button>
                                        <button className="border border-gray-500 px-2 py-1">
                                        Invoice
                                        </button>
                                    </div> */}
                                </div>
                                <div className="border-t border-gray-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default PurchaseHistory;
