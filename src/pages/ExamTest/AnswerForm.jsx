import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AnswerForm = ({
  skill,
  partIndex,
  sectionIndex,
  questionIndex,
  control,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: `skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions.${questionIndex}.answers`,
    control,
  });

  return (
    <div>
      <h6 className="font-medium ">Answers</h6>
      {fields.map((answer, index) => (
        <div
          key={answer.id}
          className="mb-2 w-6/12 space-y-4 flex gap-2 justify-between"
        >
          <Controller
            name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions.${questionIndex}.answers.${index}.answerText`}
            control={control}
            rules={{ required: "Answer Text is required" }}
            render={({ field, fieldState }) => (
              <div className=" w-8/12">
                <input
                  {...field}
                  className="border p-1 w-full"
                  placeholder="Answer Text"
                />
                {fieldState.error && (
                  <p className="text-red-500">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions.${questionIndex}.answers.${index}.isCorrect`}
            control={control}
            render={({ field }) => (
              <div className="flex items-center w-3/12">
                <input type="checkbox" {...field} className="mr-2" />
                <label>Correct Answer</label>
              </div>
            )}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-500 text-white p-1 rounded w-8 h-8 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faTrash} className="text-xs" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ answerText: "", isCorrect: false })}
        className="bg-green-500 text-white p-2 rounded"
      >
        Add Answer
      </button>
    </div>
  );
};

export default AnswerForm;
