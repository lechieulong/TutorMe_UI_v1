import React from "react";
import { Controller } from "react-hook-form";
import PartForm from "./PartForm";

const SkillForm = ({ skill, control }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">{skill}</h2>
      <Controller
        name={`skills.${skill}.duration`}
        control={control}
        rules={{ required: "Duration is required" }} // Validation cho duration
        render={({ field, fieldState }) => (
          <div className="mb-2">
            <input {...field} className="border p-1" placeholder="Duration" />
            {fieldState.error && (
              <p className="text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
      <PartForm skill={skill} control={control} />
    </div>
  );
};

export default SkillForm;
