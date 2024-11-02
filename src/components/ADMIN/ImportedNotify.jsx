import React from 'react';

const ImportedNotify = ({ isOpen, onClose, users = [], errors = [] }) => {
    if (!isOpen) return null;

    // Đếm số lượng người dùng và lỗi
    const userCount = users.length;
    const errorCount = errors.length;
    const totalCount = userCount + errorCount;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-xl font-bold mb-4 text-center">Import Summary - [{totalCount}]</h2>
                <div className="grid grid-cols-2 gap-4">
                    {/* Successfully Imported Users */}
                    <div className="overflow-y-auto max-h-64">
                        <h3 className="text-lg font-semibold text-green-600">
                            Successfully Imported Users - [{userCount}]
                        </h3>
                        {userCount > 0 ? (
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                {users.map((user, index) => (
                                    <li key={index}>{user.name} - {user.email}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No users were successfully imported.</p>
                        )}
                    </div>

                    {/* Failed Imports */}
                    <div className="overflow-y-auto max-h-64">
                        <h3 className="text-lg font-semibold text-red-600">
                            Failed Imports - [{errorCount}]
                        </h3>
                        {errorCount > 0 ? (
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No errors occurred during import.</p>
                        )}
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="mt-6 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition w-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ImportedNotify;
