import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useFieldArray, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const InputAnswer = ({ index, onChange, value, questionId }) => {
  const handleInputChange = (event) => {
    onChange(questionId, event.target.value); // Notify parent component about the change, including the questionId
  };

  return (
    <div>
      <input
        type="text"
        value={value} // Set the input value to reflect the user's answer
        placeholder={`Enter your answer #${index + 1}`}
        onChange={handleInputChange}
        className="editor-input p-2 border rounded"
      />
    </div>
  );
};

const Demo = ({
  skill,
  partIndex,
  sectionIndex,
  control,
  sectionType,
  setValue,
}) => {
  const [answers, setAnswers] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: `skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions`, // Use dynamic path to store answers
  });
  const editorRef = useRef(null);

  // Function to generate a unique questionId
  const generateUniqueQuestionId = () => uuidv4();

  // Function to replace existing questionId with a new unique one
  const replaceDuplicateIds = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const inputs = doc.querySelectorAll("input");

    inputs.forEach((input) => {
      let questionId = input.getAttribute("data-question-id");
      if (
        !questionId ||
        document.querySelector(`[data-question-id="${questionId}"]`)
      ) {
        // If there's no questionId or it's already taken, assign a new one
        questionId = generateUniqueQuestionId();
        input.setAttribute("data-question-id", questionId);
      }
    });

    return doc.body.innerHTML; // Return the modified content
  };

  const handleAnswerChange = (questionId, value) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(
      (answer) => answer.questionId === questionId
    );

    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex].answer = value;
    } else {
      newAnswers.push({
        questionId,
        answer: value,
        questionType: sectionType,
        isFromQuestionBank: false,
      });
    }
    const name = `skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions`;
    setValue(name, newAnswers);
    setAnswers(newAnswers);
  };

  const handleInputChange = (questionId, value) => {
    setAnswersInput((prevAnswers) => {
      const existingAnswer = prevAnswers.find(
        (answer) => answer.questionId === questionId
      );
      if (existingAnswer) {
        return prevAnswers.map((answer) =>
          answer.questionId === questionId
            ? { ...answer, answerText: value }
            : answer
        );
      } else {
        return [...prevAnswers, { questionId, answerText: value }];
      }
    });
  };

  const handleSubmit = () => {
    if (editorRef.current) {
      let editorContent = editorRef.current.getContent();

      // Replace any duplicate IDs before submitting the content
      editorContent = replaceDuplicateIds(editorContent);

      setSubmittedContent(editorContent);
    }
  };

  // Detect input fields dynamically in the editor's content
  const detectInputFields = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const inputs = doc.querySelectorAll("input");
    setInputFields(inputs); // Set input fields to state
  };

  const onEditorChange = (field, content) => {
    const updatedContent = replaceDuplicateIds(content); // Ensure no duplicate IDs
    detectInputFields(updatedContent); // Detect input fields in the updated content
    field.onChange(updatedContent); // Notify parent about the content change
  };

  return (
    <div>
      <p className="italic">
        Example: what is ABC{" "}
        <input placeholder="1" className="border border-1 border-gray-400" />{" "}
        hahahha what is ABC <br />
        <input
          placeholder="2"
          className="border border-1 border-gray-400"
        />{" "}
        hahahha
        <br />
        <span className="text-red-500">
          {" "}
          Notice that: you can click button "Insert input" to add answer for
          each question{" "}
        </span>
      </p>
      <Controller
        name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.sectionContext`}
        control={control}
        rules={{ required: "Section context is required" }} // Add validation
        render={({ field }) => (
          <div className="mb-2">
            <Editor
              onInit={(_, editor) => {
                editorRef.current = editor;
                editor.setContent(field.value || "<p>Start typing here...</p>");
              }}
              apiKey={import.meta.env.VITE_TINI_APIKEY}
              onEditorChange={(v) => onEditorChange(field, v)}
              initialValue={"<p>Start typing here ...</p>"} // Set initial value
              init={{
                height: "300px",
                menubar: "file edit view insert format tools table help",
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
                      const questionId = generateUniqueQuestionId(); // Generate unique questionId
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
          </div>
        )}
      />
      {inputFields.length > 0 && (
        <div>
          <p className="py-2 font-bold w-24">Answers </p>
          <div
            id="input-placeholder"
            className="flex flex-wrap gap-4 max-w-full overflow-x-auto"
          >
            {Array.from({ length: inputFields.length }).map((_, index) => {
              const questionId =
                inputFields[index].getAttribute("data-question-id");

              // Find the corresponding answer for the current questionId
              const answer = answers.find(
                (answer) => answer.questionId === questionId
              );
              const value = answer ? answer.answer : ""; // Use the answer if available, otherwise set to an empty string
              console.log(value);

              return (
                <div key={questionId} className="w-full sm:w-auto">
                  {" "}
                  {/* Adjusts the width based on screen size */}
                  <p className="text-center mt-2">{index + 1}</p>
                  <InputAnswer
                    index={index}
                    onChange={handleAnswerChange}
                    value={value} // Set the value of the input field
                    questionId={questionId}
                    control={control}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* {submittedContent && (
        <div className="mt-6 p-4 border border-gray-300">
          <h2>Submitted Content:</h2>
          <ParseHtml
            html={submittedContent}
            onInputChange={handleInputChange}
          />
        </div>
      )} */}
    </div>
  );
};

export default Demo;
