import React from "react";
import { useFieldArray, Controller } from "react-hook-form";

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
      <h6 className="font-medium">Answers</h6>
      {fields.map((answer, index) => (
        <div key={answer.id} className="mb-2">
          <Controller
            name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions.${questionIndex}.answers.${index}.answerText`}
            control={control}
            rules={{ required: "Answer Text is required" }} // Validation cho answerText
            render={({ field, fieldState }) => (
              <div className="mb-2">
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
              <div className="flex items-center">
                <input type="checkbox" {...field} className="mr-2" />
                <label>Correct Answer</label>
              </div>
            )}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-500 text-white p-1 rounded mt-2"
          >
            Remove Answer
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
