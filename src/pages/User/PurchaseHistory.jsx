import React, { useState, useEffect } from 'react';
import Sidebar from "./components/Sidebar";
import MainLayout from "../../layout/MainLayout";
import { FaShoppingCart } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { GetUserBalanceHistoryByUserID } from '../../redux/users/BalanceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateTime, formatCurrency } from '../../utils/Validator';

// Optional: Import a spinner component from a library like react-spinners
import { ClipLoader } from 'react-spinners';

const PurchaseHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { balance_history, getBalanceHistoryStatus } = useSelector((state) => state.user_balance);

    useEffect(() => {
        const token = Cookies.get("authToken");
        if (!token) {
            navigate("/");
        } else {
            dispatch(GetUserBalanceHistoryByUserID());
        }
    }, [dispatch, navigate]);

    return (
        <MainLayout>
            <div className="flex w-full bg-gray-100">
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
                                Transaction history
                            </a>
                        </div>
                        <div className="border-t border-gray-300"></div>

                        {/* Loading Spinner */}
                        {getBalanceHistoryStatus === "pending" ? (
                            <div className="flex justify-center items-center h-[500px]">
                                <ClipLoader color="#000000" size={50} />
                            </div>
                        ) : balance_history && balance_history.length > 0 ? (
                            <div className="h-[500px] overflow-y-auto">
                                {balance_history.map((purchase) => {
                                    const isReceived = purchase.amount > 0;
                                    return (
                                        <div key={purchase.id}>
                                            <div className="flex justify-between items-center py-4">
                                                <FaShoppingCart className="mr-2 text-2xl" />
                                                <div className="flex items-center space-x-2 w-2/4 mx-1">
                                                    {purchase.description}
                                                </div>
                                                <div className="text-gray-500 w-1/4">
                                                    {formatDateTime(purchase.createDate)}
                                                </div>
                                                <div
                                                    className={`w-1/4 ${isReceived ? 'text-green-600' : 'text-red-600'}`}
                                                >
                                                    {formatCurrency(purchase.amount)}
                                                </div>
                                                <div className="w-1/4">
                                                    {isReceived ? 'Received' : 'Deducted'}
                                                </div>
                                            </div>
                                            <div className="border-t border-gray-300"></div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div>No purchase history found.</div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default PurchaseHistory;
