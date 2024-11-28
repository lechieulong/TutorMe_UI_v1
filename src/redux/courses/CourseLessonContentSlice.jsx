import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  courseSkills: [],
  skillDescriptions: {},
  activeTab: null,
  status: "idle",
  error: null,
  uploadedFileUrl: null,
  success: false,
  isFileUploading: false,
};

// Thunk để upload file
export const uploadCourseFile = createAsyncThunk(
  "courseLessonContent/uploadCourseFile",
  async ({ type, id, file, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `https://localhost:7030/api/upload-course-file?type=${type}&id=${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fileName = response.data.fileName || file.name;
      const fileEndpoint = `https://thientvhde160268.blob.core.windows.net/courselessoncontent/${id}/${fileName}`;

      return { fileUrl: fileEndpoint };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to upload file. Please try again."
      );
    }
  }
);

export const createCourseLessonContentSlice = createAsyncThunk(
  "courseLessonContent/createCourseLessonContentSlice",
  async ({ courseLessonId, contentData, token }, { rejectWithValue }) => {
    try {
      let contentUrl = contentData.contentUrl;

      // Nếu contentType là file và có file được chọn
      if (contentData.contentType === "file" && contentData.file) {
        const formData = new FormData();
        formData.append("file", contentData.file);

        const uploadResponse = await axios.post(
          `https://localhost:7030/api/upload-course-file?type=courselessoncontent&id=${courseLessonId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const fileName = uploadResponse.data.fileName || contentData.file.name;
        contentUrl = `https://thientvhde160268.blob.core.windows.net/courselessoncontent/${courseLessonId}/${fileName}`;
      }

      const lessonContentData = {
        courseLessonId: contentData.courseLessonId,
        contentType: contentData.contentType,
        contentText: contentData.contentText,
        contentUrl: contentUrl,
        order: contentData.order,
        userId: contentData.userId,
      };

      await axios.post(
        "https://localhost:7030/api/CourseLessonContent",
        lessonContentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { success: true };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create course lesson content."
      );
    }
  }
);

const courseLessonContent = createSlice({
  name: "courseLessonContent",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = "idle";
      state.error = null;
      state.success = false;
      state.uploadedFileUrl = null;
      state.isFileUploading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadCourseFile.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.uploadedFileUrl = null;
        state.isFileUploading = true;
      })
      .addCase(uploadCourseFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.uploadedFileUrl = action.payload.fileUrl;
        state.isFileUploading = false;
      })
      .addCase(uploadCourseFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error occurred.";
        state.isFileUploading = false;
      })
      .addCase(createCourseLessonContentSlice.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.success = false;
        state.isFileUploading = true;
      })
      .addCase(createCourseLessonContentSlice.fulfilled, (state) => {
        state.status = "succeeded";
        state.success = true;
        state.isFileUploading = false;
      })
      .addCase(createCourseLessonContentSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error occurred.";
        state.isFileUploading = false;
      });
  },
});

export const { resetState } = courseLessonContent.actions;

export default courseLessonContent.reducer;
