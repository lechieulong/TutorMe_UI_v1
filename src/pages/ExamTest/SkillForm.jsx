import React from "react";
import { Controller } from "react-hook-form";
import PartForm from "./PartForm";
import {
  faBookOpen,
  faHeadphones,
  faPen,
  faMicrophone,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SkillForm = ({ skill, control }) => {
  // Define type mapping for skills
  const skillTypeMap = {
    Reading: 0,
    Listening: 1,
    Writing: 2,
    Speaking: 3,
  };

  return (
    <div className="mb-6 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
        <span className="mr-2">
          <FontAwesomeIcon
            icon={
              skill === "Reading"
                ? faBookOpen // Reading
                : skill === "Listening"
                ? faHeadphones // Listening (example icon)
                : skill === "Writing"
                ? faPen
                : skill === "Speaking"
                ? faMicrophone
                : faBook
            }
          />
        </span>
        {skill}
      </h2>

      {/* Duration Input */}
      <div className="mb-4">
        <Controller
          name={`skills.${skill}.duration`}
          control={control}
          rules={{
            required: "Duration is required",
            min: { value: 1, message: "Duration must be greater than 0" },
          }} // Validation for duration
          render={({ field, fieldState }) => (
            <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-2">
                Duration
              </label>
              <input
                {...field}
                type="number" // Set the input type to number
                className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-green-400"
                placeholder="Duration"
                onChange={(e) => field.onChange(Number(e.target.value))} // Convert string input to number
              />
              {fieldState.error && (
                <p className="text-red-500">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className="mb-4 hidden">
        <Controller
          name={`skills.${skill}.type`}
          control={control}
          defaultValue={skillTypeMap[skill]} // Set default type based on skill
          render={({ field }) => (
            <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-2">
                Type
              </label>
              <input
                {...field}
                type="number"
                className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-green-400"
                readOnly // Make it read-only or style it differently
              />
            </div>
          )}
        />
      </div>

      {/* Render PartForm */}
      <div className="mt-6">
        <PartForm skill={skill} control={control} />
      </div>
    </div>
  );
};

export default SkillForm;
