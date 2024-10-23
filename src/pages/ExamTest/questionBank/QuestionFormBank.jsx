import { useForm, useFieldArray, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addQuestions,
  updateQuestion,
} from "../../../redux/testExam/TestSlice";
import { useDispatch } from "react-redux";

const QuestionFormBank = ({ setIsModalOpen, question }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      questions: question
        ? [question]
        : [
            {
              questionName: "",
              answers: [],
              skill: 1,
              questionType: 1,
              part: 1,
            },
          ],
    },
  });

  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({
    name: "questions",
    control,
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const payload = data.questions.map((question) => {
      // If updating, include questionId and answerId
      const updatedQuestion = {
        questionName: question.questionName,
        questionType: question.questionType,
        skill: question.skill,
        part: question.part,
        answers: question.answers.map((answer) => ({
          answerText: answer.answerText,
          isCorrect: Number(answer.isCorrect), // Convert to number
        })),
      };

      if (question.id) {
        return {
          ...updatedQuestion,
          id: question.id,
          answers: question.answers.map((answer) => ({
            ...answer,
            answerId: answer.id, // Include answerId if updating
          })),
        };
      }

      return updatedQuestion; // No questionId or answerId for adding
    });

    if (question) {
      dispatch(
        updateQuestion({ id: question.id, updatedQuestion: payload[0] })
      ); // Send the correct payload structure for updating
    } else {
      dispatch(addQuestions(payload)); // Send the correct payload structure for adding
    }
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white h-[550px] rounded-lg shadow-lg p-4 w-[650px] overflow-y-auto">
        <div className="flex justify-between items-center p-2">
          <h3 className="text-xl font-bold ">Questions from Bank</h3>
          <button
            className="border border-red-400"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="mb-4 border p-4 rounded space-y-3"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">Question {index + 1}</p>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  <FontAwesomeIcon icon={faMultiply} />
                </button>
              </div>

              <label className="block mb-1">Question Name</label>
              <Controller
                name={`questions.${index}.questionName`}
                control={control}
                defaultValue={question.questionName || ""}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border p-1 w-full mb-2"
                    placeholder="Enter question name"
                    required
                  />
                )}
              />

              <div className="flex gap-10">
                <div>
                  <label className="block mb-1">Skill</label>
                  <Controller
                    name={`questions.${index}.skill`}
                    control={control}
                    defaultValue={question.skill || 1}
                    render={({ field }) => (
                      <select {...field} className="border p-1 mb-2 w-full">
                        <option value="1">Skill 1</option>
                        <option value="2">Skill 2</option>
                        <option value="3">Skill 3</option>
                        <option value="4">Skill 4</option>
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block mb-1">Question Type</label>
                  <Controller
                    name={`questions.${index}.questionType`}
                    control={control}
                    defaultValue={question.questionType || 1}
                    render={({ field }) => (
                      <select {...field} className="border p-1 mb-2 w-full">
                        <option value="1">Question Type 1</option>
                        <option value="2">Question Type 2</option>
                        <option value="3">Question Type 3</option>
                        <option value="4">Question Type 4</option>
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block mb-1">Part</label>
                  <Controller
                    name={`questions.${index}.part`}
                    control={control}
                    defaultValue={question.part || 1}
                    render={({ field }) => (
                      <select {...field} className="border p-1 mb-2 w-full">
                        <option value="1">Part 1</option>
                        <option value="2">Part 2</option>
                        <option value="3">Part 3</option>
                        <option value="4">Part 4</option>
                      </select>
                    )}
                  />
                </div>
              </div>

              <AnswerForm control={control} questionIndex={index} />
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() =>
                append({
                  questionName: "",
                  answers: [],
                  skill: 1,
                  questionType: 1,
                  part: 1,
                })
              }
              className="bg-green-500 text-white p-2 rounded"
            >
              Add Question
              <FontAwesomeIcon icon={faPlus} className="ml-2" />
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Component quản lý câu trả lời
const AnswerForm = ({ control, questionIndex }) => {
  const {
    fields: answerFields,
    append,
    remove,
  } = useFieldArray({
    name: `questions.${questionIndex}.answers`,
    control,
  });

  return (
    <div className="mt-4">
      <h4 className="font-bold">Answers</h4>
      {answerFields.map((answer, index) => (
        <div key={answer.id} className="flex items-center mb-2">
          <label className="block mb-1">Answer Text</label>
          <Controller
            name={`questions.${questionIndex}.answers.${index}.answerText`}
            control={control}
            defaultValue={answer.answerText || ""}
            render={({ field }) => (
              <input
                {...field}
                className="border p-1 w-full mr-2"
                placeholder="Enter answer text"
                required
              />
            )}
          />
          <Controller
            name={`questions.${questionIndex}.answers.${index}.isCorrect`}
            control={control}
            defaultValue={answer.isCorrect || 0}
            render={({ field }) => (
              <select
                {...field}
                className="border p-1 mb-2"
                onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
              >
                <option value={0}>Incorrect</option>
                <option value={1}>Correct</option>
              </select>
            )}
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-500 text-white p-1 rounded"
          >
            <FontAwesomeIcon icon={faMultiply} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ answerText: "", isCorrect: 0 })}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Answer
      </button>
    </div>
  );
};

export default QuestionFormBank;
