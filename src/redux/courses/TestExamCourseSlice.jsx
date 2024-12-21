// redux/slices/testExamsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiURLConfig from "../common/apiURLConfig";
// Thunk để lấy dữ liệu test exams
export const fetchTestExamsInLesson = createAsyncThunk(
  "testExams/fetchTestExams",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseLessons/GetTestExamByLessonId/${lessonId}`
      );
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      } else {
        return rejectWithValue("No TestExams found for the lesson.");
      }
    } catch (err) {
      return rejectWithValue("Error fetching test exams.");
    }
  }
);

const testExamCourseSlice = createSlice({
  name: "testExams",
  initialState: {
    testExams: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestExamsInLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestExamsInLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.testExams = action.payload;
      })
      .addCase(fetchTestExamsInLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default testExamCourseSlice.reducer;
