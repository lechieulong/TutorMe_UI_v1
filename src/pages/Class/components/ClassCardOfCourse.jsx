/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import useAuthToken from "../../../hooks/useAuthToken";

const ClassCardOfCourse = ({
  mentorAndList,
  classItem,
  isActive,
  classIds,
  isMentor,
}) => {
  const author = useAuthToken();
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra xem classItem.id có trong danh sách classIds hay không
  const isDisabled =
    !mentorAndList && !isMentor && !classIds.includes(classItem.id);

  const handleCardClick = () => {
    if (isDisabled) return; // Ngăn click nếu component bị disabled

    if (author == null) {
      navigate("/login");
    }
    if (location.pathname.includes("/classOfCourse")) {
      navigate(`/classDetail/${classItem.courseId}/${classItem.id}`, {
        state: {
          mentorAndList, // Truyền mentorAndList vào state
        },
      });
    }
  };

  const cardClassName = location.pathname.includes("/classOfCourse")
    ? "flex-shrink-0 w-full sm:w-1/1 md:w-1/2 lg:w-1/2 p-2"
    : "flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2";

  return (
    <div className={cardClassName} onClick={handleCardClick}>
      <div
        className={`border rounded-lg shadow ${
          isDisabled
            ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-30"
            : "hover:shadow-lg cursor-pointer"
        } transition-transform duration-200 ${
          isActive && !isDisabled ? "border-green-400" : "border-gray-200"
        }`}
      >
        <div className="pl-4 pr-4 pt-4 bg-white">
          <h5 className="text-lg font-semibold text-gray-800">
            {classItem.className}
          </h5>
          <p className="text-sm text-gray-500 mt-1">
            Người ghi danh: {classItem.enrollmentCount}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Ngày bắt đầu: {classItem.startDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClassCardOfCourse;
