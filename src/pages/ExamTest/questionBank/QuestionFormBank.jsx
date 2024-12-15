import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  faLeftLong,
  faPaperPlane,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addQuestions,
  updateQuestion,
} from "../../../redux/testExam/TestSlice";
import { useDispatch } from "react-redux";

const QuestionFormBank = ({ setIsModalOpen, editQuestion }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questionName: "",
      skillType: 0,
      questionType: 1,
      part: 0,
      answers: [],
    },
    // Validate answers: at least 1 answer must be filled in
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });

  const skillType = watch("skillType");
  const questionType = watch("questionType");

  useEffect(() => {
    if (editQuestion) {
      console.log(editQuestion);

      // Set scalar fields
      setValue("questionName", editQuestion.questionName);
      setValue("skillType", editQuestion.skill);
      setValue("questionType", editQuestion.questionType);
      setValue("part", editQuestion.partNumber);

      // Convert `id` to `answerId` in answers and update the form
      if (editQuestion.answers && editQuestion.answers.length > 0) {
        const updatedAnswers = editQuestion.answers.map((answer) => ({
          answerId: answer.id, // Map `id` to `answerId`
          answerText: answer.answerText,
          isCorrect: answer.isCorrect,
        }));

        // Clear existing answers and append the updated ones
        remove(); // Clear the field array
        updatedAnswers.forEach((answer) => append(answer)); // Append each updated answer
      }
    }
  }, [editQuestion, setValue, append, remove]);

  const skillTypes = [
    { value: 0, label: "Reading" },
    { value: 1, label: "Listening" },
    { value: 2, label: "Writing" },
    { value: 3, label: "Speaking" },
  ];

  const questionTypes = {
    0: [1, 2, 3],
    1: [8, 5],
    2: [0],
    3: [0],
  };

  const parts = {
    0: [1, 2, 3],
    1: [1, 2, 3, 4],
    2: [1, 2],
    3: [1, 2, 3],
  };

  const onSubmit = (data) => {
    console.log(data);

    if (editQuestion) {
      dispatch(
        updateQuestion({
          id: editQuestion.id,
          updatedQuestion: data,
        })
      );
    } else {
      dispatch(addQuestions(data));
    }
    setIsModalOpen(false);
  };

  const handleSkillTypeChange = (value) => {
    reset({
      questionName: "",
      skillType: value,
      questionType: questionTypes[value]?.[0] || 0,
      part: parts[value]?.[0] || 1,
      answers: [],
    });
  };

  const handleQuestionTypeChange = (value) => {
    reset({
      questionName: "",
      skillType: skillType,
      questionType: value,
      part: parts[skillType]?.[0] || 1,
      answers: [],
    });
  };

  return (
    <>
      <button
        className="border border-red-300 mb-2"
        type="button"
        onClick={() => setIsModalOpen(false)}
      >
        Back question banks
        <span className="ml-2">
          <FontAwesomeIcon icon={faLeftLong} />
        </span>
      </button>

      <div className="space-y-4 border border-gray-500 p-4">
        <h3 className="text-center font-bold text-xl">New Question Form</h3>

        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
          {/* Skill Type Field */}
          <div>
            <label className="block text-sm font-semibold">Skill Type:</label>
            <Controller
              name="skillType"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                    handleSkillTypeChange(Number(e.target.value));
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {skillTypes.map((skill) => (
                    <option key={skill.value} value={skill.value}>
                      {skill.label}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* Question Type Selection */}
          <div>
            <label className="block text-sm font-semibold">
              Question Type:
            </label>
            <Controller
              name="questionType"
              control={control}
              render={({ field }) => (
                <select
                  onChange={(e) => {
                    const selectedValue = Number(e.target.value);
                    field.onChange(selectedValue); // Ensure the value passed to the form is a number
                    handleQuestionTypeChange(selectedValue); // Call the change handler with the number
                  }}
                  value={field.value} // Ensure the value is correctly bound as a number
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {questionTypes[skillType]?.map((type) => (
                    <option key={type} value={type}>
                      {type === 0 && "Default"}
                      {(type === 1 || type === 8) && "Multiple Choice"}
                      {type === 2 && "True/False"}
                      {type === 3 && "Not Given"}
                      {type === 5 && "Single Choice"}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* Part Selection */}
          <div>
            <label className="block text-sm font-semibold">Part:</label>
            <Controller
              name="part"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {parts[skillType]?.map((part) => (
                    <option key={part} value={part}>
                      Part {part}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {(questionType == 1 ||
            questionType == 8 ||
            questionType == 5 ||
            skillType == 2 ||
            skillType == 3) && (
            <div>
              <label className="block text-sm font-semibold">
                Question name:
              </label>
              <Controller
                name="questionName"
                control={control}
                rules={{ required: "Question name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter the question name"
                  />
                )}
              />
              {errors.questionName && (
                <p className="text-red-500 text-sm">
                  {errors.questionName.message}
                </p>
              )}
            </div>
          )}

          {(questionType == 2 || questionType == 3) && (
            <div>
              <label className="block text-sm font-semibold">Answer:</label>
              <Controller
                name="answers[0].answerText"
                control={control}
                rules={{ required: "Answer text is required" }}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter the answer"
                    />
                    {errors.answers?.[index]?.answerText && (
                      <p className="text-red-500 text-sm">
                        {errors.answers[index].answerText.message}
                      </p>
                    )}
                  </>
                )}
              />
              <Controller
                name="answers[0].isCorrect"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || 0} // Ensure value is set to 0 if undefined
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2"
                  >
                    <option value={1}>True</option>
                    <option value={0}>False</option>
                    {questionType == 3 && <option value={2}>Not Given</option>}
                  </select>
                )}
              />
            </div>
          )}

          {(questionType == 1 || questionType == 8) && (
            <div>
              <label className="block text-sm font-semibold">Answers:</label>
              {fields.map((item, index) => (
                <div key={item.id} className="flex space-x-2 items-center">
                  <Controller
                    name={`answers[${index}].answerText`}
                    control={control}
                    rules={{ required: "Answer text is required" }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Enter answer text"
                        />
                        {errors.answers?.[index]?.answerText && (
                          <p className="text-red-500 text-sm">
                            {errors.answers[index].answerText.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    name={`answers[${index}].isCorrect`}
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="px-2 py-1 border border-gray-300 rounded-lg"
                      >
                        <option value={1}>Correct</option>
                        <option value={0}>Incorrect</option>
                      </select>
                    )}
                  />
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => remove(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={() => append({ answerText: "", isCorrect: 0 })}
              >
                Add Answer <FontAwesomeIcon icon={faPlus} className="ml-2" />
              </button>
            </div>
          )}

          {questionType == 5 && (
            <div>
              <label className="block text-sm font-semibold">Answers:</label>
              {fields.map((item, index) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Controller
                    name={`answers[${index}].answerText`}
                    control={control}
                    rules={{ required: "Answer text is required" }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Enter answer text"
                        />
                        {errors.answers?.[index]?.answerText && (
                          <p className="text-red-500 text-sm">
                            {errors.answers[index].answerText.message}
                          </p>
                        )}
                      </>
                    )}
                  />

                  <Controller
                    name={`answers[${index}].isCorrect`}
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          {...field}
                          value={1}
                          checked={field.value === 1}
                          onChange={() => {
                            // Set the selected answer as correct
                            field.onChange(1);
                            // Set other answers to incorrect
                            for (let i = 0; i < fields.length; i++) {
                              if (i !== index) {
                                setValue(`answers[${i}].isCorrect`, 0);
                              }
                            }
                          }}
                          className="form-radio"
                        />
                        <span>Correct</span>
                      </label>
                    )}
                  />

                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => remove(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={() => append({ answerText: "", isCorrect: 0 })}
              >
                Add Answer <FontAwesomeIcon icon={faPlus} className="ml-2" />
              </button>
            </div>
          )}
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 bg-gray-400 text-white rounded-lg"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleSubmit(onSubmit)}
          >
            Submit <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
          </button>
        </div>
      </div>
    </>
  );
};

export default QuestionFormBank;
