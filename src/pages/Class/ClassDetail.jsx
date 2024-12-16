import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import TestForm from "../ExamTest/TestForm";
import CreateClassFile from "./CreateClassFile";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faFileWord,
  faFilePowerpoint,
  faStickyNote,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
const ClassDetail = () => {
  const { courseId, classId } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [classFiles, setClassFiles] = useState([]);
  const [isCreateTest, setIsCreateTest] = useState(false);
  const [isUploadFileOpen, setIsUploadFileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [testExams, setTestExams] = useState([]);
  const fetchClassDetail = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/class/${classId}`
      );
      if (response.data.isSuccess) {
        setClassDetail(response.data.result);
      } else {
        setError(response.data.message || "Unable to fetch class details.");
      }
    } catch (err) {
      setError("Failed to connect to the API.");
    } finally {
      setLoading(false);
    }
  };
  const location = useLocation();
  const { mentorAndList } = location.state || {};
  const getFileIcon = (filePath) => {
    const extension = filePath.split(".").pop().toLowerCase();
    switch (extension) {
      case "xlsx":
      case "xls":
        return <FontAwesomeIcon icon={faFileExcel} size="1x" />;
      case "docx":
      case "doc":
        return <FontAwesomeIcon icon={faFileWord} size="1x" />;
      case "pptx":
      case "ppt":
        return <FontAwesomeIcon icon={faFilePowerpoint} size="1x" />;
      case "txt":
        return <FontAwesomeIcon icon={faStickyNote} size="1x" />;
      default:
        return null;
    }
  };
  const fetchClassFiles = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/ClassFile/class/${classId}`
      );
      if (response.data) {
        setClassFiles(response.data);
      } else {
        setClassFiles([]);
      }
    } catch (err) {
      console.error("Failed to fetch class files:", err);
      setClassFiles([]);
    }
  };

  const handleCreateTest = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseSkills/Course/${courseId}`
      );
      if (response.data?.length > 0) {
        const descriptions = response.data.map(
          (item) => item.description || ""
        );
        setCategories(descriptions);
        setIsCreateTest(true);
      } else {
        console.error("No valid data in the response.");
      }
    } catch (err) {
      console.error("Error fetching course skills:", err);
    }
  };

  const handleFileSubmit = async (fileData) => {
    try {
      // API call to upload the file
      await axios.post("https://localhost:7030/api/ClassFile", fileData);
      handleFileCreated();
    } catch (err) {
      console.error("File upload failed:", err);
      throw err;
    }
  };

  const handleFileCreated = () => {
    fetchClassFiles(); // Refresh class files after uploading a new file
    setIsUploadFileOpen(false);
  };
  const fetchTestExams = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/class/GetTestExamsByClassId/${classId}`
      );
      console.log(response);

      if (Array.isArray(response.data) && response.data.length > 0) {
        setTestExams(response.data); // Lưu danh sách bài kiểm tra vào state
      } else {
        console.error("No TestExams found for the class.");
      }
    } catch (err) {
      console.error("Error fetching test exams:", err);
    }
  };

  useEffect(() => {
    fetchClassDetail(); // Lấy chi tiết lớp học
    fetchClassFiles(); // Lấy danh sách file
    fetchTestExams();
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
              courseId={courseId}
              setIsCreateTest={setIsCreateTest}
              testType={2}
            />
          ) : (
            <div className="flex-1 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {classDetail.className}
                </h2>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Description: </span>
                  {classDetail.classDescription}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Start Date: </span>
                  {new Date(classDetail.startDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">End Date: </span>
                  {new Date(classDetail.endDate).toLocaleDateString()}
                </p>
                {mentorAndList && (
                  <div className="flex gap-4">
                    <button
                      onClick={handleCreateTest}
                      className="py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                    >
                      Create Test
                    </button>
                    <button
                      onClick={() => setIsUploadFileOpen(true)}
                      className="py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                    >
                      Upload File
                    </button>
                  </div>
                )}
              </div>
              {isUploadFileOpen && (
                <div className="mt-4">
                  <CreateClassFile
                    onSubmit={handleFileSubmit}
                    onCreated={handleFileCreated}
                    onClose={() => setIsUploadFileOpen(false)}
                    classId={classId}
                  />
                </div>
              )}
              <div className="mt-6 flex gap-8">
                <div className="w-1/2">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Test Exams
                  </h3>
                  {testExams.length > 0 ? (
                    <ul className="list-disc pl-6">
                      {testExams.map((test) => (
                        <li key={test.id} className="mb-2   gap-2">
                          <p>Test name </p>
                          <Link
                            to={`/testDetail/${test.id}`}
                            className="py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                          >
                            {test.testName}
                            <FontAwesomeIcon
                              icon={faClipboard}
                              className="ml-4"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No tests available.</p>
                  )}
                </div>

                <div className="w-1/2">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Resources
                  </h3>
                  {classFiles.length > 0 ? (
                    <ul className="list-disc pl-6">
                      {classFiles.map((file) => (
                        <li key={file.filePath} className="mb-2">
                          <a
                            href={file.filePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {file.filePath.split("/").pop()}
                          </a>
                          <p className="text-gray-600">
                            <span className="font-semibold">Topic: </span>
                            {file.topic}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-semibold">Description: </span>
                            {file.description}
                          </p>
                          <div className="mt-2">
                            {getFileIcon(file.filePath)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No files uploaded yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ClassDetail;
