import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import apiURLConfig from "../common/apiURLConfig";
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
export const fetchCourseLessons = createAsyncThunk(
  "courseLessons/fetchCourseLessons",
  async ({ coursePartId, token, mentorAndList }, { rejectWithValue }) => {
    try {
      // Constructing the API URL with dynamic coursePartId
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseLessons/CoursePart/${coursePartId}`, // Using coursePartId dynamically
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Check if the response contains courseLessons data
      if (response.data && response.data.courseLessons) {
        // Creating collapsed state for lessons
        const initialCollapsedState = response.data.courseLessons.reduce(
          (acc, lesson) => ({ ...acc, [lesson.id]: !mentorAndList }), // Using mentorAndList to determine the collapsed state
          {}
        );

        return {
          courseLessons: response.data.courseLessons, // Returning the course lessons data
          collapsedLessons: initialCollapsedState, // Returning the collapsed state for each lesson
        };
      } else {
        // If the response does not have the expected data structure, throw an error
        return rejectWithValue("Don't have any course's lesson");
      }
    } catch (err) {
      // Handle errors and reject with the error message
      console.error("Don't have any course's lesson");
      return rejectWithValue("Failed to fetch course lessons");
    }
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
      })
      .addCase(fetchCourseLessons.rejected, (state, action) => {
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
