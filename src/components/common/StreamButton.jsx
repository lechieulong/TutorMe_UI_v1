import React, { useState } from "react";
import Modal from "react-modal";
import { createStreamSession } from "./LiveStreamFrame";

const FormWithModal = ({LiveStreamId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    Type: 0, // Mặc định là Public
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      borderRadius: "10px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTypeChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      Type: value,
    }));
  };

  const handleCreate = () => {
    console.log("Dữ liệu tạo:", formData);
    createStreamSession(LiveStreamId,formData.name,formData.Type,1);
    setIsModalOpen(false);
    window.location.href=`/live-stream?roomID=${LiveStreamId}`;
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
       Stream Now
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div>
          <h2 className="text-lg font-bold mb-4 text-center">Live Stream</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border rounded w-full px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Type:</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="Type"
                    value={0}
                    checked={formData.Type === 0}
                    onChange={() => handleTypeChange(0)}
                    className="mr-2"
                  />
                  Public
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="Type"
                    value={1}
                    checked={formData.Type === 1}
                    onChange={() => handleTypeChange(1)}
                    className="mr-2"
                  />
                  Private
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={handleCreate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Start
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default FormWithModal;
