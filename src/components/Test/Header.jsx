import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLanguage,
  faPaperPlane,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import NoteCard from "./NoteCard";
import { Link } from "react-router-dom";

const Header = ({
  practiceTestData,
  submitting,
  testData,
  currentSkillIndex,
  handleNextSkill,
  handleSubmit,
}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNoteModal = () => setIsNoteOpen(true);
  const closeNoteModal = () => setIsNoteOpen(false);

  const openWarningModal = () => setIsModalOpen(true);
  const closeWarningModal = () => setIsModalOpen(false);

  const handleConfirmNextSkill = () => {
    handleSubmit(); // Wait for submission to complete
    closeWarningModal(); // Close the modal after handling next skill
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
    <div className="flex justify-between  items-center p-4 bg-green-600 shadow-lg rounded-lg">
      <Link to={"/"}>
        <p className="text-lg font-semibold text-white flex items-center gap-2">
          IELTS <FontAwesomeIcon icon={faLanguage} />
        </p>
      </Link>

      {practiceTestData?.testType == 1 ? (
        <p className="text-white font-bold text-2xl">Practice Mode </p>
      ) : (
        <div>
          {" "}
          <div className="text-lg font-semibold text-customText flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            <span className="text-sm">Time left:</span>
            <span className="text-xl font-bold">{formatTime(timeLeft)}</span>
            <span className="text-sm ml-2">minutes</span>
          </div>{" "}
        </div>
      )}

      <div className="flex gap-8 items-center">
        <button
          onClick={openNoteModal}
          type="button"
          className="text-black font-semibold bg-white hover:bg-gray-200 hover:text-black text-md px-3 py-2 rounded-lg flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPen} className="text-sm" />
          Take note
        </button>

        {currentSkillIndex < Object.keys(testData).length - 1 ? (
          <button
            type="button"
            onClick={openWarningModal}
            className="border border-white bg-black hover:bg-green-800 text-white font-medium rounded-lg px-4 py-2"
            disabled={submitting}
          >
            {submitting ? (
              <span>Submitting...</span> // Show submitting message
            ) : (
              "Next Skill"
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-4 py-2 flex items-center gap-2"
            disabled={submitting} // Disable button if submitting is true
          >
            <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
            {submitting ? (
              <span>Submitting...</span> // Show submitting message
            ) : (
              "Submit Test"
            )}
          </button>
        )}
      </div>

      {/* Warning Modal for Next Skill */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeWarningModal}
        contentLabel="Next Skill Confirmation"
        className="bg-warmNeutral rounded-lg shadow-lg p-6 max-w-md mx-auto text-black"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-semibold mb-4 text-houseGreen">
          Confirm Next Skill
        </h2>
        <p className="text-sm mb-6">
          Do you want to move to the next skill? If you proceed, your result
          will be saved for this section.
        </p>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={closeWarningModal}
            className="bg-coolNeutral text-black rounded-md px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmNextSkill}
            className="bg-mainColor text-white rounded-md px-4 py-2"
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
