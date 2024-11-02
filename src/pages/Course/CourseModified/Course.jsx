import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../../layout/MainLayout";
import CourseTimeline from "../components/CourseTimeline";
import CourseTimelineDetail from "../components/CourseTimelineDetail";
import ClassCard from "../../Class/components/ClassCard";

const Course = ({ courseId, setCreateTest, setSkills }) => {
  const [classes, setClasses] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/class/course/${courseId}/classes`
      );
      setClasses(response.data.result);
    } catch (error) {
      console.error("Failed to fetch classes", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(prevSlide + 1, Math.ceil(classes.length / 4) - 1)
    );
  };

  const handleRegister = () => {
    // khi ấn nút ni thì sẽ hiện 1 cái card lên và enroll khóa ni, nhớ enroll thì cho hắn chọn class mới enroll,
    // enroll done thi an nut RegisterCourse di
    navigate(`/courseLayout/${courseId}`);
  };

  return (
    <div>
      {/* class */}
      <div className="mb-2 flex items-center gap-10">
        <h3 className="font-bold text-2xl ">Course Information</h3>
        <button
          type="button"
          className="p-2 border border-green-200 bg-green-50"
          onClick={handleRegister}
        >
          Register Course
        </button>
      </div>
      <div className="flex flex-col bg-white border w-full shadow-sm rounded-xl p-4 md:p-5 relative group mb-4">
        <div className="mt-4 relative">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-bold text-gray-800">Classes</h4>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {classes.map((classItem, index) => (
                <div className="w-full" key={index}>
                  <ClassCard key={classItem.id} classItem={classItem} />
                </div>
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
      {/* Courses information */}
      <div class=" border flex gap-6 p-4">
        <CourseTimeline courseId={courseId} />
        <CourseTimelineDetail
          courseId={courseId}
          setCreateTest={setCreateTest}
          setSkills={setSkills}
        />
      </div>
    </div>
  );
};

export default Course;
