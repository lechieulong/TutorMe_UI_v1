import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Profile } from '../../../redux/users/UserSlice';

const About = () => {
    const dispatch = useDispatch();
    const { teachername } = useParams();
    // Dispatch to fetch teacher profile and schedule
    useEffect(() => {
        if (teachername) {
            dispatch(Profile(teachername));
        }
    }, [dispatch, teachername]);

    const { userInfor, userEducation } = useSelector((state) => state.user);

    return (
        <div className="flex space-x-4 mb-4">
            <div className="flex-1">
                <div className="bg-white p-4 rounded shadow mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <img
                            src={userInfor?.imageURL || "https://placehold.co/40x40"}
                            alt="Anne Tran profile"
                            className="rounded-full w-10 h-10"
                        />
                        <div>
                            <p className="font-semibold">{userInfor?.name || "User Name"}</p>
                            <p className="text-gray-500 text-xs">
                                Be teacher · Aug 10, 2024<i className="fas fa-globe"></i>
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src={userInfor?.imageURL || "https://placehold.co/300x300"}
                            alt="Teacher avatar"
                            className="rounded"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <div className="flex items-center space-x-2 mb-2">
                        <img src={userInfor?.imageURL || "https://placehold.co/40x40"} alt="User profile" className="rounded-full w-10 h-10" />
                        <input
                            type="text"
                            placeholder="Sent message to teacher..."
                            className="flex-1 border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-blue-500">
                            <i className="fas fa-user-secret"></i>
                            <span>File</span>
                        </button>
                        <button className="flex items-center space-x-1 text-green-500">
                            <i className="fas fa-camera"></i>
                            <span>Photo/video</span>
                        </button>
                        <button className="flex items-center space-x-1 text-orange-500">
                            <i className="fas fa-poll"></i>
                            <span>Audio</span>
                        </button>
                    </div>
                </div>
            </div>

            <aside className="w-1/3">
                <div className="bg-white p-4 rounded shadow mb-4">
                    <h2 className="font-semibold mb-2">About</h2>
                    <p className="flex items-center text-gray-600 mb-2">
                        <span className="text-sm">{userEducation?.userEducationDto?.aboutMe}</span>
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
        </div>
    );
};

export default About;