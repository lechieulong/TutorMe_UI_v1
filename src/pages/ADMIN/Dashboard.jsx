import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/ADMIN/Card';
import ChartCard from '../../components/ADMIN/ChartCard';
import DashboardHeader from '../../components/ADMIN/DashboardHeader';
import ChartHeader from './Chart/ChartHeader';
import { FaUsers, FaDollarSign, FaUserFriends, FaChartLine, FaBook, FaFingerprint  } from 'react-icons/fa';
import BarChart from './Chart/BarChart';
import PieChart from './Chart/PieChart';
import LineChart from './Chart/LineChart';
import DoughnutChart from './Chart/DoughnutChart';
import { Admin_Analysis } from '../../redux/ADMIN/UserSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { analysis, status, error } = useSelector((state) => state.ADMIN_userslice);
    // Sample data for cards
    const [cardData, setCardData] = useState([
        { title: 'Total Users', value: 0, icon: FaUsers, subtitle: 'Total' },
        { title: 'Courses', value: 0, icon: FaBook, subtitle: 'Total' },
        { title: 'Teachers', value: 0, icon: FaUserFriends, subtitle: 'Total' },
        { title: 'Enrollments', value: 0, icon: FaFingerprint, subtitle: 'Total' },
    ]);

    useEffect(() => {
        dispatch(Admin_Analysis());
        console.log("analysis: ", analysis);
        console.log("status: ", status);
        console.log("error: ", error);
    }, [dispatch]);

    useEffect(() => {
        if (analysis) {
            setCardData([
                { title: 'Total Users', value: analysis.totalUser, icon: FaUsers, subtitle: 'Total' },
                { title: 'Courses', value: analysis.courses, icon: FaBook, subtitle: 'Total' },
                { title: 'Teachers', value: analysis.totalTeachers, icon: FaUserFriends, subtitle: 'Total' },
                { title: 'Enrollments', value: analysis.totalEnrollments, icon: FaFingerprint, subtitle: 'Total' },
            ]);
        }
    }, [analysis]);

    return (
        <div className="min-h-screen">
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
                    {/* <ChartHeader /> */}
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
