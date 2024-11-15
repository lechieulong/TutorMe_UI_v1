import React from 'react';
import Card from '../../components/ADMIN/Card';
import ChartCard from '../../components/ADMIN/ChartCard';
import DashboardHeader from '../../components/ADMIN/DashboardHeader';
import ChartHeader from './Chart/ChartHeader';
import { FaUsers, FaDollarSign, FaUserFriends, FaChartLine } from 'react-icons/fa';
import BarChart from './Chart/BarChart';
import PieChart from './Chart/PieChart';
import LineChart from './Chart/LineChart';
import DoughnutChart from './Chart/DoughnutChart';

const Dashboard = () => {
    // Sample data for cards
    const cardData = [
        { title: 'Total Users', value: 1200, icon: FaUsers, subtitle: 'Last 30 days' },
        { title: 'Balance', value: '$35,000', icon: FaDollarSign, subtitle: 'Last 30 days' },
        { title: 'Teachers', value: 300, icon: FaUserFriends, subtitle: 'Last 30 days' },
        { title: 'Performance', value: '85%', icon: FaChartLine, subtitle: 'Last 30 days' },
    ];

    return (
        <div className="min-h-screen">
            {/* Sticky header */}
            {/* <DashboardHeader /> */}

            {/* Card section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cardData.map((data, index) => (
                    <Card
                        key={index}
                        title={data.title}
                        value={data.value}
                        Icon={data.icon}
                        subtitle={data.subtitle}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    />
                ))}
            </div>

            {/* Chart section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <ChartHeader />
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        User Growth: <span className="text-green-500 font-bold">120</span>
                    </h2>
                    <BarChart />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <ChartHeader />
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-2">
                        Performance Over Time: <span className="text-purple-500 font-bold">50%</span>
                    </h2>
                    <LineChart />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        User Rate: <span className="text-blue-500 font-bold">150</span>
                    </h2>
                    <PieChart />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        User Rate: <span className="text-blue-500 font-bold">150</span>
                    </h2>
                    <DoughnutChart />
                </div>

                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <ChartHeader />
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-2">
                        Performance Over Time: <span className="text-purple-500 font-bold">50%</span>
                    </h2>
                    <LineChart />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
