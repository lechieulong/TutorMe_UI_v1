import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import TestForm from "../ExamTest/TestForm";

const ClassDetail = () => {
  const { courseId, classId } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [isCreateTest, setIsCreateTest] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchClassDetail = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/class/${classId}`
      );
      if (response.data.isSuccess) {
        setClassDetail(response.data.result);
      } else {
        setError(response.data.message || "Không thể lấy thông tin lớp học.");
      }
    } catch (error) {
      setError("Không thể kết nối với API.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTest = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseSkills/Course/${courseId}`
      );
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        const descriptions = response.data.map(
          (item) => item.description || ""
        );
        setCategories(descriptions);
        setIsCreateTest(true);
      } else {
        console.log("Không có dữ liệu hợp lệ trong response.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API CourseSkills:", error);
    }
  };

  useEffect(() => {
    fetchClassDetail();
  }, [classId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MainLayout>
      <div className="flex flex-col w-screen">
        <div className="flex flex-1 w-full">
          <MentorSidebar />
          {isCreateTest ? (
            <TestForm
              classId={classId}
              categories={categories}
              pageType={"class"}
            />
          ) : (
            <>
              <div className="flex-1 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {classDetail.className}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Mô tả: </span>
                    {classDetail.classDescription}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Ngày bắt đầu: </span>
                    {new Date(classDetail.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Ngày kết thúc: </span>
                    {new Date(classDetail.endDate).toLocaleDateString()}
                  </p>
                  <button
                    type="submit"
                    onClick={handleCreateTest}
                    disabled={loading}
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    Create Test
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ClassDetail;
