import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import MentorHeader from "../../components/Mentor/MentorHeader";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import CourseTimeline from "../Course/components/CourseTimeline";
import CourseTimelineDetail from "../Course/components/CourseTimelineDetail";
import ButtonAddCourseTimeline from "../Course/components/ButtonAddCourseTimeline";
import ButtonAddCourseTimelineDetail from "../Course/components/ButtonAddCourseTimelineDetail";
import axios from "axios";
import { getUser } from "../../service/GetUser";
import ClassCard from "../Class/components/ClassCard";

const MentorCourseDetail = () => {
  const { className, courseId } = useParams();
  const location = useLocation();
  const [timelineIds, setTimelineIds] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [classes, setClasses] = useState([]);
  const [switchStates, setSwitchStates] = useState({});
  const [category, setCategory] = useState(location.state); // State để lưu danh mục
  const [selectedTimelines, setSelectedTimelines] = useState([]); // State để lưu danh sách timeline được chọn
  const navigate = useNavigate();

  const fetchTimelines = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseTimeline/Course/${courseId}`
      );
      setTimelineIds(response.data.map((timeline) => timeline.id));
    } catch (error) {
      console.error("Failed to fetch timelines", error);
    }
  };
  console.log("add");

  const initializeUser = () => {
    const userFromToken = getUser();
    const userIdFromToken = userFromToken?.sub;

    if (userIdFromToken) {
      setUserId(userIdFromToken);
    }
  };
  useEffect(() => {
    const { category } = location.state || {}; // Lấy category từ location.state
    if (category) {
      console.log("Category passed:", category); // Log category
      setCategory(category); // Cập nhật state category
    }
    initializeUser();
    fetchTimelines();
    fetchClasses();
  }, [courseId, location.state]);

  const handleTimelineAdded = (timelineId, timelineName) => {
    fetchTimelines();
    setSelectedTimelines((prev) => [
      ...prev,
      { id: timelineId, name: timelineName }, // Thêm tên timeline vào danh sách
    ]);
  };

  const handleDetailAdded = () => {
    fetchTimelines();
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/class/course/${courseId}/classes`
      );

      console.log("Classes fetched:", response.data.result);
      setClasses(response.data.result);

      const initialSwitchStates = {};
      response.data.result.forEach((classItem) => {
        initialSwitchStates[classItem.id] = classItem.isEnabled;
      });
      setSwitchStates(initialSwitchStates);
    } catch (error) {
      console.error("Failed to fetch classes", error);
    }
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(prevSlide + 1, Math.ceil(classes.length / 4) - 1)
    );
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MentorHeader />
      <div className="flex flex-1 mt-16 w-full">
        <MentorSidebar />
        <div className="flex-1 p-4">
          <div className="flex justify-start items-center mb-4">
            <p className="text-black font-bold text-4xl">{className}</p>
          </div>
          <div className="flex flex-col bg-white border w-full shadow-sm rounded-xl p-4 md:p-5 relative group mb-4">
            <div className="mt-4 relative">
              <div className="flex justify-between items-center">
                <h4 className="text-md font-bold text-gray-800">Classes</h4>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  onClick={() =>
                    navigate("/createClass", { state: { courseId } })
                  }
                >
                  Create Class
                </button>
              </div>

              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {classes.map((classItem) => (
                    <ClassCard
                      key={classItem.id}
                      classItem={classItem}
                      switchState={switchStates[classItem.id] || false}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <button
                  onClick={handlePrev}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  disabled={currentSlide === 0}
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  disabled={currentSlide >= Math.ceil(classes.length / 4) - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-2/5">
              <ButtonAddCourseTimeline
                courseId={courseId}
                onTimelineAdded={handleTimelineAdded} // Truyền hàm để lấy timelineId và tên
              />
              <CourseTimeline courseId={courseId} categories={category} />
              <div className="flex justify-center mt-4">
                <button className="items-center p-2 bg-green-400">
                  Submit
                </button>
              </div>
            </div>
            <div className="w-3/5">
              <ButtonAddCourseTimelineDetail
                timelineIds={timelineIds}
                onDetailAdded={handleDetailAdded}
              />
              <div className="w-3/5">
                <CourseTimelineDetail
                  timelineIds={timelineIds}
                  selectedTimelines={selectedTimelines} // Truyền danh sách timeline vào CourseTimelineDetail
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCourseDetail;
