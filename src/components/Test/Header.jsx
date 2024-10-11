import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faExchangeAlt,
  faLanguage,
  faPaperPlane,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import NoteCard from "./NoteCard";
import { useSelector } from "react-redux";

const Header = ({
  testData,
  currentSkillIndex,
  handleNextSkill,
  handleSubmit,
}) => {
  const [timeLeft, setTimeLeft] = useState(1);
  const timerRef = useRef(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const answer = useSelector((state) => state.answer);

  const openNoteModal = () => setIsNoteOpen(true);
  const closeNoteModal = () => setIsNoteOpen(false);

  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  // Manage timer logic
  useEffect(() => {
    if (testData.length > 0) {
      setTimeLeft(testData[currentSkillIndex].duration * 10); // Set time for the current skill
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0) {
            clearInterval(timerRef.current);

            setTimeout(() => {
              if (currentSkillIndex < testData.length - 1) {
                handleNextSkill(); // Call the handleNextSkill after render
              } else {
                handleSubmit();
              }
            }, 0);
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);

      return () => clearInterval(timerRef.current); // Cleanup interval when component unmounts
    }
  }, [currentSkillIndex, testData, handleNextSkill, handleSubmit]);

  return (
    <div className="flex-1 flex justify-between items-center p-4  bg-green-400 shadow-md">
      <p className="text-lg font-semibold">
        IELTS
        <span className="ml-2 text-white">
          <FontAwesomeIcon icon={faLanguage} />
        </span>
      </p>
      <p className="text-lg font-semibold items-center">
        <span className="mr-2 text-white">
          <FontAwesomeIcon icon={faClock} />
        </span>
        <span className="text-sm mr-4">Time left</span>
        <span className="text-xl text-white">{formatTime(timeLeft)}</span>
        <span className="text-sm ml-2">minutes</span>
      </p>
      <div className="flex gap-8 justify-center items-center">
        <span
          onClick={openNoteModal} // Open the note modal
          className="text-md font-semibold text-white cursor-pointer"
        >
          <span className="mr-2 text-sm">
            <FontAwesomeIcon icon={faPen} />
          </span>
          Take note
        </span>

        {/* Render "Next Skill" or "Submit Test" buttons */}
        {currentSkillIndex < testData.length - 1 ? (
          <button
            onClick={handleNextSkill} // Call handleNextSkill
            className="cursor-pointer inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white px-4 py-2"
          >
            Next Skill
          </button>
        ) : (
          <button
            onClick={handleSubmit} // Call handleSubmit
            className="cursor-pointer inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white px-4 py-2"
          >
            <span className="mr-2 text-sm">
              <FontAwesomeIcon icon={faPaperPlane} />
            </span>
            Submit Test
          </button>
        )}
      </div>

      {isNoteOpen && <NoteCard onClose={closeNoteModal} />}
    </div>
  );
};

export default Header;
