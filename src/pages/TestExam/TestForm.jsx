import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormSkill from "../../components/Test/SkillForm/FormSkill";
import FilterForm from "../../components/Test/SkillForm/FilterForm";
import Header from "../../components/common/Header";
import { faPlane, faStream } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { createTest } from "../../redux/testExam/TestSlice";

const TestFormSchema = Yup.object().shape({
  testName: Yup.string().required("Test Name is required"),
  startTime: Yup.date()
    .min(new Date(), "Start time cannot be in the past")
    .required("Start time is required"),
  endTime: Yup.date()
    .min(Yup.ref("startTime"), "End time must be after start time")
    .required("End time is required"),
  classIds: Yup.array().min(1, "At least one class must be selected"),
});

const TestForm = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formData, setFormData] = useState({
    testName: "",
    classIds: [],
    startTime: new Date(),
    endTime: new Date(),
    skills: [
      {
        type: 0,
        duration: 30,
        parts: [
          {
            partNumber: 1,
            contentText: "",
            audioUrl: "",
            imageUrl: "",
            questionTypePart: [
              {
                questionGuide: "",
                questionType: 1,
                questions: [
                  {
                    questionName: "",
                    maxMarks: 1,
                    answersOptions: [
                      {
                        answerText: "",
                        isCorrect: false,
                      },
                    ],
                    answerFilling: "",
                    answerTrueFalse: 0,
                    answerMatching: [{ heading: "", matching: "" }],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 1,
        duration: 30,
        parts: [
          {
            partNumber: 1,
            skillType: 0,
            contentText: "",
            audioUrl: "",
            imageUrl: "",
            questionTypePart: [
              {
                questionGuide: "",
                questionType: 1,
                questions: [
                  {
                    questionName: "",
                    maxMarks: 1,
                    answersOptions: [
                      {
                        answerText: "",
                        isCorrect: false,
                      },
                    ],
                    answerFilling: "",
                    answerTrueFalse: 0,
                    answerMatching: [{ heading: "", matching: "" }],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 2,
        duration: 30,
        parts: [
          {
            partNumber: 1,
            skillType: 0,
            contentText: "",
            audioUrl: "",
            imageUrl: "",
            questionTypePart: [
              {
                questionGuide: "",
                questionType: 1,
                questions: [
                  {
                    questionName: "",
                    maxMarks: 1,
                    answersOptions: [
                      {
                        answerText: "",
                        isCorrect: false,
                      },
                    ],
                    answerFilling: "",
                    answerTrueFalse: 0,
                    answerMatching: [{ heading: "", matching: "" }],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 3,
        duration: 30,
        parts: [
          {
            partNumber: 1,
            skillType: 0,
            contentText: "",
            audioUrl: "",
            imageUrl: "",
            questionTypePart: [
              {
                questionGuide: "",
                questionType: 1,
                questions: [
                  {
                    questionName: "",
                    maxMarks: 1,
                    answersOptions: [
                      {
                        answerText: "",
                        isCorrect: false,
                      },
                    ],
                    answerFilling: "",
                    answerTrueFalse: 0,
                    answerMatching: [{ heading: "", matching: "" }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  const dispatch = useDispatch();

  const handleSelectSkill = (skills) => setSelectedSkills(skills);

  const handleDataChange = (updatedData) =>
    setFormData((prevData) => ({ ...prevData, ...updatedData }));

  const handleSubmit = async (values) => {
    const finalFormData = {
      ...formData,
      ...values,
    };
    console.log(finalFormData);

    try {
      dispatch(createTest(finalFormData));
      alert("Submission successful!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed.");
    }
  };

  const renderSkillForms = () =>
    selectedSkills.map((skill) => (
      <FormSkill
        skill={skill}
        key={skill}
        formData={formData}
        handleDataChange={handleDataChange}
      />
    ));

  return (
    <div className="w-full p-3 mt-16">
      <Header />
      <h3 className="mb-4 text-2xl font-semibold text-gray-500">
        <span className="mr-2">
          <FontAwesomeIcon icon={faStream} />
        </span>
        Form Create Test
      </h3>

      <Formik
        initialValues={{
          testName: formData.testName,
          duration: formData.duration,
          startTime: formData.startTime,
          endTime: formData.endTime,
          classIds: formData.classIds,
        }}
        validationSchema={TestFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="p-6 bg-green-50 shadow-lg rounded-lg border border-gray-200">
            <div className="flex gap-3 mb-6">
              <div className="w-6/12">
                <label
                  htmlFor="testName"
                  className="block font-semibold text-gray-800"
                >
                  Test Name
                </label>
                <Field
                  id="testName"
                  name="testName"
                  type="text"
                  className="mt-2 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter test name"
                />
                <ErrorMessage
                  name="testName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <FilterForm
              onSelectClass={(classes) => setFieldValue("classIds", classes)}
              onSelectSkill={handleSelectSkill}
            />

            <div className="flex gap-6">
              <div className="mb-6">
                <label
                  htmlFor="startTime"
                  className="block font-semibold text-gray-800"
                >
                  Start Time
                </label>
                <Field
                  id="startTime"
                  name="startTime"
                  type="datetime-local"
                  className="mt-2 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().slice(0, 16)} // Không cho phép chọn ngày và giờ trong quá khứ
                  onChange={(e) => setFieldValue("startTime", e.target.value)}
                />
                <ErrorMessage
                  name="startTime"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="endTime"
                  className="block font-semibold text-gray-800"
                >
                  End Time
                </label>
                <Field
                  id="endTime"
                  name="endTime"
                  type="datetime-local"
                  className="mt-2 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={
                    values.startTime
                      ? values.startTime
                      : new Date().toISOString().slice(0, 16)
                  } // Giới hạn thời gian kết thúc phải sau startTime
                  onChange={(e) => setFieldValue("endTime", e.target.value)}
                />
                <ErrorMessage
                  name="endTime"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <main className="mx-auto mt-8 rounded border-2">
              <div className="flex flex-col gap-2">{renderSkillForms()}</div>
              {selectedSkills.length > 0 && (
                <div className="p-2">
                  <button
                    type="submit"
                    className="w-28 ml-10 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faPlane} />
                    </span>
                    Submit
                  </button>
                </div>
              )}
            </main>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TestForm;
