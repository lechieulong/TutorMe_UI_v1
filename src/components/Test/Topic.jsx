import React, { useState } from "react";

const Topic = ({ partData, part }) => {
  const reading = partData[part];
  const [content, setContent] = useState(reading?.content || "");
  const [selection, setSelection] = useState(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  if (!reading) {
    return <p>Reading part not found.</p>;
  }

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const range = selection.getRangeAt(0);
      setSelection(range);

      // Tính toán vị trí của nút "Highlight"
      const rect = range.getBoundingClientRect();
      setButtonPosition({
        top: rect.bottom + window.scrollY + 5, // Cộng thêm khoảng cách nhỏ
        left: rect.left + window.scrollX,
      });
    } else {
      setSelection(null);
    }
  };

  const handleHighlight = () => {
    if (selection) {
      const range = selection;

      // Tạo một span chứa nội dung được bôi vàng
      const mark = document.createElement("mark");
      mark.appendChild(range.extractContents());
      range.insertNode(mark);

      // Cập nhật lại nội dung đã được chỉnh sửa
      const updatedContent = document.getElementById("content").innerHTML;
      setContent(updatedContent);

      setSelection(null); // Reset selection sau khi bôi đậm
    }
  };

  return (
    <div className="p-5" onMouseUp={handleMouseUp}>
      <h2 className="text-lg mb-4">{reading.name}</h2>
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
