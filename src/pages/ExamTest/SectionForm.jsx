import React from "react";
import { useFieldArray, Controller, useWatch } from "react-hook-form";
import QuestionForm from "./QuestionForm";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../redux/testExam/TestSlice";

const sectionTypesBySkill = {
  Reading: [
    { value: 1, label: "Multiple Choice Questions" },
    { value: 2, label: "True/False/Not Given Questions" },
    { value: 3, label: "Yes/No/Not Given Questions" },

    { value: 4, label: "Matching Headings" },
    { value: 5, label: "Matching Information " },
    { value: 6, label: "Matching Features" },

    { value: 7, label: "Matching Sentence Endings" },
    { value: 8, label: "Sentence Completion" },
    { value: 9, label: "Short-answer Questions" },
    { value: 10, label: "Diagram Completion" },
    { value: 11, label: "Summary Completion" },
  ],
  Listening: [
    { value: 1, label: "Table/Note Completion" },
    { value: 2, label: "Sentence Completion" },
    { value: 3, label: "Summary Completion" },
    { value: 4, label: "Labeling a Diagram/Map/Plan with filling" },
    { value: 6, label: "Matching Questions" },
    { value: 7, label: "Short Answer Questions" },
    { value: 8, label: "Multiple Choice Questions" },
  ],
  Writing: [
    { value: 1, label: "Task 1" },
    { value: 2, label: "Task 2" },
  ],
  Speaking: [
    { value: 1, label: "Part 1" },
    { value: 2, label: "Part 2" },
    { value: 3, label: "Part 3" },
  ],
};

const SectionForm = ({ skill, partIndex, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: `skills.${skill}.parts.${partIndex}.sections`,
    control,
  });
  const sectionTypes = sectionTypesBySkill[skill] || [];

  const sectionTypeValues = useWatch({
    name: `skills.${skill}.parts.${partIndex}.sections`,
    control,
  });
  const dispatch = useDispatch();

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const resultAction = await dispatch(uploadFile(file));
        if (uploadFile.fulfilled.match(resultAction)) {
          const fileUrl = resultAction.payload.fileUrl;

          field.onChange(fileUrl);
        } else {
          console.error("Upload failed:", resultAction.error.message);
        }
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

            {(skill === "Reading" || skill === "Listening") && (
              <div>
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
                        disabled={!!sectionType} // Disable the dropdown if sectionType is already selected
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

                {((skill === "Listening" &&
                  (sectionType === 4 || sectionType === 5)) ||
                  (skill === "Writing" && sectionType === 1)) && (
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
                          onChange={(e) => handleFileChange(e, field)}
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
                sectionType={0}
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
            sectionType: 0,
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
