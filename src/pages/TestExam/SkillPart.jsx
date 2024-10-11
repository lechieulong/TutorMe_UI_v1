import MainLayout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faBookOpen,
  faPen,
  faMicrophone,
  faCalendarAlt,
  faUser,
  faPlay,
  faThunderstorm,
} from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { useEffect } from "react";
import { getUser } from "../../service/GetUser";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

const SkillPart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { testId } = useParams();

  const user = getUser();

  const iconMap = {
    headPhone: faHeadphones,
    book: faBookOpen,
    pen: faPen,
    microphone: faMicrophone,
  };
  const skillParts = [
    {
      id: 0,
      icon: "book",
      name: "Reading",
      scorePercent: 5.5,
    },
    {
      id: 1,
      icon: "headPhone",
      name: "Listening",
      scorePercent: 7,
    },
    {
      id: 2,
      icon: "pen",
      name: "Writing",
      scorePercent: 8,
    },
    {
      id: 3,
      icon: "microphone",
      name: "Speaking",
      scorePercent: 6,
    },
  ];

  useEffect(() => {
    // const test = dispatch(getTestDetail(testId));
    // const skillDatas = dispatch(getSkillDatas(testId));
    console.log("hello");
  }, []);

  const handleTakeTest = (id) => {
    // navigate(`/test/${id}/settings`);
    navigate(`/test/1/settings`);
  };
  const handleTakeFullTest = (id) => {
    console.log("full test");
    //  navigate(`/testing/${testId}`);
    navigate(`/testing/1`);
  };

  return (
    <>
      <MainLayout>
        <Link to="create-test">
          <p>Create Test</p>
        </Link>

        {/* Name Test */}
        <div className="bg-white mt-10 border rounded-xl h-56 shadow-sm sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="shrink-0 relative w-full rounded-t-xl overflow-hidden sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
            <img
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
              alt="Card Image"
            />
          </div>
          <div className="flex flex-col gap-4 p-4 sm:p-7 w-full">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <span className="mr-5">
                {" "}
                <FontAwesomeIcon icon={faBookOpen} className="mr-2" />{" "}
              </span>
              Mock Test 2024 Simulator With Hydra
            </h3>
            <p className="mt-1 text-gray-500 dark:text-neutral-400 flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="text-gray-600 dark:text-neutral-300 text-lg"
              />
              <span className=" text-gray-800 dark:text-neutral-200">
                Due Date:
              </span>
              <span className="text-gray-600 text-sm  dark:text-neutral-400">
                31st August 2024, 3:30 PM
              </span>
            </p>

            <p className="mt-1 text-gray-500 dark:text-neutral-400 flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span className="mr-2">Created by: </span>{" "}
              <i className="text-red-800"> Hydra</i>
            </p>
          </div>
        </div>

        {/* Skill Part  */}
        <div className=" mt-2 border-gray-400  shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="flex gap-4 justify-center mt-6">
            {/* fullPart */}

            {skillParts.map((skill, index) => (
              <div
                key={index}
                className="p-4 h-[300px] md:p-5 flex flex-col gap-6 items-center justify-center border shadow-lg rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
                style={{ flex: "1 1 300px" }} // Ensures cards are responsive and grow/shrink as needed
              >
                <p className="text-2xl text-green-800">
                  <FontAwesomeIcon icon={iconMap[skill.icon]} />
                </p>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {skill.name}
                </h3>
                <button
                  onClick={() => handleTakeTest(skill.id)} // Gửi id vào hàm
                  className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  <FontAwesomeIcon icon={faPlay} className="mr-2" />
                  Start
                </button>
              </div>
            ))}
          </div>

          <div className="border  text-gray-700 shadow-md  border-gray-300 p-2 flex justify-between mt-2 rounded-xl items-center">
            <div className="flex  items-center justify-start gap-9">
              <button
                className="text-2xl font-semibold border-green-500"
                onClick={() => handleTakeFullTest(testId)} // Gửi id vào hàm
              >
                <span>
                  <FontAwesomeIcon icon={faThunderstorm} className="mr-2 " />
                </span>
                Take Full Test
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default SkillPart;
