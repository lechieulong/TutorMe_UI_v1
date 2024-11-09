import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURLConfig from "../common/apiURLConfig";

// Thunk để lấy tất cả khóa học
export const fetchCourses = createAsyncThunk("courses/getCourses", async () => {
  try {
    const response = await axios.get("https://localhost:7030/api/Courses");
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

// Thunk để lấy khóa học theo UserId
export const fetchCoursesByUserId = createAsyncThunk(
  "courses/getCoursesByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/Courses/user/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch courses by UserId."
      );
    }
  }
);

// Thunk để lấy lớp học từ courseId
export const fetchClasses = createAsyncThunk(
  "courses/getClassesOfCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/Courses/${courseId}/classes`
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get classes from course."
      );
    }
  }
);

// Thêm Thunk mới để lấy các CourseParts từ CourseId
export const fetchCourseParts = createAsyncThunk(
  "courses/getCourseParts",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseParts/ByCourse/${courseId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch course parts."
      );
    }
  }
);

// Thêm Thunk mới để lấy các CourseLessons từ CoursePartId
export const fetchCourseLessons = createAsyncThunk(
  "courses/getCourseLessons",
  async (coursePartId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseLessons?coursePartId=${coursePartId}`
      );
      return { coursePartId, lessons: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          `Failed to fetch lessons for CoursePart ${coursePartId}`
      );
    }
  }
);

const initialState = {
  courses: [],
  classes: [],
  courseParts: [],
  courseLessonsByPart: {},
  count: 0,
  status: "idle",
  error: null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "success";
        state.courses = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCoursesByUserId.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCoursesByUserId.fulfilled, (state, action) => {
        state.status = "success";
        state.courses = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchCoursesByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchClasses.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = "success";
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCourseParts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCourseParts.fulfilled, (state, action) => {
        state.status = "success";
        state.courseParts = action.payload;
      })
      .addCase(fetchCourseParts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCourseLessons.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCourseLessons.fulfilled, (state, action) => {
        state.status = "success";
        state.courseLessonsByPart[action.payload.coursePartId] =
          action.payload.lessons;
      })
      .addCase(fetchCourseLessons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default courseSlice.reducer;
