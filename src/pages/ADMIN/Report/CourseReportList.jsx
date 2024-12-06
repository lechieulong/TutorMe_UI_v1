import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getReports } from "../../../redux/common/ReportSlice"; // Import action
import { FaLock, FaLockOpen } from "react-icons/fa"; // Nếu cần thiết

const CourseReportList = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState([]); // State local để lưu báo cáo
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy báo cáo khi component được render
    const fetchReports = async () => {
      setStatus("loading");
      try {
        const data = await dispatch(getReports()).unwrap(); // Dùng unwrap để lấy kết quả từ action
        setReports(data); // Lưu báo cáo vào state local
        setStatus("succeeded");
      } catch (err) {
        setError(err.message || "Failed to fetch reports");
        setStatus("failed");
      }
    };

    fetchReports();
  }, [dispatch]);

  // Handle unlock button click
  const handleUnlockClick = (report) => {
    console.log(`Unlocking report: ${report.id}`);
    // Thực hiện hành động unlock ở đây
  };

  // Handle lock button click
  const handleLockClick = (report) => {
    console.log(`Locking report: ${report.id}`);
    // Thực hiện hành động lock ở đây
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search by email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6">Issue Title</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Created At</th>
            <th className="py-3 px-6">Priority</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6"></th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {status === "loading" ? (
            <tr>
              <td colSpan="6" className="text-yellow-300 text-center py-4">
                Loading...
              </td>
            </tr>
          ) : status === "failed" ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-red-500">
                {error ||
                  "An error occurred while fetching reports. Please try again later."}
              </td>
            </tr>
          ) : (
            reports
              .filter((report) =>
                report.userId.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((report, index) => (
                <tr
                  key={index}
                  className={`border-t hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <td className="py-3 px-6">{report.issueTitle}</td>
                  <td className="py-3 px-6">{report.userId}</td>
                  <td className="py-3 px-6">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">{report.priority}</td>
                  <td className="py-3 px-6">{report.status}</td>
                  <td className="py-3 px-6 text-center">
                    {report.status === "pending" ? (
                      <button onClick={() => handleUnlockClick(report)}>
                        <FaLock className="text-red-500 cursor-pointer" />
                      </button>
                    ) : (
                      <button onClick={() => handleLockClick(report)}>
                        <FaLockOpen className="text-green-500 cursor-pointer" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default CourseReportList;
