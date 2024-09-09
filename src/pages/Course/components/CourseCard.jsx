import React from 'react';

const CourseCard = ({ title, description, category, icon, teacher }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <div className="text-2xl mb-2">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 mb-2">{description}</p>
            <span className="text-sm font-medium text-blue-600 mb-2">{category}</span>
            <div className="text-sm text-gray-600">
                <span className="font-semibold">Teacher: </span>{teacher}
            </div>
        </div>
    );
};

export default CourseCard;
