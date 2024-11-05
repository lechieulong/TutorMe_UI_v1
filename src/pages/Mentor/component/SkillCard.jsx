import React, { useEffect, useState } from "react";
import axios from "axios";

const SkillCard = ({ courseId, onSkillSelect }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchSkills = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://localhost:7030/api/CourseSkills/Course/${courseId}`
        );
        setSkills(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch skills.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [courseId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="skill-card-container">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="skill-card"
          onClick={() => onSkillSelect(skill.id)} // Truyền skillId khi người dùng chọn kỹ năng
        >
          <h3>Skill Type: {skill.type}</h3>
          <p>Description: {skill.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SkillCard;
