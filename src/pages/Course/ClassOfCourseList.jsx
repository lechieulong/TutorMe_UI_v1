import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../layout/MainLayout";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import ClassCardOfCourse from "../Class/components/ClassCardOfCourse";
import CreateClass from "../Class/CreateClass";
import { fetchClasses } from "../../redux/classes/ClassSlice";
import { fetchClassIds } from "../../redux/Enrollment/EnrollmentSlice";
import { getUser } from "../../service/GetUser";
import ClassToEnroll from "../Class/components/ClassToEnroll";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
const ClassOfCourseList = () => {
  const location = useLocation();
  const { mentorAndList, isMentor } = location.state || {};
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState(null);

  const { classes, status, switchStates } = useSelector((state) => ({
    classes: state.classes.classes[courseId] || [], // Lấy danh sách lớp học theo courseId
    status: state.classes.status,
    switchStates: state.classes.switchStates,
  }));

  const isEmpty = !Array.isArray(classes) || classes.length === 0;

  const { classIds } = useSelector((state) => state.enrollment);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);

  const initializeUser = useCallback(() => {
    const userFromToken = getUser();
    setUserId(userFromToken?.sub);
  }, []);

  const handleCreateClassSuccess = () => {
    setShowCreateClassModal(false);
    toast.success("Class created successfully.");
    dispatch(fetchClasses(courseId));
    dispatch(fetchClassIds({ courseId, userId }));
  };

  const handleEnrollSuccess = () => {
    setIsPopupOpen(false);
    toast.success("Enrolled successfully.");
    dispatch(fetchClasses(courseId));
    dispatch(fetchClassIds({ courseId, userId }));
  };

  useEffect(() => {
    initializeUser();
    dispatch(fetchClassIds({ courseId, userId }));
    dispatch(fetchClasses(courseId));
  }, [dispatch, initializeUser, courseId, userId]);

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <MainLayout>
      <ToastContainer autoClose={3000} newestOnTop closeOnClick />
      <div className="flex flex-col w-screen min-h-screen bg-gray-50">
        <div className="flex flex-1 w-full">
          <MentorSidebar mentorAndList={true} />
          <div className="flex-1 p-6 bg-white rounded-lg shadow-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-700">
                Class List
                <FontAwesomeIcon
                  icon={faChalkboard}
                  className="text-gray-500 ml-4"
                />
              </h2>
              {!isMentor && (
                <>
                  {!mentorAndList && (
                    <button
                      onClick={handleOpenPopup}
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    >
                      Enroll
                    </button>
                  )}
                  {mentorAndList && (
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      onClick={() => setShowCreateClassModal(true)}
                    >
                      Create Class
                    </button>
                  )}
                </>
              )}
            </div>

            {isEmpty ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-red-500 text-lg">
                  No classes available for this course.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4 justify-between">
                {classes.map((classItem) => (
                  <ClassCardOfCourse
                    mentorAndList={mentorAndList}
                    isMentor={isMentor}
                    key={classItem.id}
                    classItem={classItem}
                    switchState={switchStates[classItem.id]}
                    classIds={classIds}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showCreateClassModal && (
        <CreateClass
          courseId={courseId}
          onClose={() => setShowCreateClassModal(false)}
          onCreateSuccess={handleCreateClassSuccess} // Chỉ xử lý tạo lớp
        />
      )}

      {isPopupOpen && (
        <ClassToEnroll
          courseId={courseId}
          userlearnerId={userId}
          onClose={handleClosePopup} // Đóng popup sau khi đăng ký
          onEnrollSuccess={handleEnrollSuccess} // Chỉ xử lý enroll
        />
      )}
    </MainLayout>
  );
};

export default ClassOfCourseList;
