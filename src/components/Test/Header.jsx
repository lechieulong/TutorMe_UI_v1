import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLanguage,
  faPaperPlane,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import Modal from "react-modal"; // Import react-modal
import NoteCard from "./NoteCard";

const Header = ({
  testData,
  currentSkillIndex,
  handleNextSkill,
  handleSubmit,
}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const openNoteModal = () => setIsNoteOpen(true);
  const closeNoteModal = () => setIsNoteOpen(false);

  const openWarningModal = () => setIsModalOpen(true);
  const closeWarningModal = () => setIsModalOpen(false);

  const handleConfirmNextSkill = () => {
    handleNextSkill(); // Call the next skill function
    closeWarningModal(); // Close the modal
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  useEffect(() => {
    if (Object.keys(testData).length > 0) {
      const currentSkillData = Object.values(testData)[currentSkillIndex];
      setTimeLeft(currentSkillData.duration * 60);

      const id = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0) {
            clearInterval(id);
            if (currentSkillIndex === Object.keys(testData).length - 1) {
              handleSubmit();
            } else {
              handleNextSkill();
            }
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);

      return () => clearInterval(id);
    }
  }, [currentSkillIndex, testData, handleNextSkill]);

  return (
    <div className="flex-1 flex justify-between items-center p-4 bg-green-600 shadow-md">
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
          onClick={openNoteModal}
          className="text-md font-semibold text-white cursor-pointer"
        >
          <span className="mr-2 text-sm">
            <FontAwesomeIcon icon={faPen} />
          </span>
          Take note
        </span>

        {currentSkillIndex < Object.keys(testData).length - 1 ? (
          <button
            type="button"
            onClick={openWarningModal} // Open warning modal instead of directly calling handleNextSkill
            className="cursor-pointer inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white px-4 py-2"
          >
            Next Skill
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="cursor-pointer inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white px-4 py-2"
          >
            <span className="mr-2 text-sm">
              <FontAwesomeIcon icon={faPaperPlane} />
            </span>
            Submit Test
          </button>
        )}
      </div>

      {/* Warning Modal for Next Skill */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeWarningModal}
        contentLabel="Next Skill Confirmation"
        className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-semibold mb-4">Confirm Next Skill</h2>
        <p className="text-sm text-gray-700 mb-6">
          Do you want to move to the next skill? If you proceed, your result
          will be saved for this section.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={closeWarningModal}
            className="bg-gray-200 text-gray-700 rounded-md px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmNextSkill}
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Proceed
          </button>
        </div>
      </Modal>

      {isNoteOpen && <NoteCard onClose={closeNoteModal} />}
    </div>
  );
};

export default Header;
