import MainLayout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faBookOpen,
  faPen,
  faMicrophone,
  faCalendarAlt,
  faClock,
  faPlay,
  faArrowLeft,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getTest, getSkills } from "../../redux/testExam/TestSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CreateTest from "../ExamTest/CreateTest";
import TestLayout from "./TestLayout";
import { getUser } from "../../service/GetUser";
import { Roles } from "../../utils/config";
import { formatDate } from "../../utils/formatDate";
import { useLocation } from "react-router-dom";
const SkillPart = () => {
  const [test, setTest] = useState(null);
  const [skills, setSkills] = useState([]);
  const [createSkill, setCreateSkill] = useState(false);
  const [user, setUser] = useState(null);
  const [takeFullTest, setTakeFullTest] = useState(false);
  const [disableFinalTest, setDisableFinalTest] = useState(false);

  const location = useLocation();
  const { categories } = location.state || {}; // Access categories from state
  console.log(categories);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { testId } = useParams();

  const skillTypeMap = {
    0: { name: "Reading", icon: faBookOpen },
    1: { name: "Listening", icon: faHeadphones },
    2: { name: "Writing", icon: faPen },
    3: { name: "Speaking", icon: faMicrophone },
  };

  // Function to handle going back
  const handleGoBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getTest(testId));
      if (result.payload) {
        setTest(result.payload);
      }
    };

    const userFromToken = getUser();
    setUser(userFromToken);
    const fetchSkills = async () => {
      const result = await dispatch(getSkills(testId));
      if (result.payload) {
        setSkills(result.payload);
      }
    };

    fetchData();
    fetchSkills();
  }, [dispatch, testId]);

  const handleTakeTest = (id) => {
    if (user) {
      navigate(`/test/${testId}/settings/${id}`);
    } else {
      navigate(`/login`);
    }
  };

  const handleTakeFullTest = () => {
    if (disableFinalTest) {
      toast.warning("Test not available  now");
      return;
    }
    if (user) {
      setTakeFullTest(true);
    } else {
      navigate(`/login`);
    }
  };

  useEffect(() => {
    if (test) {
      const startTime = new Date(test.startTime); // Convert startTime to a Date object
      const currentTime = new Date(); // Get the current date and time

      // Ensure both dates are valid
      if (!isNaN(startTime) && !isNaN(currentTime)) {
        setDisableFinalTest(test.testType === 2 && startTime > currentTime);
      }
    }
  }, [test]);

  const isButtonDisabled = disableFinalTest; // Use the state value directly

  return (
    <>
      {takeFullTest ? (
        <TestLayout fullTestId={testId} />
      ) : (
        <MainLayout>
          {test ? (
            <>
              <div className="py-10 px-20">
                <button
                  onClick={handleGoBack}
                  className="   text-gray-800 mb-2 rounded-lg flex items-center border-gray-200 justify-center gap-2 transition-all duration-300 ease-in-out transform hover:border-green-600 hover:text-gray-700 hover:scale-105 focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={faChevronCircleLeft}
                    className="mr-2 text-green-700 text-2xl"
                  />
                  back
                </button>
                <div className="bg-white  border rounded-xl h-56 shadow-sm sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <div className="shrink-0 relative w-full rounded-t-xl overflow-hidden sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
                    <img
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                      alt="Card Image"
                    />
                  </div>
                  <div className="flex flex-col gap-4 p-4 sm:p-7 w-full">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                      <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                      {test.testName}
                    </h3>
                    <p className="mt-1 text-gray-500 dark:text-neutral-400 flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="text-gray-600 dark:text-neutral-300 text-lg"
                      />
                      <span className="text-gray-800 dark:text-neutral-200">
                        Start Time:
                      </span>
                      <span className="text-gray-600 text-sm dark:text-neutral-400">
                        {formatDate(test.startTime)}
                      </span>
                    </p>
                    <p className="mt-1 text-gray-500 dark:text-neutral-400 flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-gray-600 dark:text-neutral-300 text-lg"
                      />
                      <span className="text-gray-800 dark:text-neutral-200">
                        End Time:
                      </span>
                      <span className="text-gray-600 text-sm dark:text-neutral-400">
                        {formatDate(test.endTime)}
                      </span>
                    </p>
                  </div>
                </div>

                {skills.length === 0 ? (
                  <>
                    {createSkill ? (
                      <CreateTest testId={testId} skills={categories} />
                    ) : (
                      <>
                        {(user?.role?.includes(Roles.ADMIN) &&
                          test.testType == 3) ||
                        (user?.role?.includes(Roles.TEACHER) &&
                          test.testType != 3) ? (
                          <button
                            className="p-2 bg-red-100"
                            onClick={() => setCreateSkill(true)}
                          >
                            Create Skill
                          </button>
                        ) : (
                          <p>No skills are available now</p>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <div className="mt-2 border-gray-400 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex gap-4 justify-center mt-6">
                      {skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="p-4 h-[300px] md:p-5 flex flex-col gap-6 items-center justify-center border shadow-lg rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
                          style={{ flex: "1 1 300px" }}
                        >
                          <p className="text-2xl text-green-800">
                            <FontAwesomeIcon
                              icon={skillTypeMap[skill.type]?.icon}
                            />
                          </p>
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {skillTypeMap[skill.type]?.name}
                          </h3>
                          {(test.testType == 1 || test.testType == 3) && (
                            <button
                              onClick={() => handleTakeTest(skill.id)}
                              className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              <FontAwesomeIcon icon={faPlay} className="mr-2" />
                              Start
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {test.testType != 1 && (
                      <div className="border text-gray-700 shadow-md border-gray-300 p-6 flex justify-between mt-2 rounded-xl items-center">
                        <button
                          className={`text-2xl p-4 font-semibold rounded-lg ${
                            isButtonDisabled
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-green-500 text-white border-green-500 hover:bg-green-600"
                          }`}
                          onClick={handleTakeFullTest}
                          disabled={isButtonDisabled} // Ensure button is disabled when needed
                        >
                          Take Full Test
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </MainLayout>
      )}
    </>
  );
};

export default SkillPart;
