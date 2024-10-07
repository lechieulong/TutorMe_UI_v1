import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import SkillForm from "./SkillForm";

const TestFormDetail = () => {
  const { control, handleSubmit, resetField } = useForm();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const dispatch = useDispatch();

  const skills = ["Reading", "Listening", "Writing", "Speaking"];

  const toggleSkill = (skill) => {
    setSelectedSkills((prevSelected) => {
      if (prevSelected.includes(skill)) {
        resetField(`skills.${skill}`);
        return prevSelected.filter((s) => s !== skill);
      } else {
        return [...prevSelected, skill];
      }
    });
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result; // Get file content as text
        const parsedData = parseCSV(fileContent);
        console.log("Parsed CSV Data:", parsedData);
        // Here, you can set the parsed data to your form or state as needed
      };

      reader.readAsText(file); // Read the file as text
    }
  };

  // Function to parse CSV data
  const parseCSV = (data) => {
    const lines = data.split("\n");
    const result = [];

    // Assuming the first line is the header
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      headers.forEach((header, index) => {
        obj[header.trim()] = currentLine[index]
          ? currentLine[index].trim()
          : ""; // Trim whitespace and assign value
      });
      result.push(obj);
    }

    return result; // Return parsed data as an array of objects
  };

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Form</h1>
      <div className="flex gap-2 mb-4">
        <div className="flex flex-wrap space-x-4 mb-4">
          {skills.map((skill) => (
            <button
              key={skill}
              className={`p-2 border border-blue-300 rounded ${
                selectedSkills.includes(skill)
                  ? "bg-green-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </button>
          ))}
        </div>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileImport}
          className="border border-gray-400  h-max  p-2 rounded"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {selectedSkills.map((skill) => (
          <SkillForm key={skill} skill={skill} control={control} />
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TestFormDetail;
