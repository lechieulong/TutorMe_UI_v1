import React, { useEffect, useState } from "react";
import axios from "axios";
import CoursePartCard from "../../Course/components/CoursePartCard";
import CreateCoursePart from "./CreateCoursePart";

const CourseSkillCard = ({ courseId, userRole }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, [courseId]);

  const fetchSkills = async () => {
    if (!courseId) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseSkills/Course/${courseId}`
      );
      setSkills(response.data);
      setActiveTab(response.data[0]?.id || null); // Set default active tab
      setError(null);
    } catch (err) {
      setError("Failed to fetch skills.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePartClick = () => {
    setShowCreateForm(!showCreateForm); // Toggle form visibility
  };

  const closeCreateForm = () => {
    setShowCreateForm(false);
  };

  const handlePartCreated = () => {
    fetchSkills(); // Reload skills to update CoursePartCard after creating a new part
    closeCreateForm();
  };

  const handleCreateTestClick = async (skillId) => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseSkills/DescriptionBySkill/${skillId}`
      );
      console.log("Create Test clicked for Skill ID:", skillId);
      console.log("Description:", response.data.description);
    } catch (err) {
      console.error("Failed to fetch description:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
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
              activeTab === skill.id ? "text-blue-600 border-b-blue-600" : ""
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
        <div className="flex gap-2">
          {userRole !== "USER" && (
            <>
              <button
                type="button"
                onClick={handleCreatePartClick}
                disabled={loading}
                className="py-2 mb-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              >
                {loading
                  ? "Loading..."
                  : showCreateForm
                  ? "Close Form"
                  : "Create Course Part"}
              </button>
              <button
                type="button"
                onClick={() => handleCreateTestClick(activeTab)}
                className="py-2 mb-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              >
                Create Test
              </button>
            </>
          )}
        </div>

        {showCreateForm && activeTab && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <CreateCoursePart
              courseSkillId={activeTab}
              onClose={closeCreateForm}
              onCreated={handlePartCreated}
            />
            <button
              onClick={closeCreateForm}
              className="mt-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}

        {skills.map((skill) => (
          <div
            key={skill.id}
            className={`${activeTab === skill.id ? "" : "hidden"}`}
            role="tabpanel"
            aria-labelledby={skill.id}
          >
            <CoursePartCard skillId={skill.id} userRole={userRole} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSkillCard;
