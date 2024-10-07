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
  console.log(skill);

  return (
    <div className="mb-6 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
        <span className="mr-2">
          <FontAwesomeIcon
            icon={
              skill === "Reading"
                ? faBookOpen // Reading
                : skill === "Listening"
                ? faHeadphones // Listening (Ví dụ icon khác)
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
          rules={{ required: "Duration is required" }} // Validation for duration
          render={({ field, fieldState }) => (
            <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-2">
                Duration
              </label>
              <input
                {...field}
                className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-green-400"
                placeholder="Duration"
              />
              {fieldState.error && (
                <p className="text-red-500">{fieldState.error.message}</p>
              )}
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
