import React, { useState } from 'react';

const LockoutModal = ({ isOpen, onClose, onLock }) => {
    const [duration, setDuration] = useState('');

    const handleLock = () => {
        const parsedDuration = parseInt(duration, 10);
        if (isNaN(parsedDuration) || parsedDuration <= 0) {
            alert("Please enter a valid duration.");
            return;
        }
        onLock(parsedDuration);
        setDuration('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Lockout User</h2>
                <label className="block mb-2">
                    Duration (in minutes):
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        placeholder="Enter duration"
                    />
                </label>
                <div className="flex justify-end space-x-2">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleLock}>
                        Lock
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LockoutModal;
