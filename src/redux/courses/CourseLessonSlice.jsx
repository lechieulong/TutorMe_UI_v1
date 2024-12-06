import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Định nghĩa initialState
const initialState = {
  courseLessons: [],
  testExams: [], // Danh sách các bài kiểm tra
  dynamicForms: [],
  collapsedLessons: {},
  status: "idle", // idle, loading, succeeded, failed
  notification: "",
  error: null,
};

// Tạo async thunk để fetch courseLessons
export const fetchCourseLessons = createAsyncThunk(
  "courseLesson/fetchCourseLessons",
  async (coursePartId) => {
    const token = Cookies.get("authToken");
    const response = await axios.get(
      `https://localhost:7030/api/CourseLessons/CoursePart/${coursePartId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.courseLessons;
  }
);

// Tạo async thunk để fetch TestExams
export const fetchTestExams = createAsyncThunk(
  "testExams/fetchTestExams",
  async (lessonId) => {
    const response = await axios.get(
      `https://localhost:7030/api/CourseLessons/GetTestExamByLessonId/${lessonId}`
    );
    return { lessonId, testExams: response.data }; // Trả về lessonId và testExams
  }
);

// Tạo slice
const courseLessonSlice = createSlice({
  name: "courseLesson",
  initialState,
  reducers: {
    addDynamicForm: (state, action) => {
      state.dynamicForms.push({
        id: Date.now(),
        lessonId: action.payload,
      });
      state.notification = "Dynamic form added successfully.";
    },
    removeDynamicForm: (state, action) => {
      state.dynamicForms = state.dynamicForms.filter(
        (form) => form.id !== action.payload
      );
      state.notification = "Dynamic form removed successfully.";
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    toggleCollapse: (state, action) => {
      state.collapsedLessons[action.payload] =
        !state.collapsedLessons[action.payload];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseLessons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourseLessons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courseLessons = action.payload;
        state.collapsedLessons = action.payload.reduce(
          (acc, lesson) => ({ ...acc, [lesson.id]: true }),
          {}
        );
      })
      .addCase(fetchCourseLessons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTestExams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTestExams.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { lessonId, testExams } = action.payload; // Lấy lessonId và testExams từ payload
        const existingLesson = state.testExams.find(
          (exam) => exam.lessonId === lessonId
        );
        if (existingLesson) {
          existingLesson.testExams = testExams; // Cập nhật bài kiểm tra nếu đã tồn tại
        } else {
          state.testExams.push({ lessonId, testExams }); // Thêm bài kiểm tra mới
        }
      })
      .addCase(fetchTestExams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addDynamicForm,
  removeDynamicForm,
  setNotification,
  toggleCollapse,
  setError,
} = courseLessonSlice.actions;

export default courseLessonSlice.reducer;
