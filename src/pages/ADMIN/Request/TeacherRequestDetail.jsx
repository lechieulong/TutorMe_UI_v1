import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatDOB } from '../../../utils/Validator';
import { Admin_GetTeacherRequestDetail } from '../../../redux/ADMIN/TeacherSlice';;

const ProfileSidebar = ({ request }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow max-h-[500px] overflow-y-auto">
            <div className="mb-4">
                <h2 className="text-xl font-bold">Introduce</h2>
            </div>
            <div className="mb-4">
                <p>Bio: {request?.user.userEducationDto.aboutMe}</p>
            </div>
            <hr className="mb-4" />
            <div className="mb-4 ml-2">
                <div className="flex items-center mb-2">
                    <span>Career: <span className="font-bold">{request?.user.userEducationDto.career}</span></span>
                </div>
                <div className="flex items-center mb-2">
                    <span>IELTS grade: <span className="font-bold">{request?.user.userEducationDto.grade}</span></span>
                </div>
                <div className="flex items-center mb-2">
                    <span>Experience: <span className="font-bold">{request?.user.userEducationDto.yearExperience} years</span></span>
                </div>
                <div className="flex items-center mb-2">
                    <span>Request Description: <span className="font-bold">{request?.description}</span></span>
                </div>
                <div className="flex items-center mb-2">
                    <span>Request created at: <span className="font-bold">{formatDOB(request?.createAt)}</span></span>
                </div>
                <div className="flex items-center mb-2">
                    <span>Request updated at: <span className="font-bold">{formatDOB(request?.updateAt)}</span></span>
                </div>
            </div>
            <button className="font-bold w-full bg-gray-200 text-gray-700 py-2 rounded-lg mb-4">{request?.user.name}</button>
            {/* <div className="mb-4">
                <div className="flex items-center mb-2">
                    <span className="font-bold m-1">Listening</span>
                    <span className="font-bold m-1">Speaking</span>
                    <span className="font-bold m-1">Reading</span>
                    <span className="font-bold m-1">Writing</span>
                </div>
                <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg mb-4">Specialization</button>
            </div> */}
        </div>
    );
};

const CommentSection = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <input type="text" placeholder="Enter some comment ..." className="w-full p-2 border rounded-lg mb-4" />
            <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-red-500">
                    <i className="fas fa-video"></i>
                    <span>Reject</span>
                </button>
                <button className="flex items-center space-x-2 text-green-500">
                    <i className="fas fa-photo-video"></i>
                    <span>Accept</span>
                </button>
            </div>
        </div>
    );
};

const MainContent = ({ request }) => {
    return (
        <div className="w-2/3">
            <div className="bg-white p-4 rounded-lg shadow mb-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-4">
                        <button className="text-blue-500">Ielts Certification</button>
                        <button className="text-gray-500">Test result</button>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow mb-4">
                    <img src={request?.user?.userEducationDto?.degreeURL} alt="IELTS cert image" className="mx-auto" />
                </div>
            </div>
        </div>
    );
};

const TeacherRequestDetail = () => {
    const dispatch = useDispatch();
    const { requestId } = useParams();
    const { request, getRequestDetailStatus, getRequestDetailError } = useSelector((state) => state.ADMIN_teachersReducer);

    useEffect(() => {
        if (requestId) {
            dispatch(Admin_GetTeacherRequestDetail(requestId));
        }
    }, [dispatch, requestId]);

    return (
        <div className="flex space-x-4">
            <div className="w-1/3 space-y-4">
                <ProfileSidebar request={request} />
                <CommentSection />
            </div>
            <MainContent request={request}/>
        </div>
    );
};

export default TeacherRequestDetail;
