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
  sectionType,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: `skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions.${questionIndex}.answers`,
    control,
  });

  return (
    <div>
      <h6 className="font-medium">
        {sectionType === 4 ||
        sectionType === 5 ||
        sectionType === 6 ||
        sectionType === 7 ||
        sectionType === 8
          ? "Matching"
          : sectionType === 2 || sectionType === 3
          ? "True/False"
          : "Answer"}
      </h6>
      {fields.map((answer, index) => (
        <div
          key={answer.id}
          className="mb-2 flex gap-2 items-center justify-between"
        >
          <Controller
            name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions.${questionIndex}.answers.${index}.answerText`}
            control={control}
            rules={{ required: "Answer Text is required" }}
            render={({ field, fieldState }) => (
              <div className="w-8/12">
                <input
                  {...field}
                  className="border p-1 w-full"
                  placeholder={
                    sectionType === 4 ||
                    sectionType === 5 ||
                    sectionType === 6 ||
                    sectionType === 7 ||
                    sectionType === 8
                      ? "Matching"
                      : sectionType === 2 || sectionType === 3
                      ? "True or False answer"
                      : "Answer text"
                  }
                />
                {fieldState.error && (
                  <p className="text-red-500">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
          {sectionType !== 6 &&
            sectionType !== 4 &&
            sectionType !== 5 &&
            sectionType !== 7 &&
            sectionType !== 8 && (
              <>
                {sectionType === 2 || sectionType === 3 ? (
                  // True/False Buttons
                  <Controller
                    name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions.${questionIndex}.answers.${index}.isCorrect`}
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center w-3/12">
                        <button
                          type="button"
                          onClick={() => field.onChange(1)} // Set to 1 (True)
                          className={`mr-2 p-1 rounded ${
                            field.value === 1 ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          True
                        </button>
                        <button
                          type="button"
                          onClick={() => field.onChange(0)} // Set to 0 (False)
                          className={`p-1 rounded ${
                            field.value === 0 ? "bg-red-500" : "bg-gray-300"
                          }`}
                        >
                          False
                        </button>
                      </div>
                    )}
                  />
                ) : (
                  // Regular Correct Answer Checkbox
                  <Controller
                    name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions.${questionIndex}.answers.${index}.isCorrect`}
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center w-3/12">
                        <input
                          type="checkbox"
                          checked={field.value === 1} // checked if value is 1 (true)
                          onChange={(e) =>
                            field.onChange(e.target.checked ? 1 : 0)
                          } // 1 if checked, 0 if not
                          className="mr-2"
                        />
                        <label>Correct Answer</label>
                      </div>
                    )}
                  />
                )}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white p-1 rounded w-8 h-8 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-xs" />
                </button>
              </>
            )}
        </div>
      ))}
      {sectionType !== 6 &&
        sectionType !== 4 &&
        sectionType !== 5 &&
        sectionType !== 7 &&
        sectionType !== 8 && (
          <button
            type="button"
            onClick={() => append({ answerText: "", isCorrect: 0 })} // Default value is 0 (false)
            className="bg-green-500 text-white p-2 rounded"
          >
            Add Answer
          </button>
        )}
    </div>
  );
};

export default AnswerForm;
