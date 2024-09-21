import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";

export const fetchCoursesTimelineDetail = createAsyncThunk(
  `${SLICE_NAMES.COURSESTIMELINEDETAIL}/${ACTIONS.GET_COURSES}`,
  async (courseTimelineId) => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/Course/${courseTimelineId}`
      );
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

const initialState = {
  coursesTimelineDetail: [], // Dữ liệu chi tiết lộ trình
  count: 0, // Số lượng chi tiết (nếu cần thiết)
  status: STATUS.IDLE, // Trạng thái của API
  error: null, // Lỗi từ API
};

const courseTimelineDetailSlice = createSlice({
  name: SLICE_NAMES.COURSESTIMELINEDETAIL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursesTimelineDetail.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(fetchCoursesTimelineDetail.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.coursesTimelineDetail = action.payload; // Sửa tên trường để khớp với state
        state.count = action.payload.length; // Cập nhật số lượng chi tiết
      })
      .addCase(fetchCoursesTimelineDetail.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export default courseTimelineDetailSlice.reducer;
