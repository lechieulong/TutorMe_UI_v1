import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uploadClassFile } from "../../redux/classes/ClassSlice";
import axios from "axios";
import InputFileUpload from "../../components/common/InputFileUpload";
import Notification from "../../components/common/Notification";
import Confirm from "../../components/common/Confirm";
import apiURLConfig from "../../redux/common/apiURLConfig";
const CreateClassFile = ({ onCreated, onClose, classId }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("yes");

  const type = location.pathname.includes("classDetail") ? "class" : "general";

  const handleSubmit = async () => {
    if (!file || !topic || !description) {
      setNotificationMessage("Please fill all required fields.");
      setNotificationType("no");
      return;
    }

    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    setConfirmOpen(false);

    try {
      const uploadResult = await dispatch(
        uploadClassFile({ classId, file })
      ).unwrap();

      const payload = {
        id: null,
        filePath: uploadResult.fileUrl,
        classId,
        uploadDate: new Date().toISOString(),
        topic,
        description,
      };

      const response = await axios.post(
        `${apiURLConfig.baseURL}/ClassFile`,
        payload
      );
      console.log("Response:", response.data);

      setNotificationMessage("Class file created successfully.");
      setNotificationType("yes");

      setFile(null);
      setTopic("");
      setDescription("");

      if (onCreated) onCreated();
    } catch (error) {
      console.error("Error creating class file:", error.response || error);
      setNotificationMessage("Failed to create class file.");
      setNotificationType("no");
    }
  };

  const handleFileUpload = ({ files }) => {
    if (files && files.length > 0) {
      setFile(files[0]);
      setNotificationMessage(`File ${files[0].name} selected successfully.`);
      setNotificationType("yes");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Create Class File
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            File Upload
          </label>
          <InputFileUpload type={type} onUpload={handleFileUpload} />
          {file && (
            <p className="mt-2 text-sm text-gray-500">
              Selected File: <span className="font-semibold">{file.name}</span>
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full border border-gray-300 rounded-md p-2"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>

      <Confirm
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        message="Are you sure you want to create this class file?"
        status="Confirmation"
      />

      <Notification
        message={notificationMessage}
        onClose={() => setNotificationMessage("")}
        shoud={notificationType}
      />
    </div>
  );
};

export default CreateClassFile;
