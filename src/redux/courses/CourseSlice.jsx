import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";

// Thunk để lấy tất cả khóa học
export const fetchCourses = createAsyncThunk(
  `${SLICE_NAMES.COURSES}/${ACTIONS.GET_COURSES}`,
  async () => {
    try {
      const response = await axios.get("https://localhost:7030/api/Courses");
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

// Thunk để lấy khóa học theo UserId
export const fetchCoursesByUserId = createAsyncThunk(
  `${SLICE_NAMES.COURSES}/${ACTIONS.GET_COURSES_BY_USER_ID}`,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/Courses/user/${userId}`
      );
      return response.data; // Giả định rằng API trả về danh sách khóa học
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch courses by UserId."
      );
    }
  }
);

// Thunk để lấy lớp học từ courseId
export const fetchClasses = createAsyncThunk(
  `${SLICE_NAMES.COURSES}/${ACTIONS.GET_CLASSESOFCOURSE}`,
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/Courses/${courseId}/classes`,
        courseId
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get classes from course."
      );
    }
  }
);

const initialState = {
  courses: [], // Dữ liệu khóa học
  classes: [],
  count: 0, // Số lượng khóa học (nếu cần thiết)
  status: STATUS.IDLE, // Trạng thái của API
  error: null, // Lỗi từ API
};

const courseSlice = createSlice({
  name: SLICE_NAMES.COURSES,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.courses = action.payload;
        state.count = action.payload.length; // Cập nhật số lượng khóa học nếu cần
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(fetchCoursesByUserId.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(fetchCoursesByUserId.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.courses = action.payload; // Cập nhật khóa học với danh sách mới
        state.count = action.payload.length; // Cập nhật số lượng khóa học
      })
      .addCase(fetchCoursesByUserId.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })
      // Xử lý class
      .addCase(fetchClasses.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export default courseSlice.reducer;
