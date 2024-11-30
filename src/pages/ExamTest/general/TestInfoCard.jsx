import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const TestInfoCard = ({ testInfo, setShowTestFormDetail }) => {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Test Information
      </h2>

      <p className="mb-2 text-gray-700">
        <strong className="text-gray-900">Test Name:</strong>{" "}
        {testInfo.testName || "N/A"}
      </p>

      <p className="mb-2 text-gray-700">
        <strong className="text-gray-900">Start Time:</strong>{" "}
        {testInfo.startTime || "N/A"}
      </p>

      <p className="mb-4 text-gray-700">
        <strong className="text-gray-900">End Time:</strong>{" "}
        {testInfo.endTime || "N/A"}
      </p>

      <button
        type="button"
        onClick={() => setShowTestFormDetail(true)}
        className="mt-4 flex items-center bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
        Create Skill
      </button>
    </div>
  );
};

export default TestInfoCard;
