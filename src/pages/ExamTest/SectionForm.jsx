import React, { useRef } from "react";
import { useFieldArray, Controller, useWatch } from "react-hook-form";
import QuestionForm from "./QuestionForm";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../redux/testExam/TestSlice";

import { Editor } from "@tinymce/tinymce-react";
import { v4 as uuidv4 } from "uuid";
import Demo from "../../Demo";

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
    { value: 11, label: "Summary Completion" },
    { value: 9, label: "Short-answer Questions" },

    { value: 10, label: "Diagram Completion" },
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
const SectionForm = ({ skill, partIndex, control, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    name: `skills.${skill}.parts.${partIndex}.sections`,
    control,
  });
  const editorRef = useRef(null);

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
                        disabled={!!sectionType}
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

                {((skill === "Listening" && sectionType === 4) ||
                  (skill === "Reading" && sectionType === 6) ||
                  sectionType === 10) && (
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
                      </div>
                    )}
                  />
                )}
              </div>
            )}

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

            {skill === "Reading" || skill === "Listening" ? (
              sectionType ? (
                <>
                  {(skill === "Reading" &&
                    (sectionType == 6 ||
                      sectionType == 7 ||
                      sectionType == 8 ||
                      sectionType == 11 ||
                      sectionType == 9 ||
                      sectionType == 10)) ||
                  (skill === "Listening" &&
                    (sectionType == 1 ||
                      sectionType == 2 ||
                      sectionType == 3 ||
                      sectionType == 7 ||
                      sectionType == 4)) ? (
                    <>
                      <h3 className="text-2xl font-semibold">Questions</h3>
                      <Demo
                        skill={skill}
                        partIndex={partIndex}
                        sectionIndex={index}
                        control={control}
                        sectionType={Number(sectionType)}
                        setValue={setValue}
                      />
                    </>
                  ) : (
                    <QuestionForm
                      skill={skill}
                      partIndex={partIndex}
                      sectionIndex={index}
                      control={control}
                      sectionType={Number(sectionType)}
                    />
                  )}
                </>
              ) : (
                <p className="text-red-500">
                  Please select a Section Type before adding questions.
                </p>
              )
            ) : (
              <QuestionForm
                skill={skill}
                partIndex={partIndex}
                sectionIndex={index}
                control={control}
                sectionType={0}
              />
            )}
            {/* {sectionType &&
              ((skill === "Reading" &&
                (sectionType == 7 ||
                  sectionType == 8 ||
                  sectionType == 11 ||
                  sectionType == 9 ||
                  sectionType == 10)) ||
                (skill === "Listening" &&
                  (sectionType == 1 ||
                    sectionType == 2 ||
                    sectionType == 3 ||
                    sectionType == 4 ||
                    sectionType == 7))) && (
                <div className="">
                  <h3 className="text-xl font-bold mb-4 ">
                    Explains for section
                  </h3>
                  <Controller
                    name={`skills.${skill}.parts.${partIndex}.sections.${index}.explain`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <div className="mb-2">
                        <label className="block text-gray-700 font-medium mb-2">
                          Section Explain
                        </label>
                        <Editor
                          apiKey={import.meta.env.VITE_TINI_APIKEY}
                          onEditorChange={field.onChange} // Directly bind to field.onChange
                          value={field.value} // Bind the value to field.value
                          init={{
                            height: "300px",
                            menubar:
                              "file edit view insert format tools table help",
                            plugins: [
                              "advlist",
                              "autolink",
                              "lists",
                              "link",
                              "image",
                              "charmap",
                              "preview",
                              "anchor",
                              "searchreplace",
                              "visualblocks",
                              "code",
                              "fullscreen",
                              "insertdatetime",
                              "media",
                              "table",
                              "help",
                              "wordcount",
                            ],
                            toolbar:
                              "undo redo | blocks | bold italic underline | backcolor forecolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | removeformat | help | fullscreen | insertinput",
                            setup: (editor) => {
                              editor.ui.registry.addButton("insertinput", {
                                text: "Insert Input",
                                onAction: () => {
                                  const questionId = uuidv4(); // Generate unique questionId
                                  editor.insertContent(
                                    `<input type="text" class="editor-input" data-question-id="${questionId}" />`
                                  );
                                },
                              });
                            },
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; padding:10px; margin:0; }",
                          }}
                        />
                        {fieldState.error && (
                          <p className="text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              )} */}
          </div>
        );
      })}

      {!(skill === "Writing" && fields.length > 0) && (
        <button
          type="button"
          onClick={() =>
            append({
              sectionGuide: "",
              sectionType: 0,
              sectionContext: "",
              image: "",
              explain: "",
              questions: [],
            })
          }
          className="bg-green-500 text-white p-2 rounded"
        >
          Add Section
        </button>
      )}
    </div>
  );
};

export default SectionForm;
