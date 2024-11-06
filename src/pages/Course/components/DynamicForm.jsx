import React, { useState } from "react";

function DynamicForm() {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});

  // Thêm một câu hỏi mới
  const addQuestion = (type) => {
    const newQuestion = {
      id: questions.length + 1,
      type: type,
      question: "",
      options: type === "radio" || type === "checkbox" ? ["", ""] : [],
    };
    setQuestions([...questions, newQuestion]);
  };

  // Cập nhật nội dung câu hỏi
  const updateQuestionText = (id, text) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, question: text } : q
    );
    setQuestions(updatedQuestions);
  };

  // Cập nhật câu trả lời của người dùng
  const handleResponseChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  // Cập nhật lựa chọn nếu là câu hỏi dạng radio hoặc checkbox
  const updateOption = (id, index, value) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === id) {
        const newOptions = [...q.options];
        newOptions[index] = value;
        return { ...q, options: newOptions };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  // Xử lý khi submit
  const handleSubmit = () => {
    console.log("Responses:", responses);
    // Gửi dữ liệu responses đến server hoặc xử lý tại đây
  };

  return (
    <div>
      <h1>Tạo biểu mẫu động</h1>

      {/* Hiển thị danh sách câu hỏi */}
      {questions.map((question) => (
        <div key={question.id} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Nhập nội dung câu hỏi"
            value={question.question}
            onChange={(e) => updateQuestionText(question.id, e.target.value)}
          />

          {/* Render các loại câu hỏi dựa trên type */}
          {question.type === "text" && (
            <input
              type="text"
              placeholder="Trả lời..."
              onChange={(e) =>
                handleResponseChange(question.id, e.target.value)
              }
            />
          )}

          {question.type === "radio" &&
            question.options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  onChange={(e) =>
                    handleResponseChange(question.id, e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Nhập lựa chọn"
                  value={option}
                  onChange={(e) =>
                    updateOption(question.id, index, e.target.value)
                  }
                />
              </div>
            ))}

          {question.type === "checkbox" &&
            question.options.map((option, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) =>
                    handleResponseChange(question.id, e.target.checked)
                  }
                />
                <input
                  type="text"
                  placeholder="Nhập lựa chọn"
                  value={option}
                  onChange={(e) =>
                    updateOption(question.id, index, e.target.value)
                  }
                />
              </div>
            ))}
        </div>
      ))}

      {/* Nút thêm câu hỏi */}
      <button onClick={() => addQuestion("text")}>Thêm câu hỏi văn bản</button>
      <button onClick={() => addQuestion("radio")}>
        Thêm câu hỏi lựa chọn
      </button>
      <button onClick={() => addQuestion("checkbox")}>
        Thêm câu hỏi chọn nhiều
      </button>

      {/* Nút submit */}
      <button onClick={handleSubmit}>Gửi biểu mẫu</button>
    </div>
  );
}

export default DynamicForm;
