import React, { useState, useEffect } from 'react';

// Utility function to get the day names
const getNext7Days = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const next7Days = [];

    for (let i = 0; i < 7; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        next7Days.push(i === 0 ? 'Today' : daysOfWeek[futureDate.getDay()]);
    }

    return next7Days;
};

const AvailableTime = () => {
    const days = getNext7Days();

    return (
        <div className="pt-2">
            <div className="bg-white p-4 rounded shadow mb-4">
                <div className="flex items-center space-x-2 mb-2">
                    <img
                        src="https://placehold.co/40x40"
                        alt="Anne Tran profile"
                        className="rounded-full"
                    />
                    <div>
                        <p className="font-semibold">Nguyen Van Sy</p>
                        <p className="text-gray-500 text-xs">
                            Be teacher · Aug 10, 2024<i className="fas fa-globe"></i>
                        </p>
                    </div>
                </div>
            </div>
            {/* Today's schedule */}
            <div className="bg-white p-4 rounded shadow mb-4">
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">{days[0]}</h2>
                    <div className="flex">
                        <div className="grid grid-cols-5 gap-4">
                            <div className="border p-4">
                                <p>09:25-11:27</p>
                            </div>
                            <div className="border p-4">
                                <p>14:15-16:17</p>
                            </div>
                            <div className="border p-4">
                                <p>15:20-17:22</p>
                            </div>
                            <div className="border p-4">
                                <p>19:30-21:32</p>
                            </div>
                            <div className="border p-4">
                                <p>21:45-23:47</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next 6 days schedule */}
                {days.slice(1).map((day, index) => (
                    <div className="mb-8" key={index}>
                        <h2 className="text-xl font-bold mb-4">{day}</h2>
                        <div className="flex">
                            <div className="border p-4">
                                <p>16:20-17:45</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableTime;
