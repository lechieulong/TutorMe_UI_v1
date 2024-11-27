import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useFieldArray, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

// Separate InputAnswer component to handle input field
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
  const { fields, append, remove } = useFieldArray({
    name: `skills.${skill}.parts.${partIndex}.sections.${sectionIndex}`,
    control,
  });

  const [answers, setAnswers] = useState([]); // To store user answers with questionId
  const [answersInput, setAnswersInput] = useState([]); // To store user answers with questionId
  const [inputFields, setInputFields] = useState([]); // To store detected input fields
  const [submittedContent, setSubmittedContent] = useState(""); // To store the submitted content
  const editorRef = useRef(null);

  //   Handle the input change
  const handleAnswerChange = (questionId, value) => {
    // Update the answers array with the answer and its associated questionId
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(
      (answer) => answer.questionId === questionId
    );

    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex].answer = value; // Update the existing answer
    } else {
      newAnswers.push({ questionId, answer: value }); // Add a new answer with the questionId
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

  // Collect all content including answers from the input fields
  const logContent = () => {
    // if (editorRef.current) {
    //   answers.forEach((answer, index) => {
    //     console.log(
    //       `Answer from question ${answer.questionId}: ${answer.answer}`
    //     );
    //   });

    //   // Log the entire content of the editor
    //   console.log("Full editor content:", editorRef.current.getContent());
    // }
    answersInput.forEach((answer, index) => {
      console.log(
        `Answer from question ${answer.questionId}: ${answer.answerText}`
      );
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (editorRef.current) {
      // Collect the content from the editor and answers
      const editorContent = editorRef.current.getContent();

      // Set the submitted content in the state
      setSubmittedContent(editorContent);

      // Here you can send the answers and content to the backend
      // Example:
      // fetch('/submit', {
      //   method: 'POST',
      //   body: JSON.stringify({ content: contentToSubmit, answers }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
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
    detectInputFields(content);
    field.onChange(content);
  };

  return (
    <div>
      <Controller
        name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.sectionContext`}
        control={control}
        rules={{ required: "Section context is required" }} // Add validation
        render={({ field }) => (
          <div className="mb-2">
            <Editor
              onInit={(_, editor) => (editorRef.current = editor)}
              apiKey={import.meta.env.VITE_TINI_APIKEY}
              onEditorChange={(v) => onEditorChange(field, v)}
              initialValue={"<p>Start typing here...</p>"} // Set initial value
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
                      const questionId = uuidv4(); // Generate unique questionId
                      editor.insertContent(
                        `<input type="text" placeholder="Enter your answer" class="editor-input" data-question-id="${questionId}" />`
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
        <div id="input-placeholder">
          {Array.from({ length: inputFields.length }).map((_, index) => {
            const questionId =
              inputFields[index].getAttribute("data-question-id");
            return (
              <InputAnswer
                key={questionId}
                index={index}
                onChange={handleAnswerChange}
                value={
                  answers.find((answer) => answer.questionId === questionId)
                    ?.answer || ""
                }
                questionId={questionId}
                control={control}
              />
            );
          })}
        </div>
      )}

      <button
        onClick={logContent}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Log Content
      </button>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>

      {submittedContent && (
        <div className="mt-6 p-4 border border-gray-300">
          <h2>Submitted Content:</h2>
          <ParseHtml
            html={submittedContent}
            onInputChange={handleInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default Demo;

const ParseHtml = ({ html, onInputChange }) => {
  useEffect(() => {
    const inputs = document.querySelectorAll("input[data-question-id]");

    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        const questionId = input.getAttribute("data-question-id");
        const value = input.value;

        if (questionId) {
          onInputChange(questionId, value);
        }
      });
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("change", () => {});
      });
    };
  }, [html, onInputChange]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
