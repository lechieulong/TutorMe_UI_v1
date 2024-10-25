import React, { useState } from 'react';
import { FaSyncAlt, FaBell, FaUserCircle } from 'react-icons/fa';

function DashboardHeader() {
    const [startDate, setStartDate] = useState('2024-10-23');
    const [endDate, setEndDate] = useState('2024-11-23');

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleRefreshData = () => {
        // Logic to refresh data based on selected dates
        console.log(`Filtering data from ${startDate} to ${endDate}`);
    };

    return (
        <div className="flex justify-between items-center p-4 bg-white border-b">
            <div className="flex items-center space-x-4">
                <input 
                    type="date" 
                    className="border rounded-md px-2 py-1" 
                    value={startDate} 
                    onChange={handleStartDateChange} 
                />
                <span className="text-gray-600">~</span>
                <input 
                    type="date" 
                    className="border rounded-md px-2 py-1" 
                    value={endDate} 
                    onChange={handleEndDateChange} 
                />
                <button 
                    className="flex items-center space-x-2 text-green-400"
                    onClick={handleRefreshData}
                >
                    <FaSyncAlt className="text-lg" />
                    <span>This month</span>
                </button>
                <button 
                    className="flex items-center space-x-2 text-yellow-400"
                    onClick={handleRefreshData}
                >
                    <FaSyncAlt className="text-lg" />
                    <span>This year</span>
                </button>
                <button 
                    className="flex items-center space-x-2 text-gray-600"
                    onClick={handleRefreshData}
                >
                    <FaSyncAlt className="text-lg" />
                    <span>Refresh Data</span>
                </button>
            </div>
        </div>
    );
}

export default DashboardHeader;
