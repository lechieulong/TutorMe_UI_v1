import React from 'react';

const SessionBookedByOther = ({ userFromToken }) => {
    return (
        <button className="bg-gray-100 hover:bg-gray-200 px-2 py-1 text-sm rounded transition duration-150">
            Your session is booked
        </button>
    );
};

export default SessionBookedByOther;
