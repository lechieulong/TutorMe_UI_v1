/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faGears,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Header = ({ setIsTimeOut }) => {
  const [timeLeft, setTimeLeft] = useState(60 * 60 * 1000);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          setIsTimeOut(true);
          return 0;
        }
        return prevTime - 1000; // Decrease by 1 second
      });
    }, 1000);

    return () => clearInterval(timerInterval); // Clean up on component unmount
  }, []);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (60 * 1000));
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  return (
    <div className=" left-0  right-0 flex justify-between items-center p-4  fixed bg-green-400 shadow-md ">
      <p className="text-lg font-semibold">Logo</p>
      <p className="text-lg font-semibold items-center">
        <span className="mr-2 text-white">
          <FontAwesomeIcon icon={faClock} />
        </span>
        <span className="text-sm mr-4 ">Time left </span>{" "}
        <span className="text-xl text-white"> {formatTime(timeLeft)} </span>
        <span className="text-sm ml-2">minutes</span>
      </p>
      <div className="flex gap-8 justify-center items-center ">
        <a
          href="/"
          className="text-md font-semibold  border-b text-white cursor-pointer"
        >
          <span className="mr-2 text-sm">
            <FontAwesomeIcon icon={faGears} />
          </span>
          Setting
        </a>
        <button
          type="button"
          className=" cursor-pointer inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent 
            "
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
