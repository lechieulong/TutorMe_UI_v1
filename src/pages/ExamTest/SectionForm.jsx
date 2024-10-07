import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import QuestionForm from "./QuestionForm";

const SectionForm = ({ skill, partIndex, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: `skills.${skill}.parts.${partIndex}.sections`,
    control,
  });

  return (
    <div>
      <h4 className="font-medium">Sections</h4>
      {fields.map((section, index) => (
        <div key={section.id} className="mb-4 border p-4 rounded">
          <h5 className="font-medium">Section {index + 1}</h5>
          <Controller
            name={`skills.${skill}.parts.${partIndex}.sections.${index}.sectionGuide`}
            control={control}
            rules={{ required: "Section Guide is required" }} // Validation cho sectionGuide
            render={({ field, fieldState }) => (
              <div className="mb-2">
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
          <QuestionForm
            skill={skill}
            partIndex={partIndex}
            sectionIndex={index}
            control={control}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-500 text-white p-1 rounded mt-2"
          >
            Remove Section
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ sectionGuide: "", questions: [] })}
        className="bg-green-500 text-white p-2 rounded"
      >
        Add Section
      </button>
    </div>
  );
};

export default SectionForm;
