import React, { useState, useEffect } from "react";

const NoteCard = ({ onClose }) => {
  const [note, setNote] = useState("");
  const [position, setPosition] = useState({ x: 900, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Load the saved note from localStorage
  useEffect(() => {
    const savedNote = localStorage.getItem("tempNote");
    if (savedNote) {
      setNote(savedNote);
    }

    const clearNoteOnUnload = () => {
      localStorage.removeItem("tempNote");
    };
  }, []);

  // Save the note to localStorage when the note changes
  useEffect(() => {
    if (note) {
      localStorage.setItem("tempNote", note);
    }
  }, [note]);

  const handleNoteChange = (e) => {
    setNote(e.target.value); // Automatically saves to localStorage
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const card = document.getElementById("note-card");
      if (card && !card.contains(event.target)) {
        onClose(); // Close the note card
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const clearNoteData = () => {
    localStorage.removeItem("tempNote");
    setNote(""); // Also clear the note state
  };

  return (
    <div
      id="note-card"
      className="fixed bg-gray-100 shadow-lg p-4 rounded-lg w-80"
      style={{
        top: position.y,
        left: position.x,
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: 9999,
        border: "2px solid #4CAF50", // Green border
      }}
      onMouseDown={handleMouseDown}
    >
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Take Note</h2>
      <textarea
        className="w-full h-44 border border-gray-300 p-2 rounded"
        value={note}
        onChange={handleNoteChange}
        placeholder="Write your notes here..."
        style={{ backgroundColor: "#F9F9F9", color: "#333" }}
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={() => {
            onClose();
          }}
          className="bg-red-500 text-white rounded px-2 py-1 ml-2 hover:bg-red-600 transition text-sm"
        >
          Close
        </button>
        {/* <button
          onClick={clearNoteData} // Clear data button
          className="bg-red-500 text-white rounded px-2 py-1 ml-2 hover:bg-red-600 transition text-sm"
        >
          Clear data
        </button> */}
      </div>
    </div>
  );
};

export default NoteCard;
