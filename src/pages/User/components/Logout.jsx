import React from 'react';

const Logout = () => {
    return (
        <div className="col-12 lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <button className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg mb-4">
                    Logout
                </button>
                <div className="text-center">
                    <h6 className="font-semibold mb-2">Support</h6>
                    <p className="text-gray-600 mb-4">Get fast, free help from our friendly assistants.</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Contact Us</button>
                </div>
            </div>
        </div>
    )
}

 export default Logout;