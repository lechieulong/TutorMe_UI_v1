import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

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

const Demo = () => {
  const [answers, setAnswers] = useState([]); // To store user answers with questionId
  console.log("🚀 ~ Demo ~ answers:", answers);
  const [answersInput, setAnswersInput] = useState([]); // To store user answers with questionId
  console.log("🚀 ~ Demo ~ answersInput:", answersInput);
  const [inputFields, setInputFields] = useState([]); // To store detected input fields
  const [submittedContent, setSubmittedContent] = useState(""); // To store the submitted content
  console.log("🚀 ~ Demo ~ submittedContent:", submittedContent);
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
    if (editorRef.current) {
      answers.forEach((answer, index) => {
        console.log(
          `Answer from question ${answer.questionId}: ${answer.answer}`
        );
      });

      // Log the entire content of the editor
      console.log("Full editor content:", editorRef.current.getContent());
    }
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
  const detectInputFields = () => {
    if (editorRef.current) {
      const inputs = editorRef.current.getBody().querySelectorAll("input");
      setInputFields(inputs); // Set input fields to state
    }
  };

  // Monitor the editor content changes and detect input fields
  useEffect(() => {
    // Make sure the editor reference is initialized and not null
    if (editorRef.current) {
      // Initially detect input fields
      detectInputFields();

      // Set up an event listener to detect content changes
      const editor = editorRef.current;
      editor.on("change", detectInputFields); // Detect input fields on content change

      // Cleanup the event listener when the component is unmounted
      return () => {
        if (editor) {
          editor.off("change", detectInputFields);
        }
      };
    }
  }, []); // Only run once, after the initial mount

  // Function to handle the dynamic rendering of content with input fields
  const renderContentWithInputs = () => {
    let questionbank;
    let contentWithInputs = submittedContent;
    // answers.forEach((answer) => {
    //   // Replace placeholders with input elements (or just show the answer if it exists)
    //   const inputElement = `<input type="text" class="editor-input" value="${answer.answer}" data-question-id="${answer.questionId}" />`;
    //   contentWithInputs = contentWithInputs.replace(
    //     `{{questionId:${answer.questionId}}}`,
    //     inputElement
    //   );
    // });
    return contentWithInputs;
  };

  return (
    <div>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)} // Initialize editor reference
        apiKey={import.meta.env.VITE_TINI_APIKEY} // Your TinyMCE API key
        initialValue="<p>Start typing here...</p>"
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
            // Custom button for inserting InputAnswer components
            editor.ui.registry.addButton("insertinput", {
              text: "Insert Input",
              onAction: () => {
                const questionId = new Date().getTime(); // Generate a unique questionId
                editor.insertContent(
                  ` <input type="text" placeholder="Enter your answer" class="editor-input" data-question-id="${questionId}" />`
                );
                // Trigger input field detection after content is changed
                detectInputFields();
              },
            });
          },
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />

      {/* Conditionally render InputAnswer components based on presence of input elements */}
      {inputFields.length > 0 && (
        <div id="input-placeholder">
          {Array.from({ length: inputFields.length }).map((_, index) => {
            const questionId =
              inputFields[index].getAttribute("data-question-id");
            return (
              <InputAnswer
                key={questionId} // Use questionId as key
                index={index}
                onChange={handleAnswerChange}
                value={
                  answers.find((answer) => answer.questionId === questionId)
                    ?.answer || ""
                } // Bind answer state to the input field
                questionId={questionId} // Pass questionId to InputAnswer
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

      {/* Render submitted content with input fields */}
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
