import React from "react";

const FillInTheBlankQuestion = ({ order, text, blanks, onAnswerChange }) => {
  const handleInputChange = (id, value) => {
    onAnswerChange(id, value);
  };

  const renderQuestionWithBlanks = () => {
    const regex = /\[bl(\d+)\]/g; // Regex để tìm các vị trí [bl<number>] trong text
    let parts = []; // Mảng để lưu các đoạn văn bản và input
    let lastIndex = 0; // Chỉ số cuối cùng đã được xử lý
    let match; // Biến để lưu kết quả match khi sử dụng regex

    while ((match = regex.exec(text)) !== null) {
      const startIndex = match.index; // Vị trí bắt đầu của [bl<number>] trong text
      const endIndex = startIndex + match[0].length; // Vị trí kết thúc của [bl<number>]

      // Thêm đoạn văn bản từ vị trí lastIndex đến startIndex
      if (startIndex > lastIndex) {
        parts.push(text.substring(lastIndex, startIndex));
      }

      const blankId = parseInt(match[1], 10); // Lấy số bên trong [bl<number>]
      const blank = blanks.find((b) => b.id === blankId); // Tìm đối tượng blank tương ứng trong mảng blanks

      if (blank) {
        // Thêm thẻ input vào mảng parts
        parts.push(
          <input
            key={blankId}
            type="text"
            placeholder={order++} // Placeholder cho input
            onChange={(e) => handleInputChange(blankId, e.target.value)} // Hàm xử lý khi thay đổi giá trị input
            className="border px-2 w-36 ml-1 rounded-lg "
          />
        );
      }

      lastIndex = endIndex; // Cập nhật lastIndex để xử lý tiếp đoạn sau
    }

    // Thêm phần văn bản còn lại sau [bl<number>] cuối cùng
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts;
  };

  return (
    <div className="p-5 ">
      <p>{renderQuestionWithBlanks()}</p>
    </div>
  );
};

export default FillInTheBlankQuestion;
