import MentorHeader from "../../components/Mentor/MentorHeader";
import MentorSidebar from "../../components/Mentor/MentorSideBar";

const CourseDetail = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header nằm trên cùng */}
      <MentorHeader />
      {/* Container chứa Sidebar và nội dung */}
      <div className="flex flex-1 mt-16 w-full">
        <MentorSidebar />
        {/* Nội dung chính nằm bên phải */}
        <div className="flex-1 p-4">
          <h1>Course Detail Content</h1>
          {/* Các thành phần khác của nội dung */}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
