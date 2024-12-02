import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useFieldArray, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const InputAnswer = ({ index, onChange, value, questionId }) => {
  const handleInputChange = (event) => {
    onChange(questionId, event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder={`Answer #${index + 1}`}
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
  const editorRef = useRef(null);

  // Generate a unique questionId
  const generateUniqueQuestionId = () => uuidv4();

  // Ensure all input fields in content have unique IDs
  const replaceDuplicateIds = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const inputs = doc.querySelectorAll("input");
    const seenIds = new Set();

    inputs.forEach((input) => {
      let questionId = input.getAttribute("data-question-id");
      if (!questionId || seenIds.has(questionId)) {
        questionId = generateUniqueQuestionId();
        input.setAttribute("data-question-id", questionId);
      }
      seenIds.add(questionId);
    });

    return doc.body.innerHTML;
  };

  const handleAnswerChange = (questionId, value) => {
    const updatedAnswers = answers.map((answer) =>
      answer.questionId === questionId ? { ...answer, answer: value } : answer
    );
    if (!updatedAnswers.some((answer) => answer.questionId === questionId)) {
      updatedAnswers.push({
        questionId,
        answer: value,
        questionType: sectionType,
        isFromQuestionBank: false,
      });
    }
    setAnswers(updatedAnswers);

    const name = `skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.questions`;
    setValue(name, updatedAnswers);
  };

  const onEditorChange = (field, content) => {
    const updatedContent = replaceDuplicateIds(content); // Ensure no duplicate IDs
    field.onChange(updatedContent);

    const parser = new DOMParser();
    const doc = parser.parseFromString(updatedContent, "text/html");
    const inputs = Array.from(doc.querySelectorAll("input"));

    const detectedAnswers = inputs.map((input) => {
      const questionId = input.getAttribute("data-question-id");
      const existingAnswer = answers.find(
        (answer) => answer.questionId === questionId
      );
      return existingAnswer || { questionId, answer: "" };
    });

    setAnswers(detectedAnswers);
  };

  return (
    <div>
      <p className="italic">
        Example: What is ABC{" "}
        <input placeholder="1" className="border border-gray-400" /> hahahha.
        <br />
        <input placeholder="2" className="border border-gray-400" /> hahahha.
        <br />
        <span className="text-red-500">
          Notice: Use the "Insert Input" button to add input fields.
        </span>
      </p>
      <Controller
        name={`skills.${skill}.parts.${partIndex}.sections.${sectionIndex}.sectionContext`}
        control={control}
        rules={{ required: "Section context is required" }}
        render={({ field }) => (
          <Editor
            onInit={(_, editor) => {
              editorRef.current = editor;
              editor.setContent(field.value || "<p>Start typing here...</p>");
            }}
            apiKey={import.meta.env.VITE_TINI_APIKEY}
            onEditorChange={(content) => onEditorChange(field, content)}
            init={{
              height: 300,
              menubar: true,
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
                "alignright alignjustify | bullist numlist outdent indent | removeformat | insertinput",
              setup: (editor) => {
                editor.ui.registry.addButton("insertinput", {
                  text: "Insert Input",
                  onAction: () => {
                    const questionId = generateUniqueQuestionId();
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
        )}
      />
      <div className="py-4">
        <h2 className="font-bold">Answers:</h2>
        <div className="flex flex-wrap gap-4">
          {answers.map((answer, index) => (
            <InputAnswer
              key={answer.questionId}
              index={index}
              questionId={answer.questionId}
              value={answer.answer}
              onChange={handleAnswerChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Demo;
