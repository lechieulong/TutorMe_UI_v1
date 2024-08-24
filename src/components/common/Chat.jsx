// src/components/common/Chat.jsx

import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const Chat = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 p-2 border border-gray-200 rounded-lg"
            >
              <img
                src=""
                // {`https://ui-avatars.com/api/?name=${msg.username}&background=random&color=fff&rounded=true`} // Lấy avatar từ api
                // alt={msg.username}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <div className="font-semibold">{msg.username}</div>
                <div>{msg.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

// Define PropTypes đơn giản
Chat.propTypes = {
  messages: PropTypes.array.isRequired, // Mảng tin nhắn
  onSendMessage: PropTypes.func.isRequired, // Hàm gửi tin nhắn
};

export default Chat;
