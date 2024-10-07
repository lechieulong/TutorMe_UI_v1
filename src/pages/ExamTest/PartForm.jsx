import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import SectionForm from "./SectionForm";
import {
  faImage,
  faMusic,
  faPlusSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PartForm = ({ skill, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: `skills.${skill}.parts`,
    control,
  });

  return (
    <div>
      <h3 className="text-2xl font-semibold ">Parts</h3>
      {fields.map((part, index) => (
        <div key={part.id} className="mb-4 border p-4 rounded space-y-5">
          <div className="flex justify-between items-center gap-10">
            <h4 className="font-extrabold text-xl">Part {index + 1}</h4>
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 text-white p-1 w-12 rounded mt-2"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>

          {/* Input for Part Content (Only for Reading) */}
          {skill === "Reading" && (
            <Controller
              name={`skills.${skill}.parts.${index}.contentText`}
              control={control}
              rules={{ required: "Content Text is required" }} // Validation for contentText
              render={({ field, fieldState }) => (
                <div className="mb-2">
                  <input
                    {...field}
                    className="border p-1 w-full"
                    placeholder="Part Content"
                  />
                  {fieldState.error && (
                    <p className="text-red-500">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          )}

          {/* Input for Audio (Only for Listening) */}
          {skill === "Listening" && (
            <Controller
              name={`skills.${skill}.parts.${index}.audio`}
              control={control}
              render={({ field }) => (
                <div className="mb-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    <span className="mr-3">
                      <FontAwesomeIcon icon={faMusic} />
                    </span>
                    Audio
                  </label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => field.onChange(e.target.files[0])}
                    className="border p-1 w-full"
                  />
                  {field.value && (
                    <p className="text-gray-700">
                      Audio file: {field.value.name}
                    </p>
                  )}
                </div>
              )}
            />
          )}

          {/* Input for Image (Only for Writing) */}
          {skill === "Writing" && (
            <Controller
              name={`skills.${skill}.parts.${index}.image`}
              control={control}
              render={({ field }) => (
                <div className="mb-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    <span className="mr-3">
                      <FontAwesomeIcon icon={faImage} />
                    </span>
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files[0])}
                    className="border p-1 w-full"
                  />
                  {field.value && (
                    <p className="text-gray-700">
                      Image file: {field.value.name}
                    </p>
                  )}
                </div>
              )}
            />
          )}

          {/* Questions Field Array */}
          <h5 className="font-semibold mt-4">Questions</h5>
          <QuestionsFieldArray
            partIndex={index}
            skill={skill}
            control={control}
          />

          {/* Render SectionForm only for Reading and Listening */}
          {(skill === "Reading" || skill === "Listening") && (
            <SectionForm skill={skill} partIndex={index} control={control} />
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            contentText: "",
            audio: null,
            image: null,
            questionName: "",
            questions: [],
          })
        }
        className="border border-green-400 text-gray-600 p-2 rounded"
      >
        <span className="mr-3">
          <FontAwesomeIcon icon={faPlusSquare} />
        </span>
        Add Part
      </button>
    </div>
  );
};

// New Component for Questions
const QuestionsFieldArray = ({ partIndex, skill, control }) => {
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    name: `skills.${skill}.parts.${partIndex}.questions`,
    control,
  });

  return (
    <div className="mt-2">
      {questionFields.map((question, qIndex) => (
        <div
          key={question.id}
          className="flex items-center mb-2 border p-2 rounded"
        >
          <p className="mr-4"> {qIndex + 1}</p>
          <Controller
            name={`skills.${skill}.parts.${partIndex}.questions.${qIndex}.questionText`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="border p-1 w-full"
                placeholder="Question Text"
              />
            )}
          />
          <button
            type="button"
            onClick={() => removeQuestion(qIndex)}
            className="bg-red-500 text-white p-1 ml-2 rounded"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendQuestion({ questionText: "" })}
        className="border border-blue-400 text-gray-600 p-2 rounded mt-2"
      >
        <span className="mr-3">
          <FontAwesomeIcon icon={faPlusSquare} />
        </span>
        Add Question
      </button>
    </div>
  );
};

export default PartForm;
