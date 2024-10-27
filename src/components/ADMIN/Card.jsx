import React from 'react';

function Card({ title, value, Icon, change, subtitle }) { // Change 'icon' to 'Icon'
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="flex-1">
                <h2 className="text-gray-600">{title}</h2>
                <div className="text-3xl font-bold text-purple-600">{value}</div>
                {change && <div className="text-sm text-green-600">{change}</div>}
                {subtitle && <div className="text-sm text-gray-600">{subtitle}</div>}
            </div>
            <div className="text-3xl text-gray-400"> {/* Use div instead of i */}
                <Icon /> {/* Render the icon as a component */}
            </div>
        </div>
    );
}

export default Card;
