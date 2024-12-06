import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Controller } from "react-hook-form";
import {
  faBookOpen,
  faMultiply,
  faPlus,
  faQuestionCircle,
  faHeadphones,
  faPen,
  faMicrophone,
  faBook,
  faTrash,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";

const FormSkill = ({
  formData,
  control,
  unregister,
  skill,
  skillData,
  handleDataChange,
}) => {
  // const { parts } = formData.skills[skill];

  const [leftWidth, setLeftWidth] = useState(100);
  const [previewWith, setPreviewWith] = useState(50);

  const startResizing = (part) => {
    if (part === "main") {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", stopResizing);
    }
    if (part === "preview") {
      document.addEventListener("mousemove", handleMouseMovePreview);
      document.addEventListener("mouseup", stopResizingPreview);
    }
  };

  const handleMouseMovePreview = (e) => {
    const newWidth = Math.min(
      100,
      Math.max(10, (e.clientX / window.innerWidth) * 100)
    );
    setPreviewWith(newWidth);
  };

  const stopResizingPreview = () => {
    document.removeEventListener("mousemove", handleMouseMovePreview);
    document.removeEventListener("mouseup", stopResizingPreview);
  };

  const handleMouseMove = (e) => {
    const newWidth = Math.min(
      100,
      Math.max(10, (e.clientX / window.innerWidth) * 100)
    );
    setLeftWidth(newWidth);
  };

  const stopResizing = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  };

  const handleDurationChange = (duration) => {
    const updatedSkills = [...formData.skills];
    const skillIndex = updatedSkills.findIndex((s) => s.type === skill);

    const currentSkill = updatedSkills[skillIndex];

    updatedSkills[skillIndex] = { ...currentSkill, duration };

    handleDataChange({ ...formData, skills: updatedSkills });
  };

  const handleAudioChange = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;
    const maxFileSize = 1000 * 1024 * 1024;
    if (file.size > maxFileSize) {
      alert("File size exceeds the 1GB limit.");
      return;
    }

    if (!file.type.startsWith("audio/")) {
      alert("Please upload a valid audio file.");
      return;
    }

    const updatedSkills = [...formData.skills];
    const updatedParts = [...updatedSkills[skill].parts];

    updatedParts[index].audioFile = file;
    updatedSkills[skill].parts = updatedParts;

    handleDataChange({ ...formData, skills: updatedSkills });
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (e.g., JPG, PNG).");
      return;
    }

    const updatedSkills = [...formData.skills];
    const updatedParts = [...updatedSkills[skill].parts];

    updatedParts[index].imageFile = file;
    updatedSkills[skill].parts = updatedParts;

    handleDataChange({ ...formData, skills: updatedSkills });
  };

  const addPart = () => {
    const updatedSkills = [...formData.skills];
    const skillIndex = updatedSkills.findIndex((s) => s.type === skill);
    if (skillIndex === -1) {
      console.error("Skill not found");
      return;
    }
    const currentSkill = updatedSkills[skillIndex];
    const parts = currentSkill.parts || [];

    const newPart = {
      partNumber: parts.length + 1,
      contentText: "",
      audioUrl: "",
      imageUrl: "",
      questionTypeParts: [
        {
          questionGuide: "",
          questionType: 1,
          questions: [],
        },
      ],
    };

    updatedSkills[skillIndex] = {
      ...currentSkill,
      parts: [...parts, newPart],
    };

    handleDataChange({ ...formData, skills: updatedSkills });
  };

  const removePart = (partIndex) => {
    const updatedSkills = [...formData.skills];
    const skillIndex = updatedSkills.findIndex((s) => s.type === skill);
    if (skillIndex === -1) {
      return;
    }
    const parts = updatedSkills[skillIndex].parts || [];

    if (parts.length > 1) {
      const updatedParts = parts.filter((_, i) => i !== partIndex);

      updatedSkills[skillIndex] = {
        ...updatedSkills[skillIndex],
        parts: updatedParts,
      };
      handleDataChange({ ...formData, skills: updatedSkills });
    } else {
      alert("You must have at least 1 part.");
    }
  };

  const addQuestionTypePart = (partIndex) => {
    const updatedSkills = [...formData.skills];
    const skillIndex = updatedSkills.findIndex((s) => s.type === skill);

    if (skillIndex === -1) {
      console.error("Skill not found");
      return;
    }
    const currentSkill = updatedSkills[skillIndex];
    const parts = currentSkill.parts || [];
    if (partIndex < 0 || partIndex >= parts.length) {
      console.error("Invalid part index");
      return;
    }

    const questionTypeParts = parts[partIndex].questionTypeParts || [];

    const newQuestionTypePart = {
      questionGuide: "",
      questionType: 1,
      questions: [],
    };

    // Update the specific part with the new question type part
    updatedSkills[skillIndex] = {
      ...currentSkill,
      parts: [
        ...parts.slice(0, partIndex),
        {
          ...parts[partIndex],
          questionTypeParts: [...questionTypeParts, newQuestionTypePart],
        },
        ...parts.slice(partIndex + 1),
      ],
    };

    // Update formData with the new skills structure
    handleDataChange({ ...formData, skills: updatedSkills });
  };

  const removeQuestionTypePart = (partIndex, qTypeIndex) => {
    const updatedSkills = [...formData.skills];
    const skillIndex = updatedSkills.findIndex((s) => s.type === skill);

    // Check if the skill exists
    if (skillIndex === -1) {
      console.error("Skill not found");
      return;
    }

    const currentSkill = updatedSkills[skillIndex];
    const updatedParts = [...currentSkill.parts]; // Clone the parts array

    // Ensure the questionTypeParts array exists
    const questionTypeParts = updatedParts[partIndex].questionTypeParts || [];

    // Ensure there are multiple questionTypeParts before removing
    if (questionTypeParts.length > 1) {
      // Remove the specified questionTypePart
      const updatedQuestionTypeParts = [
        ...questionTypeParts.slice(0, qTypeIndex),
        ...questionTypeParts.slice(qTypeIndex + 1),
      ];

      // Update the parts with the modified questionTypeParts
      updatedParts[partIndex] = {
        ...updatedParts[partIndex],
        questionTypeParts: updatedQuestionTypeParts,
      };

      // Update the skill with the new parts
      updatedSkills[skillIndex] = {
        ...currentSkill,
        parts: updatedParts,
      };

      // Trigger data change
      handleDataChange({ ...formData, skills: updatedSkills });
    } else {
      alert("You must have at least 1 question type part.");
    }
  };

  const addQuestion = (partIndex, qTypeIndex, questionType) => {
    const updatedSkills = [...formData.skills];
    const skillIndex = updatedSkills.findIndex((s) => s.type === skill);

    if (skillIndex === -1) {
      console.error("Skill not found");
      return;
    }

    const currentSkill = updatedSkills[skillIndex];
    const parts = currentSkill.parts || [];

    if (partIndex < 0 || partIndex >= parts.length) {
      console.error("Invalid part index");
      return;
    }

    const questionTypePart = parts[partIndex].questionTypeParts[qTypeIndex];

    const newQuestion = {
      questionName: "",
      maxMarks: 1,
    };

    switch (questionType) {
      case 1:
        newQuestion.answerMatching = [{ heading: "", matching: "" }];
        break;
      case 2:
        newQuestion.answerFilling = "";
        break;
      case 3: // Multiple Choice
      case 4: // Radio Choice
        newQuestion.answersOptions = [
          {
            answerText: "",
            isCorrect: false,
          },
        ];
        break;
      case 5: // True/False
        newQuestion.answerTrueFalse = 0;
        break;
      default:
        console.error("Invalid question type");
        return;
    }

    questionTypePart.questions = [...questionTypePart.questions, newQuestion];

    updatedSkills[skillIndex] = {
      ...currentSkill,
      parts: [
        ...parts.slice(0, partIndex),
        {
          ...parts[partIndex],
          questionTypeParts: [
            ...parts[partIndex].questionTypeParts.slice(0, qTypeIndex),
            questionTypePart,
            ...parts[partIndex].questionTypeParts.slice(qTypeIndex + 1),
          ],
        },
        ...parts.slice(partIndex + 1),
      ],
    };

    handleDataChange({ ...formData, skills: updatedSkills });
  };

  const removeQuestion = (partIndex, qTypeIndex, qtnIndex) => {
    const updatedSkills = [...formData.skills];
    const skillIndex = updatedSkills.findIndex((s) => s.type === skill);

    if (skillIndex === -1) {
      console.error("Skill not found");
      return;
    }

    const currentSkill = updatedSkills[skillIndex];
    const parts = currentSkill.parts || [];

    if (partIndex < 0 || partIndex >= parts.length) {
      console.error("Invalid part index");
      return;
    }

    const questionTypePart = parts[partIndex].questionTypeParts[qTypeIndex];

    // Ensure the questionTypePart has questions
    if (questionTypePart.questions && questionTypePart.questions.length > 0) {
      // Check if the question index is valid
      if (qtnIndex >= 0 && qtnIndex < questionTypePart.questions.length) {
        // Remove the specified question
        questionTypePart.questions.splice(qtnIndex, 1);

        // Update the parts structure with the modified questionTypePart
        updatedSkills[skillIndex] = {
          ...currentSkill,
          parts: [
            ...parts.slice(0, partIndex),
            {
              ...parts[partIndex],
              questionTypeParts: [
                ...parts[partIndex].questionTypeParts.slice(0, qTypeIndex),
                questionTypePart,
                ...parts[partIndex].questionTypeParts.slice(qTypeIndex + 1),
              ],
            },
            ...parts.slice(partIndex + 1),
          ],
        };

        // Trigger data change
        handleDataChange({ ...formData, skills: updatedSkills });
      } else {
        console.error("Invalid question index");
      }
    } else {
      console.error("No questions found in the specified questionTypePart");
    }
  };

  return (
    <div className="p-4 border  border-gray-400">
      <h2 className="text-2xl p-2 font-extrabold text-green-500">
        <span className="mr-2">
          <FontAwesomeIcon
            icon={
              skill === 0
                ? faBookOpen // Reading
                : skill === 1
                ? faHeadphones // Listening (Ví dụ icon khác)
                : skill === 2
                ? faPen
                : skill === 3
                ? faMicrophone
                : faBook
            }
          />
        </span>
        {skill === 0
          ? "Reading"
          : skill === 1
          ? "Listening"
          : skill === 2
          ? "Writing"
          : skill === 3
          ? "Speaking"
          : "All"}
      </h2>
      <label className=" w-3/12  p-2 flex items-center gap-3 justify-center  text-base font-medium text-gray-700">
        <span className="w-1/2">Duration (minutes)</span>
        <input
          type="number"
          value={skillData.duration}
          onChange={(e) => handleDurationChange(Number(e.target.value))}
          placeholder="Enter duration"
          className="block w-6/12 border p-2 border-gray-400 rounded-md shadow-sm"
        />
      </label>

      <div className="flex">
        <div
          className="overflow-auto flex flex-col gap-6  h-[630px] border border-gray-300 shadow-lg bg-yellow-50 rounded-lg"
          style={{ width: `${leftWidth}%` }}
        >
          {skillData.parts.map((part, partIndex) => (
            <div key={partIndex} className="w-full flex flex-col p-6 ">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-semibold text-gray-700">
                  Part {part.partNumber}
                </h4>
                <button
                  type="button"
                  onClick={() => removePart(partIndex)}
                  className="mt-4 bg-red-500 text-sm text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove Part
                  <span className="ml-3">
                    <FontAwesomeIcon icon={faDeleteLeft} />
                  </span>
                </button>
              </div>

              {skill === 0 && (
                <div className="mt-4">
                  <div className="text-lg font-medium text-gray-600">
                    Content Topic
                  </div>
                  <div className="mt-2 relative w-full overflow-auto bg-white rounded-md shadow-inner">
                    <Controller
                      name={`skills[${skill}].parts[${partIndex}].contentText`}
                      control={control}
                      defaultValue={
                        formData.skills[skill].parts[partIndex]?.contentText ||
                        ""
                      }
                      rules={{ required: "Content text is required" }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <CKEditor
                            editor={ClassicEditor}
                            data={value}
                            config={{
                              toolbar: [
                                "heading",
                                "|",
                                "bold",
                                "italic",
                                "link",
                                "|",
                                "blockQuote",
                                "|",
                                "undo",
                                "redo",
                              ],
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              onChange(data); // Update value for validation

                              // Update the formData state manually
                              const updatedSkills = [...formData.skills];
                              updatedSkills[skill].parts[
                                partIndex
                              ].contentText = data;

                              handleDataChange({
                                ...formData,
                                skills: updatedSkills,
                              });
                            }}
                          />
                          {error && (
                            <p className="text-red-500">{error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
              )}

              {skill === 1 && (
                <div className="mt-4">
                  <label className="block text-base font-medium text-gray-700">
                    Audio Upload:
                  </label>

                  <Controller
                    name={`skills[${skill}].parts[${partIndex}].audioUrl`}
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Audio file is required",
                      validate: {
                        fileSize: (value) =>
                          value?.size <= 1000 * 1024 * 1024 ||
                          "File size should be under 1GB",
                        fileType: (value) =>
                          value?.type.startsWith("audio/") ||
                          "File should be an audio type",
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => {
                            field.onChange(e.target.files[0]);
                            handleAudioChange(partIndex, e); // Call handleAudioChange to update formData
                          }}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {error && (
                          <p className="text-red-500">{error.message}</p>
                        )}
                      </>
                    )}
                  />
                </div>
              )}

              {skill === 2 && partIndex === 0 && (
                <div className="mt-4">
                  <label className="block text-base font-medium text-gray-700">
                    Image Upload:
                  </label>

                  <Controller
                    name={`skills[${skill}].parts[${partIndex}].imageUrl`}
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Image file is required",
                      validate: {
                        fileType: (value) =>
                          value?.type.startsWith("image/") ||
                          "File should be an image type",
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            field.onChange(e.target.files[0]);
                            handleImageChange(partIndex, e);
                          }}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {error && (
                          <p className="text-red-500">{error.message}</p>
                        )}
                      </>
                    )}
                  />
                </div>
              )}

              {part.questionTypeParts.map((qTypePart, qIndex) => (
                <div
                  key={qIndex}
                  className="mt-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                >
                  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <p className="italic">
                        Please choose type before add question!!!
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          removeQuestionTypePart(partIndex, qIndex)
                        }
                        className=" px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-green-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-4 mb-4">
                    {(skill === 0 || skill === 1) && (
                      <>
                        <div className="w-7/12 flex flex-col">
                          <label className="text-gray-700 font-medium">
                            Question Guide:
                          </label>
                          <Controller
                            name={`skills[${skill}].parts[${partIndex}].questionTypePart[${qIndex}].questionGuide`} // Update the path for Controller
                            control={control}
                            defaultValue={qTypePart.questionGuide}
                            rules={{
                              required: "Question Guide is required", // Add required validation
                              minLength: {
                                value: 5,
                                message:
                                  "Question Guide must be at least 5 characters long", // Minimum length validation
                              },
                            }}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <input
                                  {...field} // Spread the field props to the input
                                  className={`mt-1 p-2 border ${
                                    error ? "border-red-500" : "border-gray-300"
                                  } rounded-md`}
                                  placeholder="Enter question guide here" // Optional placeholder for better UX
                                />
                                {error && (
                                  <p className="text-red-500">
                                    {error.message}
                                  </p> // Display error message if any
                                )}
                              </>
                            )}
                          />
                        </div>

                        <div className="w-5/12 flex flex-col">
                          <label className="text-gray-700 font-medium">
                            Question Type:
                          </label>
                          <select
                            name="questionType"
                            value={qTypePart.questionType || 1}
                            onChange={(e) => {
                              const newQuestionType = Number(e.target.value);
                              const newSkills = [...formData.skills];
                              const skillIndex = newSkills.findIndex(
                                (s) => s.type === skill
                              );

                              if (skillIndex !== -1) {
                                const newParts = [
                                  ...newSkills[skillIndex].parts,
                                ];

                                if (
                                  newParts[partIndex] &&
                                  newParts[partIndex].questionTypeParts
                                ) {
                                  // Update the question type
                                  newParts[partIndex].questionTypeParts[
                                    qIndex
                                  ].questionType = newQuestionType;

                                  // Reset or adjust questions based on the new question type
                                  newParts[partIndex].questionTypeParts[
                                    qIndex
                                  ].questions = newParts[
                                    partIndex
                                  ].questionTypeParts[qIndex].questions.map(
                                    (question) => {
                                      const baseQuestion = {
                                        questionName: question.questionName,
                                        maxMarks: question.maxMarks,
                                      };

                                      switch (newQuestionType) {
                                        case 1: // Matching
                                          return {
                                            ...baseQuestion,
                                            answerMatching: [
                                              { heading: "", matching: "" },
                                            ],
                                          };
                                        case 2: // Fill in the Blank
                                          return {
                                            ...baseQuestion,
                                            answerFilling: "",
                                          };
                                        case 3: // Multiple Choice
                                        case 4: // Radio Choice
                                          return {
                                            ...baseQuestion,
                                            answersOptions: [
                                              {
                                                answerText: "",
                                                isCorrect: false,
                                              },
                                            ],
                                          };
                                        case 5: // True/False
                                          return {
                                            ...baseQuestion,
                                            answerTrueFalse: 0,
                                          };
                                        default:
                                          return baseQuestion;
                                      }
                                    }
                                  );

                                  newSkills[skillIndex].parts = newParts;

                                  handleDataChange({
                                    ...formData,
                                    skills: newSkills,
                                  });
                                }
                              }
                            }}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                          >
                            <option value="" disabled>
                              Select Question Type
                            </option>
                            <option value={1}>Matching</option>
                            <option value={2}>Fill in the Blank</option>
                            <option value={3}>Multiple Choice</option>
                            <option value={4}>Radio Choice</option>
                            <option value={5}>True/False</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>

                  {qTypePart.questions.map((question, qtnIndex) => (
                    <div key={qtnIndex} className="mb-4   p-2">
                      <div className="flex items-center justify-between">
                        <h4>
                          Question {qtnIndex + 1}
                          <span className="ml-4">
                            <FontAwesomeIcon icon={faQuestionCircle} />
                          </span>
                        </h4>

                        <span
                          type="button"
                          onClick={() =>
                            removeQuestion(partIndex, qIndex, qtnIndex)
                          }
                          className=" px-4 py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                        >
                          <FontAwesomeIcon icon={faMultiply} />
                        </span>
                      </div>
                      <label className="text-gray-700 font-medium">
                        Question Name:
                      </label>
                      <Controller
                        name={`skills[${skill}].parts[${partIndex}].questionTypePart[${qIndex}].questions[${qtnIndex}].questionName`}
                        control={control}
                        defaultValue={question.questionName}
                        rules={{
                          required: "Question Name is required",
                          minLength: {
                            value: 3,
                            message:
                              "Question Name must be at least 3 characters long", // Minimum length validation
                          },
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <input
                              {...field} // Spread the field props to the input
                              type="text"
                              className={`mt-1 p-2 border ${
                                error ? "border-red-500" : "border-gray-300"
                              } rounded-md w-full`}
                              placeholder="Enter question name here" // Optional placeholder for better UX
                            />
                            {error && (
                              <p className="text-red-500">{error.message}</p> // Display error message if any
                            )}
                          </>
                        )}
                      />

                      {qTypePart.questionType === 1 && (
                        <div>
                          <label className="text-gray-700 font-medium mt-2">
                            Heading Matching:
                          </label>
                          {question.answerMatching.map(
                            (matchItem, matchIndex) => (
                              <div
                                key={matchIndex}
                                className="flex space-x-4 mt-2"
                              >
                                <div className="w-1/2">
                                  <label className="text-gray-700">
                                    Heading:
                                  </label>
                                  <Controller
                                    name={`skills[${skill}].parts[${partIndex}].questionTypePart[${qIndex}].questions[${qtnIndex}].answerMatching[${matchIndex}].heading`}
                                    control={control}
                                    defaultValue={matchItem.heading}
                                    rules={{
                                      required: "Heading is required",
                                    }}
                                    render={({
                                      field,
                                      fieldState: { error },
                                    }) => (
                                      <>
                                        <input
                                          {...field}
                                          type="text"
                                          className={`mt-1 p-2 border ${
                                            error
                                              ? "border-red-500"
                                              : "border-gray-300"
                                          } rounded-md w-full`}
                                        />
                                        {error && (
                                          <p className="text-red-500">
                                            {error.message}
                                          </p>
                                        )}
                                      </>
                                    )}
                                  />
                                </div>

                                <div className="w-1/2">
                                  <label className="text-gray-700">
                                    Matching:
                                  </label>
                                  <Controller
                                    name={`skills[${skill}].parts[${partIndex}].questionTypePart[${qIndex}].questions[${qtnIndex}].answerMatching[${matchIndex}].matching`}
                                    control={control}
                                    defaultValue={matchItem.matching}
                                    rules={{
                                      required: "Matching is required",
                                    }}
                                    render={({
                                      field,
                                      fieldState: { error },
                                    }) => (
                                      <>
                                        <input
                                          {...field}
                                          type="text"
                                          className={`mt-1 p-2 border ${
                                            error
                                              ? "border-red-500"
                                              : "border-gray-300"
                                          } rounded-md w-full`}
                                        />
                                        {error && (
                                          <p className="text-red-500">
                                            {error.message}
                                          </p>
                                        )}
                                      </>
                                    )}
                                  />
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    const newSkills = [...formData.skills];
                                    const skillIndex = newSkills.findIndex(
                                      (s) => s.type === skill
                                    );

                                    if (skillIndex !== -1) {
                                      const currentSkill =
                                        newSkills[skillIndex];

                                      currentSkill.parts[
                                        partIndex
                                      ].questionTypeParts[qIndex].questions[
                                        qtnIndex
                                      ].answerMatching.splice(matchIndex, 1);

                                      newSkills[skillIndex] = {
                                        ...currentSkill,
                                      };

                                      handleDataChange({
                                        ...formData,
                                        skills: newSkills,
                                      });
                                    } else {
                                      console.error("Skill not found");
                                    }
                                  }}
                                  className="ml-2 w-16 text-[16px] bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                                >
                                  Remove Matching
                                </button>
                              </div>
                            )
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const newSkills = [...formData.skills];

                              // Find the skill by its type
                              const skillIndex = newSkills.findIndex(
                                (s) => s.type === skill
                              );

                              if (skillIndex !== -1) {
                                // Access the current skill object
                                const currentSkill = newSkills[skillIndex];

                                // Add a new answer matching object
                                currentSkill.parts[partIndex].questionTypeParts[
                                  qIndex
                                ].questions[qtnIndex].answerMatching.push({
                                  heading: "",
                                  matching: "",
                                });

                                // Update the skill in the newSkills array
                                newSkills[skillIndex] = { ...currentSkill };

                                // Update the formData state with the new skill structure
                                handleDataChange({
                                  ...formData,
                                  skills: newSkills,
                                });
                              } else {
                                console.error("Skill not found");
                              }
                            }}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                          >
                            Add Matching
                          </button>
                        </div>
                      )}

                      {qTypePart.questionType === 2 && (
                        <div>
                          <label className="text-gray-700 font-medium mt-2">
                            Answer Filling:
                          </label>
                          <Controller
                            name={`skills[${skill}].parts[${partIndex}].questionTypePart[${qIndex}].questions[${qtnIndex}].answerFilling`}
                            control={control}
                            defaultValue={question.answerFilling} // Set the default value
                            rules={{
                              required: "Answer filling is required", // Validation rule
                            }}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <input
                                  {...field}
                                  type="text"
                                  className={`mt-1 p-2 border ${
                                    error ? "border-red-500" : "border-gray-300"
                                  } rounded-md w-full`}
                                />
                                {error && (
                                  <p className="text-red-500">
                                    {error.message}
                                  </p>
                                )}{" "}
                                {/* Display error message */}
                              </>
                            )}
                          />
                        </div>
                      )}

                      {qTypePart.questionType === 3 && (
                        <div className="w-full flex flex-col">
                          <label className="text-gray-700 font-medium">
                            Answer Selection (Multiple Choice)
                          </label>
                          <div className="flex flex-col gap-3">
                            {question.answersOptions.map((option, idx) => (
                              <div
                                key={idx}
                                className="flex gap-3 items-center mb-2"
                              >
                                <div className="border rounded-full p-2">
                                  {String.fromCharCode(65 + idx)}{" "}
                                </div>

                                <Controller
                                  name={`skills[${skill}].parts[${partIndex}].questionTypePart[${qIndex}].questions[${qtnIndex}].answersOptions[${idx}].answerText`}
                                  control={control}
                                  defaultValue={option.answerText} // Set the default value
                                  rules={{
                                    required: "Answer text is required", // Validation rule
                                  }}
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <>
                                      <input
                                        {...field}
                                        type="text"
                                        placeholder="Enter answer"
                                        className={`mt-1 p-2 border ${
                                          error
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        } rounded-md w-full`}
                                        onChange={(e) => {
                                          const newSkills = [
                                            ...formData.skills,
                                          ];
                                          const skillIndex =
                                            newSkills.findIndex(
                                              (s) => s.type === skill
                                            );

                                          const currentSkill =
                                            newSkills[skillIndex];
                                          const currentPart =
                                            currentSkill.parts[partIndex];
                                          const currentQuestionTypePart =
                                            currentPart.questionTypeParts[
                                              qIndex
                                            ];
                                          const currentQuestion =
                                            currentQuestionTypePart.questions[
                                              qtnIndex
                                            ];

                                          currentQuestion.answersOptions[
                                            idx
                                          ].answerText = e.target.value;

                                          handleDataChange({
                                            ...formData,
                                            skills: newSkills,
                                          });

                                          field.onChange(e.target.value); // Update the field
                                        }}
                                      />
                                      {error && (
                                        <p className="text-red-500">
                                          {error.message}
                                        </p>
                                      )}
                                    </>
                                  )}
                                />

                                <label className="">Is Correct</label>
                                <input
                                  type="checkbox"
                                  checked={option.isCorrect}
                                  onChange={() => {
                                    const newSkills = [...formData.skills];
                                    const skillIndex = newSkills.findIndex(
                                      (s) => s.type === skill
                                    );

                                    const currentPart =
                                      newSkills[skillIndex].parts[partIndex];
                                    currentPart.questionTypeParts[
                                      qIndex
                                    ].questions[qtnIndex].answersOptions[
                                      idx
                                    ].isCorrect = !option.isCorrect;

                                    // Update the skills
                                    handleDataChange({
                                      ...formData,
                                      skills: newSkills,
                                    });
                                  }}
                                  className="ml-2"
                                />

                                <button
                                  type="button"
                                  onClick={() => {
                                    const newSkills = [...formData.skills];
                                    const skillIndex = newSkills.findIndex(
                                      (s) => s.type === skill
                                    );
                                    const newParts = [
                                      ...newSkills[skillIndex].parts,
                                    ];

                                    // Remove the answer option at the specified index
                                    newParts[partIndex].questionTypeParts[
                                      qIndex
                                    ].questions[qtnIndex].answersOptions.splice(
                                      idx,
                                      1
                                    );

                                    newSkills[skillIndex] = {
                                      ...newSkills[skillIndex],
                                      parts: newParts,
                                    };

                                    handleDataChange({
                                      ...formData,
                                      skills: newSkills,
                                    });

                                    // Unregister the field from react-hook-form
                                    unregister(
                                      `skills[${skillIndex}].parts[${partIndex}].questionTypePart[${qIndex}].questions[${qtnIndex}].answersOptions[${idx}].answerText`
                                    );
                                  }}
                                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() => {
                                const newSkills = [...formData.skills];

                                const skillIndex = newSkills.findIndex(
                                  (s) => s.type === skill
                                );
                                const newParts = [
                                  ...newSkills[skillIndex].parts,
                                ];

                                // Add a new answer option to the question
                                newParts[partIndex].questionTypeParts[
                                  qIndex
                                ].questions[qtnIndex].answersOptions.push({
                                  answerText: "",
                                  isCorrect: false,
                                });

                                newSkills[skillIndex] = {
                                  ...newSkills[skillIndex],
                                  parts: newParts,
                                };

                                handleDataChange({
                                  ...formData,
                                  skills: newSkills,
                                });
                              }}
                              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                            >
                              Add Answer Option
                            </button>
                          </div>
                        </div>
                      )}

                      {qTypePart.questionType === 4 && (
                        <div className="flex flex-col">
                          <label className="text-gray-700 font-medium">
                            Answer Selection (Single Choice)
                          </label>
                          <div className="mt-1 border p-2">
                            {question.answersOptions.map((option, idx) => (
                              <div
                                key={idx}
                                className="flex gap-3 items-center mb-2"
                              >
                                <div className="border rounded-full p-2">
                                  {String.fromCharCode(65 + idx)}{" "}
                                </div>

                                <Controller
                                  name={`skills[${skill}].parts[${partIndex}].questionTypePart[${qIndex}].questions[${qtnIndex}].answersOptions[${idx}].answerText`}
                                  control={control}
                                  defaultValue={option.answerText} // Set the default value
                                  rules={{
                                    required: "Answer text is required", // Validation rule
                                  }}
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <>
                                      <input
                                        {...field}
                                        type="text"
                                        placeholder="Enter answer"
                                        className={`mt-1 p-2 border ${
                                          error
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        } rounded-md w-full`}
                                        onChange={(e) => {
                                          const newSkills = [
                                            ...formData.skills,
                                          ];
                                          const skillIndex =
                                            newSkills.findIndex(
                                              (s) => s.type === skill
                                            );

                                          const currentSkill =
                                            newSkills[skillIndex];
                                          const currentPart =
                                            currentSkill.parts[partIndex];
                                          const currentQuestionTypePart =
                                            currentPart.questionTypeParts[
                                              qIndex
                                            ];
                                          const currentQuestion =
                                            currentQuestionTypePart.questions[
                                              qtnIndex
                                            ];

                                          currentQuestion.answersOptions[
                                            idx
                                          ].answerText = e.target.value;

                                          handleDataChange({
                                            ...formData,
                                            skills: newSkills,
                                          });

                                          field.onChange(e.target.value); // Update the field
                                        }}
                                      />
                                      {error && (
                                        <p className="text-red-500">
                                          {error.message}
                                        </p>
                                      )}
                                    </>
                                  )}
                                />

                                <label className="">Is Correct</label>
                                <Controller
                                  name={`skills[${skill}].parts[${partIndex}].questionTypePart[${qIndex}].questions[${qtnIndex}].isCorrect`}
                                  control={control}
                                  defaultValue={option.isCorrect}
                                  render={({ field }) => (
                                    <input
                                      type="radio"
                                      {...field}
                                      checked={option.isCorrect} // Keep the `isCorrect` state
                                      onChange={() => {
                                        const newSkills = [...formData.skills];
                                        const skillIndex = newSkills.findIndex(
                                          (s) => s.type === skill
                                        );

                                        const currentPart =
                                          newSkills[skillIndex].parts[
                                            partIndex
                                          ];

                                        // Set `isCorrect` for the selected option, and reset others
                                        currentPart.questionTypeParts[
                                          qIndex
                                        ].questions[
                                          qtnIndex
                                        ].answersOptions.forEach((opt, i) => {
                                          opt.isCorrect = i === idx;
                                        });

                                        handleDataChange({
                                          ...formData,
                                          skills: newSkills,
                                        });

                                        field.onChange(true); // Mark this option as selected
                                      }}
                                    />
                                  )}
                                />

                                <button
                                  type="button"
                                  onClick={() => {
                                    const newSkills = [...formData.skills];
                                    const skillIndex = newSkills.findIndex(
                                      (s) => s.type === skill
                                    );
                                    const newParts = [
                                      ...newSkills[skillIndex].parts,
                                    ];

                                    // Remove the answer option at the specified index
                                    newParts[partIndex].questionTypeParts[
                                      qIndex
                                    ].questions[qtnIndex].answersOptions.splice(
                                      idx,
                                      1
                                    );

                                    newSkills[skillIndex] = {
                                      ...newSkills[skillIndex],
                                      parts: newParts,
                                    };

                                    handleDataChange({
                                      ...formData,
                                      skills: newSkills,
                                    });

                                    unregister(
                                      `skills[${skillIndex}].parts[${partIndex}].questionTypePart[${qIndex}].questions[${qtnIndex}].answersOptions[${idx}].answerText`
                                    );
                                  }}
                                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            ))}

                            {/* Validation error message for radio buttons */}
                            {question.answersOptions.every(
                              (option) => !option.isCorrect
                            ) && (
                              <p className="text-red-500">
                                At least one option must be selected.
                              </p>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                const newSkills = [...formData.skills];
                                const skillIndex = newSkills.findIndex(
                                  (s) => s.type === skill
                                );
                                const newParts = [
                                  ...newSkills[skillIndex].parts,
                                ];

                                // Add a new answer option
                                newParts[partIndex].questionTypeParts[
                                  qIndex
                                ].questions[qtnIndex].answersOptions.push({
                                  answerText: "",
                                  isCorrect: false, // Newly added answers should not be marked as correct by default
                                });

                                newSkills[skillIndex] = {
                                  ...newSkills[skillIndex],
                                  parts: newParts,
                                };

                                handleDataChange({
                                  ...formData,
                                  skills: newSkills,
                                });
                              }}
                              className="mt-2 w-32 text-[12px] px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                            >
                              Add Answer
                            </button>
                          </div>
                        </div>
                      )}

                      {qTypePart.questionType === 5 && (
                        <div className="w-5/12 flex flex-col">
                          <label className="text-gray-700 font-medium">
                            Answer
                          </label>
                          <div className="mt-1">
                            <label className="inline-flex items-center mr-4">
                              <input
                                type="radio"
                                name={`questionType-${partIndex}-${qIndex}`}
                                value={0}
                                checked={
                                  formData.skills[skill].parts[partIndex]
                                    .questionTypeParts[qIndex].questions[
                                    qtnIndex
                                  ].answerTrueFalse === 0
                                }
                                onChange={() => {
                                  const newSkills = [...formData.skills];
                                  const newParts = [...newSkills[skill].parts];

                                  // Đặt answerTrueFalse thành 0 (true)
                                  newParts[partIndex].questionTypeParts[
                                    qIndex
                                  ].questions[qtnIndex].answerTrueFalse = 0;

                                  // Cập nhật kỹ năng mới
                                  newSkills[skill] = {
                                    ...newSkills[skill],
                                    parts: newParts,
                                  };

                                  // Cập nhật formData với kỹ năng mới
                                  handleDataChange({
                                    ...formData,
                                    skills: newSkills,
                                  });
                                }}
                                className="form-radio"
                              />
                              <span className="ml-2">true</span>
                            </label>

                            <label className="inline-flex items-center mr-4">
                              <input
                                type="radio"
                                name={`questionType-${partIndex}-${qIndex}`}
                                value={1}
                                checked={
                                  formData.skills[skill].parts[partIndex]
                                    .questionTypeParts[qIndex].questions[
                                    qtnIndex
                                  ].answerTrueFalse === 1
                                }
                                onChange={() => {
                                  const newSkills = [...formData.skills];
                                  const newParts = [...newSkills[skill].parts];

                                  // Đặt answerTrueFalse thành 1 (false)
                                  newParts[partIndex].questionTypeParts[
                                    qIndex
                                  ].questions[qtnIndex].answerTrueFalse = 1;

                                  // Cập nhật kỹ năng mới
                                  newSkills[skill] = {
                                    ...newSkills[skill],
                                    parts: newParts,
                                  };

                                  // Cập nhật formData với kỹ năng mới
                                  handleDataChange({
                                    ...formData,
                                    skills: newSkills,
                                  });
                                }}
                                className="form-radio"
                              />
                              <span className="ml-2">false</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      addQuestion(partIndex, qIndex, qTypePart.questionType)
                    }
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                  >
                    Add Question
                  </button>
                </div>
              ))}

              {(skill === 0 || skill === 1) && (
                <button
                  type="button"
                  onClick={() => addQuestionTypePart(partIndex)}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                >
                  Add Question Type
                </button>
              )}

              <div className="flex gap-5">
                <button
                  type="button"
                  onClick={addPart}
                  className="mt-4 bg-green-500 text-sm text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  Add Part
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div
            className="cursor-ew-resize  bg-gray-300 rounded-full "
            style={{
              width: "3px",
              height: "100%",
            }}
            onMouseDown={() => startResizing("main")}
          />
        </div>

        <div className="p-2 w-1/2 h-[630px]">
          <h4>Preview </h4>
          {/* <AnswerSide parts={parts} /> */}
        </div>
      </div>
    </div>
  );
};

export default FormSkill;
