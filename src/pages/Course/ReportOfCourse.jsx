import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "../../layout/MainLayout";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import LineChart from "../ADMIN/Chart/LineChart";

const ReportOfCourse = () => {
  const { courseId } = useParams(); // Lấy courseId từ URL
  const [enrollments, setEnrollments] = useState([]); // Lưu trữ dữ liệu enrollments
  const [monthlyData, setMonthlyData] = useState([]); // Dữ liệu số lượng enrollment theo tháng
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7030/api/Enrollment/Course/${courseId}`
        );
        const enrollmentsData = response.data;

        // Tính toán tháng hiện tại và tháng trước
        const now = new Date();
        const currentMonth = now.getMonth(); // Tháng hiện tại (0-11)
        const previousMonth = (currentMonth - 1 + 12) % 12; // Tháng trước (0-11)

        // Mảng chứa số lượng cho tháng trước và tháng hiện tại
        const monthlyCounts = [0, 0];

        enrollmentsData.forEach((enrollment) => {
          if (enrollment.enrollAt) {
            const enrollDate = new Date(enrollment.enrollAt);
            const enrollMonth = enrollDate.getMonth();

            // Kiểm tra nếu tháng thuộc tháng trước hoặc hiện tại
            if (enrollMonth === previousMonth) {
              monthlyCounts[0] += 1; // Tăng số lượng cho tháng trước
            } else if (enrollMonth === currentMonth) {
              monthlyCounts[1] += 1; // Tăng số lượng cho tháng hiện tại
            }
          }
        });

        setEnrollments(enrollmentsData); // Lưu dữ liệu enrollments
        setMonthlyData(monthlyCounts); // Lưu mảng [tháng trước, tháng hiện tại]
      } catch (err) {
        setError("Không thể tải dữ liệu enrollments.");
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    if (courseId) {
      fetchEnrollments();
    }
  }, [courseId]);

  return (
    <MainLayout>
      <div className="flex flex-col w-screen">
        <div className="flex w-full">
          <MentorSidebar mentorAndList={true} />
          <div className="flex flex-box"></div>
          <div className="bg-white w-full">
            <div className="p-5">
              <div className="container mx-auto px-4">
                <div>
                  {/* Lưới hiển thị enrollments */}
                  <h2 className="text-xl font-bold mb-4">
                    Danh sách Enrollments
                  </h2>
                  <ul className="list-disc list-inside">
                    {enrollments.map((enrollment) => (
                      <li key={enrollment.id}>
                        {enrollment.classId} -{" "}
                        {enrollment.enrollAt || "Chưa enroll"}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Biểu đồ Enrollment */}
                <div className="mt-6">
                  <LineChart monthlyData={monthlyData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportOfCourse;
