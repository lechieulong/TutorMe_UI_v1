import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faInfoCircle,
  faClock,
  faCalendarAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const TestInfoCard = ({ testInfo, setShowTestFormDetail }) => {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl border border-gray-200 transition duration-300 hover:shadow-2xl hover:border-gray-300">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
        <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-green-800" />{" "}
        Test Information
      </h2>

      <div className="space-y-4">
        <p className="text-gray-700 flex items-center">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="mr-2 text-green-800"
          />
          <p className="text-gray-900 font-bold">Test Name:</p>{" "}
          <span className="ml-6">{testInfo.testName || "N/A"}</span>
        </p>

        <p className="text-gray-700 flex items-center">
          <FontAwesomeIcon icon={faClock} className="mr-2 text-green-800" />
          <strong className="text-gray-900">Start Time:</strong>{" "}
          <span className="ml-6">{testInfo.startTime || "N/A"}</span>
        </p>

        <p className="text-gray-700 flex items-center">
          <FontAwesomeIcon icon={faClock} className="mr-2 text-green-800" />
          <strong className="text-gray-900">End Time:</strong>{" "}
          <span className="ml-6">{testInfo.endTime || "N/A"}</span>
        </p>
      </div>
      <div className="flex space-x-4 mt-6">
        <button
          type="button"
          onClick={() => setShowTestFormDetail(true)}
          className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FontAwesomeIcon icon={faPlusCircle} className="mr-2 text-lg" />
          Create Skill
        </button>
        <button
          type="button"
          className="flex items-center justify-center bg-red-50 text-red-600 font-medium py-3 px-6 rounded-lg shadow-md hover:bg-red-100 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => window.location.reload()}
        >
          <FontAwesomeIcon icon={faTimesCircle} className="mr-2 text-lg" />
          Close
        </button>
      </div>
    </div>
  );
};

export default TestInfoCard;
