import React, { useState } from 'react';

const LockoutModal = ({ isOpen, onClose, onLock }) => {
    const [duration, setDuration] = useState('');
    const [reason, setReason] = useState('');
    const [unit, setUnit] = useState('hour'); // Default unit
    const [error, setError] = useState('');
    const [isCustom, setIsCustom] = useState(false); // Track if custom duration is selected

    const predefinedDurations = [
        { label: '1 Hour', value: 1, unit: 'hour' },
        { label: '1 Day', value: 1, unit: 'day' },
        { label: '1 Week', value: 1, unit: 'week' },
        { label: '1 Month', value: 1, unit: 'month' },
        { label: '1 Year', value: 1, unit: 'year' },
        { label: 'Until unlock', value: 0, unit: 'untilUnlock' }, // Special case
        { label: 'Custom', value: null, unit: 'custom' },
    ];

    const handleDurationChange = (value, unit) => {
        if (unit === 'custom') {
            setIsCustom(true); // Show custom input section
            setDuration('');
            setUnit('minute'); // Default unit for custom input
        } else if (unit === 'untilUnlock') {
            setIsCustom(false); // Hide custom input section
            setDuration(0); // Special case: no duration needed for until unlock
            setUnit('untilUnlock'); // Special unit
        } else {
            setIsCustom(false); // Hide custom input section
            setDuration(value);
            setUnit(unit);
        }
        setError('');
    };

    const handleSubmit = () => {
        if (isCustom && (!duration || isNaN(duration) || duration <= 0)) {
            setError("Please enter a valid duration.");
            return;
        }

        // Handle untilUnlock logic separately
        if (!reason) {
            setError("Please provide a reason.");
            return;
        }

        onLock(duration, unit, reason);
        onClose();
    };

    return (
        <div
            className={`modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}
        >
            <div className="modal-content bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">Lock User</h3>
                <div>
                    <label htmlFor="duration" className="block text-base font-medium">Duration</label>
                    <select
                        id="duration"
                        className="block w-full border-gray-300 bg-gray-200 rounded mt-2"
                        onChange={(e) => handleDurationChange(e.target.value, e.target.selectedOptions[0].dataset.unit)}
                    >
                        {predefinedDurations.map((option, index) => (
                            <option key={index} value={option.value} data-unit={option.unit}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                {isCustom && (
                    <div className="mt-4 flex space-x-4">
                        <div className="flex-1">
                            <select
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                className="block w-full border-gray-300 bg-gray-200 rounded"
                            >
                                <option value="minute">Minutes</option>
                                <option value="hour">Hours</option>
                                <option value="day">Days</option>
                                <option value="week">Weeks</option>
                                <option value="month">Months</option>
                                <option value="year">Years</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <input
                                type="number"
                                placeholder="Enter duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="block w-full border-gray-300 bg-gray-200 rounded pl-1"
                            />
                        </div>
                    </div>
                )}

                <div className="mt-4">
                    <textarea
                        type="text"
                        placeholder="Enter reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="block w-full border-gray-300 bg-gray-200 rounded mt-2 pl-1"
                    />
                </div>
                {error && <p className="font-mono text-red-500 text-sm mt-2">{error}</p>}
                <div className="mt-6 flex justify-end">
                    <button className="bg-gray-200 px-4 py-2 rounded mr-2" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
                        Lock
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LockoutModal;
