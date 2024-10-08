import React from 'react';

const AvailableTime = () => {
    return (
        <aside className="w-1/3">
            <div className="bg-white p-4 rounded shadow mb-4">
                <h2 className="font-semibold mb-2">About</h2>
                <p className="flex items-center text-gray-600 mb-2">
                    <span className="text-sm">Tao là giáo viên tiếng Anh với chứng chỉ Ielst 9.0</span>
                </p>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="font-semibold mb-2">All course</h2>
                <div className="grid grid-cols-2 gap-2">
                    {[...Array(4)].map((_, index) => (
                        <img
                            key={index}
                            src={`https://placehold.co/140x120`}
                            alt={`Recent media ${index + 1}`}
                            className="rounded"
                        />
                    ))}
                </div>
                <div>
                    <a href="" className="">View all</a>
                </div>
            </div>
        </aside>
    );
};

export default AvailableTime;