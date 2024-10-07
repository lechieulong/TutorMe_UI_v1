import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import SectionForm from "./SectionForm";

const PartForm = ({ skill, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: `skills.${skill}.parts`,
    control,
  });

  return (
    <div>
      <h3 className="text-lg font-semibold">Parts</h3>
      {fields.map((part, index) => (
        <div key={part.id} className="mb-4 border p-4 rounded">
          <h4 className="font-medium">Part {index + 1}</h4>

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

          {/* Audio Upload Field */}
          <Controller
            name={`skills.${skill}.parts.${index}.audio`}
            control={control}
            render={({ field }) => (
              <div className="mb-2">
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

          {/* Image Upload Field */}
          <Controller
            name={`skills.${skill}.parts.${index}.image`}
            control={control}
            render={({ field }) => (
              <div className="mb-2">
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

          {/* Remove Part Button */}
          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-500 text-white p-1 rounded mt-2"
          >
            Remove Part
          </button>
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
