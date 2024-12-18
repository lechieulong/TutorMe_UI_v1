import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiURLConfig from "../common/apiURLConfig";
// Thêm logic async thunk gọi API
export const fetchTopRatedTeachers = createAsyncThunk(
  "teachers/fetchTopRatedTeachers",
  async () => {
    const response = await axios.get(
      `${apiURLConfig.baseURL}/TeacherRatings/TopRatedTeachers`
    ); // URL cần gọi API
    return response.data; // Trả về dữ liệu
  }
);

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    topRatedTeachers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.topRatedTeachers = action.payload;
      })
      .addCase(fetchTopRatedTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default teacherSlice.reducer;
