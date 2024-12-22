import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatDOB } from '../../../utils/Validator';
import { Admin_GetTeacherRequestDetail, Admin_ProcessTeacherRequest } from '../../../redux/ADMIN/TeacherSlice';

// Profile Sidebar Component
const ProfileSidebar = ({ request }) => (
    <div className="bg-white p-4 rounded-lg shadow max-h-[500px] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Introduce</h2>
        <p>Bio: {request?.user?.userEducationDto?.aboutMe || 'N/A'}</p>
        <hr className="my-4" />
        <div className="ml-2 space-y-2">
            <p>Career: <span className="font-bold">{request?.user?.userEducationDto?.career || 'N/A'}</span></p>
            <p>IELTS grade: <span className="font-bold">{request?.user?.userEducationDto?.grade || 'N/A'}</span></p>
            <p>Experience: <span className="font-bold">{request?.user?.userEducationDto?.yearExperience || '0'} years</span></p>
            <p>Request Description: <span className="font-bold">{request?.description || 'N/A'}</span></p>
            <p>Request created at: <span className="font-bold">{formatDOB(request?.createAt) || 'N/A'}</span></p>
            <p>Request updated at: <span className="font-bold">{formatDOB(request?.updateAt) || 'N/A'}</span></p>
        </div>
        <button className="font-bold w-full bg-gray-200 text-gray-700 py-2 rounded-lg mt-4">
            {request?.user?.name || 'Anonymous'}
        </button>
    </div>
);

// Comment Section Component
const CommentSection = ({ request }) => {
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    const dispatch = useDispatch();
    const { processStatus, processError } = useSelector((state) => state.ADMIN_teachers);

    const handleSubmit = async (isAccepted) => {
        if (!comment.trim()) {
            setCommentError("Comment is required.");
            return;
        }
        setCommentError(""); // Clear error if validation passes

        try {
            await dispatch(Admin_ProcessTeacherRequest({
                requestId: request?.id,
                processTeacherRequestData: { comment, status: isAccepted ? 1 : 2 },
            })).unwrap();
            dispatch(Admin_GetTeacherRequestDetail(request?.id));
        } catch (error) {
            console.error("Failed to process teacher request:", error);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            {request?.status === 2 ? (
                <div className="p-4 bg-red-100 rounded-lg">
                    <p className="text-red-600 font-semibold">Status: Rejected</p>
                    <p className="text-gray-700 mt-2">Description: {request?.description}</p>
                </div>
            ) : request?.status === 1 ? (
                <div className="p-4 bg-green-100 rounded-lg">
                    <p className="text-green-500 font-semibold">Status: Accepted</p>
                    <p className="text-gray-700 mt-2">Description: {request?.description}</p>
                </div>
            ) : (
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Enter some comment ..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 border rounded-lg mb-1"
                    />
                    {commentError && (
                        <p className="text-red-500 text-sm mb-2">{commentError}</p>
                    )}
                    <div className="flex space-x-4">
                        {processStatus === "pending" ? (
                            <p className="flex items-center space-x-2 text-yellow-300">Processing...</p>
                        ) : (
                        <>
                            <button
                                type="button"
                                onClick={() => handleSubmit(false)}
                                className="flex items-center space-x-2 text-red-500"
                            >
                                <span>Reject</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSubmit(true)}
                                className="flex items-center space-x-2 text-green-500"
                            >
                                <span>Accept</span>
                            </button>
                        </>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
};

// Main Content Component
const MainContent = ({ request }) => (
    <div className="w-2/3">
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex justify-between items-center mb-4">
                <button className="text-blue-500">IELTS Certification</button>
                {/* <button className="text-gray-500">Test result</button> */}
            </div>
            {request?.user?.userEducationDto?.degreeURL && (
                <img src={request.user.userEducationDto.degreeURL} alt="IELTS cert" className="mx-auto" />
            )}
        </div>
    </div>
);

// Teacher Request Detail Page
const TeacherRequestDetail = () => {
    const dispatch = useDispatch();
    const { requestId } = useParams();
    const { request, getRequestDetailStatus, getRequestDetailError } = useSelector((state) => state.ADMIN_teachers);

    useEffect(() => {
        if (requestId) {
            dispatch(Admin_GetTeacherRequestDetail(requestId));
        }
    }, [dispatch, requestId]);

    return (
        <div className="flex space-x-4">
            <div className="w-1/3 space-y-4">
                <ProfileSidebar request={request} />
                <CommentSection request={request} />
            </div>
            <MainContent request={request} />
        </div>
    );
};

export default TeacherRequestDetail;
