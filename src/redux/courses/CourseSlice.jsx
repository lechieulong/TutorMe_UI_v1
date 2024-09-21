import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";

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

const initialState = {
  courses: [], // Dữ liệu khóa học
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
      });
  },
});

export default courseSlice.reducer;
