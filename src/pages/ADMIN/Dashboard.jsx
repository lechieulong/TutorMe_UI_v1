import React from 'react';
import Card from '../../components/ADMIN/Card';
import ChartCard from '../../components/ADMIN/ChartCard';
import DashboardHeader from '../../components/ADMIN/DashboardHeader';
import { FaUsers, FaDollarSign, FaUserFriends, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
    // Sample data for cards
    const cardData = [
        { title: 'Total Users', value: 1200, icon: FaUsers, subtitle: 'Last 30 days' },
        { title: 'Balance', value: '$35,000', icon: FaDollarSign, subtitle: 'Last 30 days' },
        { title: 'Teachers', value: 300, icon: FaUserFriends, subtitle: 'Last 30 days' },
        { title: 'Performance', value: '85%', icon: FaChartLine, subtitle: 'Last 30 days' },
    ];

    return (
        <>
            <DashboardHeader />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {cardData.map((data, index) => (
                    <Card
                        key={index}
                        title={data.title}
                        value={data.value}
                        Icon={data.icon}
                        subtitle={data.subtitle}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <ChartCard title="User Growth" />
                <ChartCard title="Sales Trends" />
            </div>
        </>
    );
};

export default Dashboard;
