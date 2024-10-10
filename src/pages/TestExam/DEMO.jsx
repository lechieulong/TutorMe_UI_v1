import React, { useState, useEffect } from "react";

const skills = [
  { name: "Listening", duration: 1 }, // thời gian theo phút
  { name: "Reading", duration: 1 },
  { name: "Writing", duration: 1 },
  { name: "Speaking", duration: 1 },
];

const DEMO = () => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(skills[0].duration * 4); // thời gian còn lại tính bằng giây

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          if (currentSkillIndex === skills.length - 1) {
            handleSubmit(); // Tự động submit khi kỹ năng cuối cùng hết thời gian
            clearInterval(timer);
          } else {
            handleNextSkill(); // Chuyển sang kỹ năng tiếp theo
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // mỗi giây

    return () => clearInterval(timer); // dọn dẹp khi component unmount
  }, [currentSkillIndex]); // chỉ phụ thuộc vào `currentSkillIndex`

  const handleNextSkill = () => {
    setCurrentSkillIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < skills.length) {
        setTimeLeft(skills[nextIndex].duration * 4); // reset thời gian cho kỹ năng tiếp theo
      }
      return nextIndex;
    });
  };

  const handleSubmit = () => {
    console.log("Submit test");
    alert("Test submitted!");
  };

  return (
    <div>
      <h1>IELTS Exam</h1>
      <h2>Current Skill: {skills[currentSkillIndex].name}</h2>
      <h3>
        Time Left: {Math.floor(timeLeft / 60)}:
        {("0" + (timeLeft % 60)).slice(-2)}
      </h3>

      {currentSkillIndex < skills.length - 1 ? (
        <button onClick={handleNextSkill}>Next Skill</button>
      ) : (
        <button onClick={handleSubmit}>Submit Test</button>
      )}
    </div>
  );
};

export default DEMO;
