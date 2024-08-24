import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faGears,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ timeLeft }) => {
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (60 * 1000));
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  return (
    <div className=" left-0  right-0 flex justify-between items-center p-4  fixed bg-green-300 shadow-md ">
      <p className="text-lg font-semibold">Logo</p>
      <p className="text-lg font-semibold items-center">
        <span className="mr-2">
          <FontAwesomeIcon icon={faClock} />
        </span>
        <span className="text-sm mr-4">Time left </span> {formatTime(timeLeft)}{" "}
        <span className="text-sm ml-2">minutes</span>
      </p>
      <div className="flex gap-8 justify-center items-center">
        <p className="text-md font-semibold">
          <span className="mr-2 text-sm">
            <FontAwesomeIcon icon={faGears} />
          </span>
          Setting
        </p>
        <button
          type="button"
          class="  inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          <span className="mr-2 text-sm">
            <FontAwesomeIcon icon={faPaperPlane} />
          </span>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Header;
