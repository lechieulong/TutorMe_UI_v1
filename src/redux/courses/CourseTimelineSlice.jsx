import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";

export const fetchCoursesTimeline = createAsyncThunk(
  `${SLICE_NAMES.COURSESTIMELINE}/${ACTIONS.GET_COURSES}`,
  async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:5156/api/Course/${courseId}`
      );
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

const initialState = {
  coursesTimeline: [], // Dữ liệu khóa học
  count: 0, // Số lượng khóa học (nếu cần thiết)
  status: STATUS.IDLE, // Trạng thái của API
  error: null, // Lỗi từ API
};

const courseTimelineSlice = createSlice({
  name: SLICE_NAMES.COURSESTIMELINE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursesTimeline.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(fetchCoursesTimeline.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.coursesTimeline = action.payload; // Sửa tên trường để khớp với state
        state.count = action.payload.length; // Cập nhật số lượng lộ trình
      })
      .addCase(fetchCoursesTimeline.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export default courseTimelineSlice.reducer;
