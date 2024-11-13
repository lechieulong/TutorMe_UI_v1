import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import defaulAvatar from "../../../assets/images/default-avatar.jpg";
import { useParams } from "react-router-dom";
import { Profile } from '../../../redux/users/UserSlice';

const Certification = () => {
    const { teachername } = useParams();
    const dispatch = useDispatch();
    const { userEducation } = useSelector((state) => state.user);

    console.log("User education: ", userEducation);

    return (
        <div className="flex space-x-4 mb-4">
            <div className="flex-1">
                <div className="bg-white p-4 rounded shadow mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <img
                            src={userEducation?.imageURL || defaulAvatar}
                            alt={`${userEducation?.name} profile`}
                            className="rounded-full w-10 h-10"
                        />
                        <div>
                            <p className="font-semibold">{userEducation?.name}</p>
                            <p className="text-gray-500 text-xs">
                                Be teacher · Aug 10, 2024<i className="fas fa-globe"></i>
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src={userEducation?.imageURL || "https://placehold.co/300x300"}
                            alt="Teacher avatar"
                            className="rounded"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <div className="flex items-center space-x-2 mb-2">
                        <img 
                            src={userEducation?.imageURL || "https://placehold.co/40x40" }
                            alt="User profile" 
                            className="rounded-full w-10 h-10" />
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
                <div className="bg-yellow-100 p-4 rounded shadow">
                    <div className="">
                        <img
                            src={userEducation?.userEducationDto?.degreeURL || "https://placehold.co/300x300" }
                            alt="Certification"
                            className="rounded"
                        />
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Certification;