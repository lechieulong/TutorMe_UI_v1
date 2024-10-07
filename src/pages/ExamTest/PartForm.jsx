import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import SectionForm from "./SectionForm";
import { faImage, faMusic, faTrash } from "@fortawesome/free-solid-svg-icons";
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
        <div key={part.id} clafssName="mb-4 border   p-4 rounded space-y-5">
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

          {/* Content Text Field */}
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
          <div className="flex gap-10">
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
          </div>

          <SectionForm skill={skill} partIndex={index} control={control} />
        </div>
      ))}

      {/* Add Part Button */}
      <button
        type="button"
        onClick={() =>
          append({ contentText: "", audio: null, image: null, sections: [] })
        }
        className="bg-green-500 text-white p-2 rounded"
      >
        Add Part
      </button>
    </div>
  );
};

export default PartForm;
