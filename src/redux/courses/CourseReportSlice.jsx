import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiURLConfig from "../common/apiURLConfig";

// Initial state
const initialState = {
  reports: [], // Danh sách các báo cáo
  status: "idle", // Trạng thái: idle | loading | succeeded | failed
  error: null, // Lỗi nếu có
};

// Async Thunk để tạo mới CourseReport
export const createCourseReport = createAsyncThunk(
  "courseReport/createCourseReport", // Tên của action
  async (reportData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiURLConfig.baseURL}/CourseReport`, // API URL
        reportData // Dữ liệu báo cáo được gửi lên server
      );
      return response.data; // Dữ liệu trả về từ API
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while creating the report"
      );
    }
  }
);

// Slice
const courseReportSlice = createSlice({
  name: "courseReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCourseReport.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCourseReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reports.push(action.payload); // Thêm báo cáo mới vào danh sách
      })
      .addCase(createCourseReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Lưu lỗi
      });
  },
});

export default courseReportSlice.reducer;
