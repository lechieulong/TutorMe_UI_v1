import React from 'react';
import MainLayout from '../../layout/MainLayout';
import { useLocation } from 'react-router-dom';

function PaymentMethod() {
    const location = useLocation();
    const { scheduleId, teacherName, startTime, endTime, price } = location.state || {};

    console.log(scheduleId);

    {/*
        Xu ly button Continue:
        - Get Schedule by Id: 
        - Check status Schedule: neu = 2 || 1 thi return thong bao la not available, neu = 0 thi tiep tuc
        - Check paymend method

        - Book thanh cong -> update Schedule status, add to table BookedTeacherSession, add new event, assign cho learner va teacher
        */}
    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-2xl p-4 bg-white shadow-md rounded-md">
                    <div className="bg-gray-500 text-white text-center py-2 rounded-t-md">
                        <h2 className="text-lg font-semibold">PAYMENT METHOD</h2>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-center space-x-4 mb-4">
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="payment" className="form-radio" defaultChecked />
                                <span>Pay with VNPay</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="payment" className="form-radio" />
                                <span>Pay with Momo</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="payment" className="form-radio" />
                                <span>Pay with Diamond</span>
                            </label>
                        </div>
                        <div className="border p-4 rounded-md">
                            <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Set schedule with Teacher:</span>
                                    <span>{teacherName || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Start Date:</span>
                                    <span>{startTime || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">End Time:</span>
                                    <span>{endTime || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Total:</span>
                                    <span>{price || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button className="bg-gray-500 text-white py-2 px-4 rounded-md">CONTINUE</button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default PaymentMethod;
