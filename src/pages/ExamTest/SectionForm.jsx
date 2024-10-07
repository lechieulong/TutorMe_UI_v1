import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import QuestionForm from "./QuestionForm";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const sectionTypes = [
  { value: 1, label: "Heading Matching" },
  { value: 2, label: "Filling" },
  { value: 3, label: "Multiple Choice" },
  { value: 4, label: "Single Choice" },
  { value: 5, label: "True/False" },
];

const SectionForm = ({ skill, partIndex, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: `skills.${skill}.parts.${partIndex}.sections`,
    control,
  });

  return (
    <div>
      <h4 className="font-medium">Sections</h4>
      {fields.map((section, index) => (
        <div key={section.id} className="mb-4 space-y-4 border p-4 rounded">
          <div className="flex justify-between items-center ">
            <h5 className="font-extrabold">Section {index + 1}</h5>{" "}
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 text-white p-1 rounded mt-2 w-10"
            >
              <FontAwesomeIcon icon={faMultiply} />
            </button>
          </div>
          {/* Section Type Dropdown */}
          <Controller
            name={`skills.${skill}.parts.${partIndex}.sections.${index}.sectionType`}
            control={control}
            rules={{ required: "Section Type is required" }} // Validation for sectionType
            render={({ field, fieldState }) => (
              <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Section Type
                </label>
                <select {...field} className="border p-1 w-full">
                  <option value="">Select Section Type</option>
                  {sectionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {fieldState.error && (
                  <p className="text-red-500">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
          {/* Section Guide Input */}
          <Controller
            name={`skills.${skill}.parts.${partIndex}.sections.${index}.sectionGuide`}
            control={control}
            rules={{ required: "Section Guide is required" }} // Validation for sectionGuide
            render={({ field, fieldState }) => (
              <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Section Guide
                </label>
                <input
                  {...field}
                  className="border p-1 w-full"
                  placeholder="Section Guide"
                />
                {fieldState.error && (
                  <p className="text-red-500">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
          {/* Question Form */}
          <QuestionForm
            skill={skill}
            partIndex={partIndex}
            sectionIndex={index}
            control={control}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          append({ sectionGuide: "", sectionType: "", questions: [] })
        } // Initialize sectionType
        className="bg-green-500 text-white p-2 rounded"
      >
        Add Section
      </button>
    </div>
  );
};

export default SectionForm;
