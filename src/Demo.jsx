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
  const [answers, setAnswers] = useState([]);
  const [answersInput, setAnswersInput] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const [submittedContent, setSubmittedContent] = useState("");
  const editorRef = useRef(null);

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
      const editorContent = editorRef.current.getContent();

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
                        `<input type="text"  class="editor-input" data-question-id="${questionId}" />`
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
          <p className="py-2 text- font-bold">Answers </p>
          <div id="input-placeholder" className="flex gap-4">
            {Array.from({ length: inputFields.length }).map((_, index) => {
              const questionId =
                inputFields[index].getAttribute("data-question-id");
              return (
                <>
                  <p className="text-center  mt-2">{index + 1}</p>
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
                </>
              );
            })}
          </div>
        </div>
      )}

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
