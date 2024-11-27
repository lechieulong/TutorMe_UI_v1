import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import JoditEditor from "jodit-react";
import { getUser } from "../../../service/GetUser";
import useAuthToken from "../../../hooks/useAuthToken";

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
    contentUrl: "", // Đây sẽ là API endpoint
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
    setContentData((prev) => ({ ...prev, contentUrl: value })); // Gán giá trị mới cho contentUrl
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file && contentData.userId) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        console.log("Uploading file with data:", {
          file: file.name,
          courseLessonId,
        });

        const response = await axios.post(
          `https://localhost:7030/api/upload-course-file?type=courseLesson&id=${courseLessonId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const fileUrl = response.data.FileUrl;
        setContentData((prev) => ({
          ...prev,
          file: file,
          contentUrl: fileUrl, // Cập nhật contentUrl từ kết quả upload
        }));
      } catch (error) {
        console.error("Error uploading file:", error.response || error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("Data sent to API:", {
        courseLessonId: contentData.courseLessonId,
        contentType: contentData.contentType,
        contentText: contentData.contentText,
        contentUrl: contentData.contentUrl, // Log giá trị contentUrl
        order: contentData.order,
        userId: contentData.userId,
      });

      const lessonContentData = {
        courseLessonId: contentData.courseLessonId,
        contentType: contentData.contentType,
        contentText: contentData.contentText,
        contentUrl: contentData.contentUrl,
        order: contentData.order,
        userId: contentData.userId,
      };

      // Gửi request API với contentUrl là một phần payload
      await axios.post(
        "https://localhost:7030/api/CourseLessonContent",
        lessonContentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    <div
      className={`p-6 bg-white rounded-lg shadow-lg mx-auto ${
        contentData.contentType === "text" ? "max-w-2xl" : "max-w-md"
      }`}
    >
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
            <JoditEditor
              value={contentData.contentText}
              onBlur={handleJoditChange}
              // onChange={handleJoditChange}
              config={{
                placeholder: "Enter content text",
              }}
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
