import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";

const Topic = ({ partData }) => {
  const [content, setContent] = useState("");
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [selection, setSelection] = useState(null);
  const [showButtons, setShowButtons] = useState(false);

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
    const selectedText = window.getSelection().toString();

    if (selectedText) {
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setButtonPosition({
        top: rect.bottom + window.scrollY - 120,
        left: rect.left + window.scrollX,
      });
      setSelection(selectedText);
      setShowButtons(true); // Show buttons when text is selected
    } else {
      setSelection(null); // Reset selection if nothing is selected
      setShowButtons(false); // Hide buttons if no selection
    }
  };

  const handleHighlight = () => {
    if (selection && !highlightedWords.includes(selection)) {
      setHighlightedWords((prev) => [...prev, selection]); // Add to highlighted words
    }
    setSelection(null); // Reset selection
    setShowButtons(false); // Hide buttons after highlighting
  };

  const handleRemoveHighlight = (word) => {
    setHighlightedWords((prev) =>
      prev.filter((highlight) => highlight !== word)
    );
    setShowButtons(false); // Hide buttons after removing highlight
  };

  return (
    <div className="p-5" onMouseUp={handleMouseUp}>
      <h2 className="text-lg mb-4">
        {partData.questionName || "Reading Part"}
      </h2>
      <div className="font-semibold">
        <Highlighter
          highlightClassName="bg-yellow-300" // Highlight color
          searchWords={highlightedWords}
          autoEscape={true}
          textToHighlight={content || ""}
        />
      </div>

      {/* Buttons for highlighting */}
      {showButtons && selection && (
        <div
          className="absolute"
          style={{
            top: buttonPosition.top,
            left: buttonPosition.left,
          }}
        >
          <button
            onClick={handleHighlight}
            className="bg-green-500 text-white px-1 py-1 rounded text-xs mr-1"
          >
            Highlight
          </button>
          <button
            onClick={() => handleRemoveHighlight(selection)}
            className="bg-red-500 text-white px-1 py-1 rounded text-xs"
          >
            Remove
          </button>
        </div>
      )}

      <p className="text-sm text-gray-600 mt-2">
        Select text to highlight or remove highlights.
      </p>
    </div>
  );
};

export default Topic;
