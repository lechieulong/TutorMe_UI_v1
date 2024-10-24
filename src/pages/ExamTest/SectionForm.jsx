import React from "react";
import { useFieldArray, Controller, useWatch } from "react-hook-form";
import QuestionForm from "./QuestionForm";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch } from "react-redux";
import { uploadFile } from "../../redux/testExam/TestSlice";

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

  // Watch sectionType for each section
  const sectionTypeValues = useWatch({
    name: `skills.${skill}.parts.${partIndex}.sections`,
    control,
  });
  const dispatch = useDispatch();

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uri = dispatch(uploadFile(file));
        field.onChange(uri);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div>
      <h4 className="font-medium">Sections</h4>
      {fields.map((section, index) => {
        const sectionType = sectionTypeValues?.[index]?.sectionType;

        return (
          <div key={section.id} className="mb-4 space-y-4 border p-4 rounded">
            <div className="flex justify-between items-center">
              <h5 className="font-extrabold">Section {index + 1}</h5>
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white p-1 rounded mt-2 w-10"
              >
                <FontAwesomeIcon icon={faMultiply} />
              </button>
            </div>

            {/* Conditional rendering based on skill type */}
            {(skill === "Reading" || skill === "Listening") && (
              <div>
                {/* Section Type Dropdown */}
                <Controller
                  name={`skills.${skill}.parts.${partIndex}.sections.${index}.sectionType`}
                  control={control}
                  rules={{ required: "Section Type is required" }}
                  render={({ field, fieldState }) => (
                    <div className="mb-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Section Type
                      </label>
                      <select
                        {...field}
                        className="border p-1 w-full"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={sectionType || ""}
                      >
                        <option value="">Select Section Type</option>
                        {sectionTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {fieldState.error && (
                        <p className="text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* Image upload */}
                <Controller
                  name={`skills.${skill}.parts.${partIndex}.sections.${index}.image`}
                  control={control}
                  render={({ field }) => (
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Upload Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          field.onChange(file || null); // Set to null if no file selected
                        }}
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
              </div>
            )}

            {/* Section Guide Input for all skills */}
            <Controller
              name={`skills.${skill}.parts.${partIndex}.sections.${index}.sectionGuide`}
              control={control}
              rules={{ required: "Section Guide is required" }}
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

            {/* Render QuestionForm only for Reading and Listening */}
            {skill === "Reading" || skill === "Listening" ? (
              sectionType ? (
                <QuestionForm
                  skill={skill}
                  partIndex={partIndex}
                  sectionIndex={index}
                  control={control}
                  sectionType={Number(sectionType)}
                />
              ) : (
                <p className="text-red-500">
                  Please select a Section Type before adding questions.
                </p>
              )
            ) : (
              // Always render QuestionForm for Writing and Speaking
              <QuestionForm
                skill={skill}
                partIndex={partIndex}
                sectionIndex={index}
                control={control}
                sectionType={0} // Assuming a default value for sectionType
              />
            )}
          </div>
        );
      })}
      <button
        type="button"
        onClick={() =>
          append({
            sectionGuide: "",
            sectionType: 0, // Set the default sectionType to 0
            image: null,
            questions: [],
          })
        }
        className="bg-green-500 text-white p-2 rounded"
      >
        Add Section
      </button>
    </div>
  );
};

export default SectionForm;
