import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Định nghĩa initialState
const initialState = {
  coursePart: [],
  skillDescriptions: {},
  activeTab: null,
  status: "idle",
  error: null,
};

// Tạo thunk để gọi API xóa
export const deleteCoursePart = createAsyncThunk(
  "coursePart/deleteCoursePart",
  async (coursePartId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://localhost:7030/api/CourseParts/${coursePartId}`
      );
      return coursePartId; // Trả về ID sau khi xóa thành công
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Tạo slice
const coursePart = createSlice({
  name: "coursePart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCoursePart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCoursePart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Xóa coursePart khỏi danh sách
        state.coursePart = state.coursePart.filter(
          (part) => part.id !== action.payload
        );
      })
      .addCase(deleteCoursePart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default coursePart.reducer;
