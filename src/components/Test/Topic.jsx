import React, { useState, useEffect } from "react";

const Topic = ({ partData }) => {
  const [content, setContent] = useState("");
  const [selection, setSelection] = useState(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (partData && partData.contentText) {
      setContent(partData.contentText); // Ensure content is set when partData changes
    } else {
      setContent(""); // Reset content if partData is invalid
    }
  }, [partData]);

  if (!partData) {
    return <p>Reading part not found.</p>;
  }

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const range = selection.getRangeAt(0);
      setSelection(range);

      // Calculate the position of the highlight button
      const rect = range.getBoundingClientRect();
      setButtonPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
      });
    } else {
      setSelection(null);
    }
  };

  const handleHighlight = () => {
    if (selection) {
      const range = selection;

      // Create a span to highlight the selected text
      const mark = document.createElement("mark");
      mark.appendChild(range.extractContents());
      range.insertNode(mark);

      // Update the content with highlighted text
      setContent((prevContent) => {
        // Use regex to retain the existing content while allowing highlights
        return prevContent.replace(/<mark>(.*?)<\/mark>/g, (match, p1) => {
          return `<mark>${p1}</mark>`; // Retain highlighted content
        });
      });

      setSelection(null); // Reset selection after highlighting
    }
  };

  return (
    <div className="p-5" onMouseUp={handleMouseUp}>
      <h2 className="text-lg mb-4">
        {partData.questionName || "Reading Part"}
      </h2>
      <div
        id="content"
        className="font-semibold"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {selection && (
        <button
          onClick={handleHighlight}
          className="bg-green-500 text-white px-2 py-1 rounded text-sm"
          style={{
            position: "absolute",
            top: buttonPosition.top,
            left: buttonPosition.left,
          }}
        >
          Highlight
        </button>
      )}
    </div>
  );
};

export default Topic;
