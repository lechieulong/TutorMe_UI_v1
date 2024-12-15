/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import CoursePartCard from "../../Course/components/CoursePartCard";
import CreateCoursePart from "./CreateCoursePart";
import Confirm from "../../../components/common/Confirm";
import Notification from "../../../components/common/Notification";
import TestForm from "../../ExamTest/TestForm";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const CourseSkillCard = ({
  courseId,
  isEnrolled,
  onSkillCountUpdate,
  mentorAndList,
  isMentor,
}) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => {});
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
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseSkills/Course/${courseId}`
      );
      setSkills(response.data);
      if (onSkillCountUpdate) {
        onSkillCountUpdate(response.data.length);
      }
      setActiveTab(response.data[0]?.id || null);
      setError(null);

      // Fetch tests for each skill
      response.data.forEach((skill) => {
        fetchTestExams(skill.id);
      });
    } catch (err) {
      setError("Failed to fetch skills.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch test exams for a specific skill
  const fetchTestExams = async (skillId) => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseSkills/GetTestExamsBySkillIdCourse?skillIdCourse=${skillId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTestExams((prevExams) => ({
        ...prevExams,
        [skillId]: response.data, // Store test exams for the skill
      }));
    } catch (err) {
      console.error("Error fetching test exams:", err);
    }
  };

  const handleCreateTest = async (skillId) => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseSkills/DescriptionBySkill/${skillId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsCreateTest(true);
      setCategories([response.data.description]);
      setSkillId(skillId);
    } catch (error) {
      console.error("Failed to fetch data from API", error);
    }
  };

  const handleCreatePartClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  const closeCreateForm = () => {
    setShowCreateForm(false);
  };

  const handlePartCreated = () => {
    fetchSkills();
    closeCreateForm();
  };

  const handleConfirmAction = (action) => {
    setConfirmAction(() => action);
    setConfirmOpen(true);
  };

  const confirmDeleteSkill = async () => {
    try {
      await confirmAction();
      setNotification("Skill deleted successfully.");
    } catch (error) {
      console.error("Error deleting skill:", error);
      setNotification("Failed to delete skill.");
    } finally {
      setConfirmOpen(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  console.log(isCreateTest);

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
                  disabled={loading}
                  className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-green-500 text-white shadow-sm hover:bg-green-600 focus:outline-none"
                >
                  {loading
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
                />

                {mentorAndList && (
                  <button
                    type="button"
                    onClick={() => handleCreateTest(skill.id)}
                    className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 mt-4"
                  >
                    Create Test for {skill.description}
                  </button>
                )}
                {(isEnrolled || mentorAndList || isMentor) && (
                  <div className="flex space-x-4 mt-4">
                    {testExams[skill.id]?.map((exam) => (
                      <div key={exam.id}>
                        <Link
                          to={`/testDetail/${exam.id}`} // Link dẫn đến chi tiết bài kiểm tra
                          className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                          Do Test for Skill: {skill.description}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
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
