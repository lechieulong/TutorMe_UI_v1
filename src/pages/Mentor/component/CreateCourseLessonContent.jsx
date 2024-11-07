import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser } from "../../../service/GetUser";
import useAuthToken from "../../../hooks/useAuthToken";
import Cookies from "js-cookie";

const CreateCourseLessonContent = ({
  courseLessonId,
  onClose,
  onContentCreated,
}) => {
  const authToken = useAuthToken();
  const [user, setUser] = useState(null);
  const [contentData, setContentData] = useState({
    courseLessonId: courseLessonId,
    userId: "",
    contentType: "",
    contentText: "",
    contentUrl: "",
    order: 0,
    file: null,
  });
  const token = Cookies.get("authToken");

  useEffect(() => {
    if (authToken) {
      const fetchUser = async () => {
        const fetchedUser = await getUser();
        setUser(fetchedUser);
        setContentData((prevContentData) => ({
          ...prevContentData,
          userId: fetchedUser.sub,
        }));
      };
      fetchUser();
    }
  }, [authToken]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contentType" && value !== "video") {
      setContentData((prev) => ({ ...prev, contentUrl: "", file: null }));
    }

    setContentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentUrlChange = (e) => {
    const value = e.target.value;
    let videoId = value;

    if (contentData.contentType === "video") {
      const match = value.match(/[?&]v=([^&]+)/);
      if (match) {
        videoId = match[1];
      }
    }

    setContentData((prev) => ({ ...prev, contentUrl: videoId }));
  };

  const handleQuillChange = (value) => {
    setContentData((prev) => ({ ...prev, contentText: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && contentData.userId) {
      setContentData((prev) => ({
        ...prev,
        file: file,
        contentUrl: `https://hydra13.blob.core.windows.net/${contentData.userId}/${file.name}`,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (contentData.contentType !== "video" && contentData.file) {
        const fileUploadData = new FormData();
        fileUploadData.append("file", contentData.file);
        fileUploadData.append("userId", contentData.userId);

        await axios.post(`https://localhost:7030/api/upload`, fileUploadData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      const lessonContentData = {
        courseLessonId: contentData.courseLessonId,
        contentType: contentData.contentType,
        contentText: contentData.contentText,
        contentUrl: contentData.contentUrl,
        order: contentData.order,
        userId: contentData.userId,
      };

      await axios.post(
        "https://localhost:7030/api/CourseLessonContent",
        lessonContentData
      );
      setSuccess(true);

      if (onContentCreated) onContentCreated();
      onClose();
    } catch (err) {
      console.error("Error response:", err.response);
      setError("Failed to create course lesson content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Content Type
          </label>
          <select
            name="contentType"
            value={contentData.contentType}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          >
            <option value="">Select content type</option>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
            <option value="file">File</option>
          </select>
        </div>

        {contentData.contentType === "text" ? (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Content Text
            </label>
            <ReactQuill
              value={contentData.contentText}
              onChange={handleQuillChange}
              placeholder="Enter content text"
            />
          </div>
        ) : contentData.contentType === "file" ? (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Upload File
            </label>
            <input
              type="file"
              name="contentUrl"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              required
            />
          </div>
        ) : contentData.contentType === "image" ? (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Content Image
            </label>
            <input
              type="file"
              name="contentUrl"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              required
            />
          </div>
        ) : contentData.contentType === "audio" ? (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Content Audio
            </label>
            <input
              type="file"
              name="contentUrl"
              onChange={handleFileChange}
              accept="audio/mpeg"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              required
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Video URL</label>
            <input
              type="text"
              name="contentUrl"
              value={contentData.contentUrl}
              onChange={handleContentUrlChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Enter video URL"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Order</label>
          <input
            type="number"
            name="order"
            value={contentData.order}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            placeholder="Enter display order"
            min="0"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Content"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 mt-4">Content created successfully!</p>
        )}
      </form>
    </div>
  );
};

export default CreateCourseLessonContent;
