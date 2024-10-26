import React from 'react';

const MainContent = () => {
    return (
        <>
            <div className="bg-white p-10 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard Starter Kit</h1>
                <ul className="list-disc list-inside space-y-2">
                    <li><span className="font-semibold">Light/dark</span> mode toggle</li>
                    <li><span className="font-semibold">Redux toolkit</span> and other utility libraries configured</li>
                    <li><span className="font-semibold">Calendar, Modal, Sidebar</span> components</li>
                    <li>User-friendly <span className="font-semibold">documentation</span></li>
                    <li><span className="font-semibold">Daisy UI</span> components, <span className="font-semibold">Tailwind CSS</span> support</li>
                </ul>
                <button className="mt-6 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">Get Started</button>
            </div>
        </>
    );
};

export default MainContent;
