import React from 'react';

const UnlockModal = ({ isOpen, onClose, onUnlock, user }) => {
    const handleUnlock = () => {
        if (user) {
            onUnlock(user); // Pass the user object to the unlock function
        }
        onClose(); // Close the modal after unlocking
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Unlock User</h2>
                <p>Are you sure you want to unlock the user <strong>{user?.name}</strong>?</p>
                <div className="flex justify-end space-x-2 mt-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleUnlock}>
                        Unlock
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnlockModal;
