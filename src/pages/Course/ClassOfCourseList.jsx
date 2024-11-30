import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../layout/MainLayout";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import ClassCard from "../Class/components/ClassCard";
import CreateClass from "../Class/CreateClass";
import { fetchClasses } from "../../redux/classes/ClassSlice";

const ClassOfCourseList = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  // Lấy state từ Redux store
  const { classes, status, error, switchStates } = useSelector(
    (state) => state.classes
  );

  const [showCreateClassModal, setShowCreateClassModal] = useState(false);

  const handleSwitchChange = (classId, newStatus) => {
    console.log(`Switch changed for class ${classId} to ${newStatus}`);
  };

  const handleSelectClass = (classId) => {
    console.log(`Class selected: ${classId}`);
  };

  const handleCreateClassSuccess = () => {
    setShowCreateClassModal(false); // Đóng popup
    dispatch(fetchClasses(courseId)); // Làm mới danh sách lớp học
  };

  useEffect(() => {
    dispatch(fetchClasses(courseId)); // Gọi fetchClasses qua Redux khi component được mount
  }, [dispatch, courseId]);

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col w-screen min-h-screen bg-gray-50">
        <div className="flex flex-1 w-full">
          <MentorSidebar />
          <div className="flex-1 p-6 bg-white rounded-lg shadow-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-700">Class List</h2>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                onClick={() => setShowCreateClassModal(true)} // Hiển thị popup
              >
                Create Class
              </button>
            </div>

            {classes.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-red-500 text-lg">
                  No classes available for this course.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {classes.map((classItem) => (
                  <ClassCard
                    key={classItem.id}
                    classItem={classItem}
                    switchState={switchStates[classItem.id]} // Sử dụng trạng thái switch từ Redux
                    onSwitchChange={handleSwitchChange}
                    onSelect={handleSelectClass}
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
          onClose={() => setShowCreateClassModal(false)} // Đóng popup
          onCreateSuccess={handleCreateClassSuccess} // Gọi lại danh sách khi tạo thành công
        />
      )}
    </MainLayout>
  );
};

export default ClassOfCourseList;
