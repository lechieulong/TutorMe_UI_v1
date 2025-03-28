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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../redux/testExam/TestSlice";

const PartForm = ({ skill, control, setValue }) => {
  const dispatch = useDispatch();

  const { fields, append, remove } = useFieldArray({
    name: `skills.${skill}.parts`,
    control,
  });

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
      <h3 className="text-2xl font-semibold ">Parts</h3>

      {/* Container with fixed height and overflow for scrolling */}
      <div className=" border rounded p-4 mb-4">
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
                    <CKEditor
                      editor={ClassicEditor}
                      data={field.value || ""} // Set value to CKEditor
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "link",
                          "|",
                          "insertTable", // Add table button to the toolbar
                          "blockQuote",
                          "|",
                          "undo",
                          "redo",
                        ],
                        table: {
                          contentToolbar: [
                            "tableColumn",
                            "tableRow",
                            "mergeTableCells",
                            "tableProperties",
                            "tableCellProperties",
                          ],
                        },
                        height: 300, // Optional: Customize height of editor
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        field.onChange(data); // Update value for validation
                      }}
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
                rules={{
                  required: "Audio file is required", // Validation rule
                }}
                render={({ field, fieldState }) => (
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
                      onChange={(e) => handleFileChange(e, field)}
                      className="border p-1 w-full"
                    />
                    {field.value && (
                      <p className="text-gray-700">
                        Audio file: {field.value.name}
                      </p>
                    )}

                    {/* Display error message if the field is invalid */}
                    {fieldState?.invalid && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState?.error?.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}

            {skill === "Writing" && index === 0 && (
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

            <SectionForm
              skill={skill}
              partIndex={index}
              control={control}
              setValue={setValue}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          append({
            contentText: "",
            audio: "",
            image: "",
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

export default PartForm;
