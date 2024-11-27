import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

// Separate InputAnswer component to handle input field
const InputAnswer = ({ index, onChange }) => {
  const handleInputChange = (event) => {
    onChange(index, event.target.value); // Notify parent component about the change
  };

  return (
    <div>
      <input
        type="text"
        placeholder={`Enter your answer #${index}`}
        onChange={handleInputChange}
        className="editor-input p-2 border rounded"
      />
    </div>
  );
};

const Demo = () => {
  const [answers, setAnswers] = useState([]); // To store user answers
  const [inputFields, setInputFields] = useState([]); // To store detected input fields
  const editorRef = useRef(null);

  // Handle the input change
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Collect all content including answers from the input fields
  const logContent = () => {
    if (editorRef.current) {
      // Log the answers
      answers.forEach((answer, index) => {
        console.log(`Answer from input #${index + 1}: ${answer}`);
      });

      // Log the entire content of the editor
      console.log("Full editor content:", editorRef.current.getContent());
    }
  };

  // Detect input fields dynamically in the editor's content
  const detectInputFields = () => {
    if (editorRef.current) {
      const inputs = editorRef.current.getBody().querySelectorAll("input");
      setInputFields(inputs);
    }
  };

  // Monitor the editor content changes and detect input fields
  useEffect(() => {
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
  }, []);

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
                editor.insertContent(
                  ' <input type="text" placeholder="Enter your answer" class="editor-input" />'
                );
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
          {Array.from({ length: inputFields.length }).map((_, index) => (
            <InputAnswer
              key={index}
              index={index}
              onChange={handleAnswerChange}
            />
          ))}
        </div>
      )}

      <button
        onClick={logContent}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Log Content
      </button>
    </div>
  );
};

export default Demo;
