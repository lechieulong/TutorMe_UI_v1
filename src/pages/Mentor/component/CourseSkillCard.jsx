/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import CoursePartCard from "../../Course/components/CoursePartCard";
import CreateCoursePart from "./CreateCoursePart";
import Confirm from "../../../components/common/Confirm";
import Notification from "../../../components/common/Notification";
import TestForm from "../../ExamTest/TestForm";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import apiURLConfig from "../../../redux/common/apiURLConfig";
const CourseSkillCard = ({
  courseId,
  isEnrolled,
  onSkillCountUpdate,
  mentorAndList,
  isMentor,
  isDelete,
  onLoadingChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [isCreateTest, setIsCreateTest] = useState(false);
  const [categories, setCategories] = useState([]);
  const [skillId, setSkillId] = useState(null);
  const [testExams, setTestExams] = useState({}); // Store tests for each skill
  const token = Cookies.get("authToken");
  useEffect(() => {
    fetchSkills();
  }, [courseId]);

  // Fetch skills and associated test exams
  const fetchSkills = async () => {
    if (!courseId) return;

    onLoadingChange(true); // Set loading state to true

    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseSkills/Course/${courseId}`
      );
      setSkills(response.data);
      if (onSkillCountUpdate) {
        onSkillCountUpdate(response.data.length);
      }
      setActiveTab(response.data[0]?.id || null);

      // Fetch tests for each skill
      response.data.forEach((skill) => {
        fetchTestExams(skill.id);
      });
    } catch (error) {
      console.log("Error fetching skills:", error);
    } finally {
      onLoadingChange(false); // Set loading state to false once done
    }
  };

  // Fetch test exams for a specific skill
  const fetchTestExams = async (skillId) => {
    // Set loading to true before starting the fetch
    onLoadingChange(true);
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseSkills/GetTestExamsBySkillIdCourse?skillIdCourse=${skillId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTestExams((prevExams) => ({
        ...prevExams,
        [skillId]: response.data, // Store test exams for the skill
      }));
    } catch (error) {
      console.log("Error fetching test exams:", error);
    } finally {
      // Set loading to false once the fetch is complete
      onLoadingChange(false);
    }
  };

  const handleCreateTest = async (skillId) => {
    onLoadingChange(true); // Bắt đầu loading khi fetch description

    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseSkills/DescriptionBySkill/${skillId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsCreateTest(true);
      setCategories([response.data.description]);
      setSkillId(skillId);
    } catch (error) {
      console.log("Error fetching skill description:", error);
    } finally {
      onLoadingChange(false); // Kết thúc loading sau khi fetch xong
    }
  };

  const handleCreatePartClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  const closeCreateForm = () => {
    setShowCreateForm(false);
  };

  const handlePartCreated = () => {
    try {
      fetchSkills();
      closeCreateForm();
    } catch {
      console.log();
    }
  };

  const confirmDeleteSkill = async () => {
    try {
      setNotification("Skill deleted successfully.");
    } catch {
      console.log();
    }
  };
  const navigate = useNavigate();

  const handleNavigate = async (skillId, examId) => {
    onLoadingChange(true); // Bắt đầu loading khi fetch categories

    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseSkills/DescriptionBySkill/${skillId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedCategories = [response.data.description];
      setCategories(updatedCategories);

      // Điều hướng với categories đã cập nhật
      navigate(`/testDetail/${examId}`, {
        state: { categories: updatedCategories },
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    } finally {
      onLoadingChange(false); // Kết thúc loading sau khi fetch xong
    }
  };

  if (!skills) {
    return <p>Loading </p>;
  }

  const handleLoadingState = (loading) => {
    onLoadingChange(loading);
  };

  return (
    <div>
      {!isCreateTest ? (
        <div>
          <nav
            className="relative z-0 flex border rounded-xl overflow-hidden"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            {skills.map((skill) => (
              <button
                key={skill.id}
                type="button"
                className={`hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 relative min-w-0 flex-1 bg-white border-s border-b-2 py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none ${
                  activeTab === skill.id
                    ? "text-blue-600 border-b-blue-600"
                    : ""
                }`}
                onClick={() => setActiveTab(skill.id)}
                aria-selected={activeTab === skill.id}
                role="tab"
              >
                {skill.description}
              </button>
            ))}
          </nav>

          <div className="mt-3">
            {/* Create Course Part Button */}
            <div className="flex gap-2">
              {mentorAndList && (
                <button
                  type="button"
                  onClick={handleCreatePartClick}
                  disabled={isLoading}
                  className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-green-500 text-white shadow-sm hover:bg-green-600 focus:outline-none"
                >
                  {isLoading
                    ? "Loading..."
                    : showCreateForm
                    ? "Close Form"
                    : "Create Course Part"}
                </button>
              )}
            </div>

            {showCreateForm && activeTab && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                <CreateCoursePart
                  courseSkillId={activeTab}
                  onClose={closeCreateForm}
                  onCreated={handlePartCreated}
                  mentorAndList={mentorAndList}
                />
              </div>
            )}

            {skills.map((skill) => (
              <div
                key={skill.id}
                className={`${activeTab === skill.id ? "" : "hidden"}`}
                role="tabpanel"
                aria-labelledby={skill.id}
              >
                <CoursePartCard
                  mentorAndList={mentorAndList}
                  skillId={skill.id}
                  isEnrolled={isEnrolled}
                  isMentor={isMentor}
                  isDelete={isDelete}
                  courseSkillId={skill.id}
                  onLoadingChange={handleLoadingState}
                />

                <div className="px-10 bg-gray-50 py-6  rounded-lg shadow-md">
                  <h3 className="font-extrabold text-2xl text-green-700 py-3 mb-5 border-b-2 border-green-200">
                    Practice Test
                  </h3>
                  {(isEnrolled || mentorAndList || isMentor) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {testExams[skill.id]?.map(
                        (exam) => (
                          (
                            <div
                              key={exam.id}
                              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-300"
                            >
                              <button
                                onClick={() =>
                                  handleNavigate(skill.id, exam.id)
                                }
                                className="block w-full py-2 px-4 text-sm font-semibold text-green-700 bg-green-100 rounded-lg hover:bg-green-200 hover:text-green-800 transition duration-300"
                              >
                                Final Test: {exam.testName}
                              </button>
                            </div>
                          )
                        )
                      )}
                    </div>
                  )}
                  {mentorAndList && (
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => handleCreateTest(skill.id)}
                        className="flex items-center justify-center py-2 px-4 text-sm font-medium text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
                      >
                        <FontAwesomeIcon icon={faClipboard} className="mr-2" />
                        Create Test for {skill.description}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <TestForm
          categories={categories}
          skillIdCourse={skillId}
          courseId={courseId}
          testType={2}
          setIsCreateTest={setIsCreateTest}
          pageType="finalTest"
        />
      )}

      <Confirm
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDeleteSkill}
        status="Delete Skill"
        shoud="no"
        message="Are you sure you want to delete this skill? This action cannot be undone."
      />

      <Notification
        message={notification}
        onClose={() => setNotification("")}
      />
    </div>
  );
};

export default CourseSkillCard;
