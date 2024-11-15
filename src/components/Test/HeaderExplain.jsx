import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HeaderExplain = ({ testData, currentSkillIndex, handleNextSkill }) => {
  const handleConfirmNextSkill = () => {
    handleNextSkill();
  };

  return (
    <div className="flex justify-between items-center p-4 bg-green-600 shadow-lg rounded-lg">
      <Link to={"/"}>
        <p className="text-lg font-semibold text-white flex items-center gap-2">
          IELTS <FontAwesomeIcon icon={faLanguage} />
        </p>
      </Link>

      <div className="text-lg font-semibold text-white flex items-center gap-2">
        <h3>Explaination</h3>
      </div>
      <div className="flex gap-8 items-center">
        <button
          type="button"
          onClick={handleConfirmNextSkill}
          className="border border-white bg-black hover:bg-green-800 text-white font-medium rounded-lg px-4 py-2"
        >
          Next Skill
        </button>
      </div>
    </div>
  );
};

export default HeaderExplain;
