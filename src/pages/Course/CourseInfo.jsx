import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from '../../layout/MainLayout';
import MentorSidebar from '../../components/Mentor/MentorSideBar';
import { getUser } from "../../service/GetUser";
import ClassCard from "../Class/components/ClassCard";
import CourseSkillCard from "../Mentor/component/CourseSkillCard";
import { CheckUserEnrollment } from "../../redux/Enrollment/EnrollmentSlice";
import { fetchClasses } from "../../redux/classes/ClassSlice";
import { enrollUser } from "../../redux/Enrollment/EnrollmentSlice";
import CreateClass from "../Class/CreateClass";
import { CheckLecturerOfCourse } from "../../redux/courses/CourseSlice";
import { GetCourseById } from "../../redux/courses/CourseSlice";
import {formatCurrency} from "../../utils/Validator";
import { FaStopwatch, FaRegLightbulb, FaRegListAlt, FaRegStickyNote, FaRegPlayCircle, FaRegGrinStars  } from "react-icons/fa";

const CourseInfo = () => {
    const { className, courseId } = useParams();
    const location = useLocation();
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);

    const {course, checkLecturer } = useSelector((state) => state.courses);
    console.log("course ", course);
    const dispatch = useDispatch();
    const classes = useSelector((state) => state.classes.classes);
    const switchStates = useSelector((state) => state.classes.switchStates);

    const isEnrolled = useSelector((state) => state.enrollment.isEnrolled);
    const initializeUser = useCallback(() => {
        const userFromToken = getUser();
        const userIdFromToken = userFromToken?.sub;
        const userRoleFromToken = userFromToken?.role;

        if (userIdFromToken) setUserId(userIdFromToken);
        if (userRoleFromToken) setUserRole(userRoleFromToken);
    }, []);

    useEffect(() => {
        initializeUser();
        dispatch(fetchClasses(courseId));
    }, [initializeUser, dispatch, courseId]);

    useEffect(() => {
        if (userId) {
            dispatch(CheckUserEnrollment({ userId, courseId })).then((result) => {
                console.log("Enrollment check completed:", result);
            });
        }
        dispatch(CheckLecturerOfCourse(courseId));
        dispatch(GetCourseById(courseId));
    }, [dispatch, userId, courseId]);

    const handleEnroll = () => {
        if (!selectedClassId || !userId || !courseId) {
            alert("Bạn chưa chọn lớp");
            return;
        }
        dispatch(enrollUser({ courseId, userId, classId: selectedClassId }))
            .unwrap()
            .then(() => {
                alert("Enrollment successful!");
                dispatch(CheckUserEnrollment({ userId, courseId }));
            })
            .catch((error) => {
                console.error("Enrollment failed", error);
                alert("Enrollment failed.");
            });
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) =>
            Math.min(prevSlide + 1, Math.ceil(classes.length / 4) - 1)
        );
    };

    const handleClassCardClick = (classId) => {
        setSelectedClassId(classId);
        console.log(`Selected ClassId: ${classId}`);
    };

    const handleOpenCreateClass = () => setIsCreateClassOpen(true);
    const handleCloseCreateClass = () => setIsCreateClassOpen(false);

    const handleCreateClassSuccess = () => {
        dispatch(fetchClasses(courseId));
        handleCloseCreateClass();
    };
    return (
        <MainLayout>
            <div className="flex w-screen h-full">
                <MentorSidebar />

                <div className="flex-1 bg-gray-100 overflow-y-auto p-6 indent-0">
                    <div className="mx-auto bg-houseGreen text-white rounded-lg shadow-lg flex flex-col lg:flex-row p-8 space-y-8 lg:space-y-0 lg:space-x-8">

                        {/* Left Section - Course Details */}
                        <div className="flex flex-col lg:w-2/3">
                            <h1 className="text-3xl font-bold mb-4">{course?.courseName}</h1>
                            <p className="mb-4 leading-relaxed">
                                {course?.content}
                            </p>
                            <div className="flex items-center text-sm space-x-4 mb-4">
                                <span>
                                    Lecturer: <Link to={`/coachingschedule/${course?.username}`} className="text-blue-300 underline">{course?.teacherName}</Link>
                                </span>
                                <span className="flex items-center">
                                    44486 students
                                </span>
                                <span className="flex items-center">
                                    4.4  <FaRegGrinStars/><FaRegGrinStars/><FaRegGrinStars/><FaRegGrinStars/>
                                </span>
                            </div>
                        </div>

                        {/* Right Section - Course Information and CTA */}
                        <div className="bg-lightGreen p-4 rounded-lg w-full lg:w-1/3 flex flex-col items-center text-center shadow-md">
                            <h2 className="text-2xl text-black font-bold mb-4">{formatCurrency(course?.price)}</h2>

                            <h3 className="text-lg text-houseGreen font-semibold mb-2">The course information</h3>

                            <ul className="space-y-3 mb-6 text-sm text-black">
                                <li className="flex items-center justify-center space-x-2">
                                    <FaStopwatch className="text-houseGreen" />
                                    <span>{course?.hours} hours</span>
                                </li>
                                <li className="flex items-center justify-center space-x-2">
                                    <FaRegLightbulb className="text-houseGreen" />
                                    <span>1 overall test</span>
                                </li>
                                <li className="flex items-center justify-center space-x-2">
                                    <FaRegListAlt className="text-houseGreen" />
                                    <span>81 progress tests</span>
                                </li>
                                <li className="flex items-center justify-center space-x-2">
                                    <FaRegStickyNote className="text-houseGreen" />
                                    <span>10 units</span>
                                </li>
                                <li className="flex items-center justify-center space-x-2">
                                    <FaRegPlayCircle className="text-houseGreen" />
                                    <span>25 lessons</span>
                                </li>
                            </ul>
                            {checkLecturer ? (
                                <p className="bg-accentGreen hover:bg-accentGreen-dark text-white py-2 px-4 rounded-lg w-full flex items-center justify-center transition duration-300">Manage course</p>
                            ) : isEnrolled?.isEnrolled ? (
                                <button className="bg-accentGreen hover:bg-accentGreen-dark text-white py-2 px-4 rounded-lg w-full flex items-center justify-center transition duration-300">
                                    Go to course
                                </button>
                            ) : (
                                <button className="bg-accentGreen hover:bg-accentGreen-dark text-white py-2 px-4 rounded-lg w-full flex items-center justify-center transition duration-300">
                                    Enroll now
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 p-4">
                        <div className="mt-2">
                            <CourseSkillCard
                                isCourseLecture={checkLecturer}
                                courseId={courseId}
                                userRole={userRole}
                                isEnrolled={isEnrolled}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CourseInfo;
