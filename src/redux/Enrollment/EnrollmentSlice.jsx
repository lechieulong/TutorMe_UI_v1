import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

export const CheckUserEnrollment = createAsyncThunk(
  "enrollment/CheckUserEnrollment",
  async ({ userId, courseId }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${apiURLConfig.baseURL}/enrollment/check`,
        {
          params: { userId, courseId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Trả về boolean trực tiếp từ API
    } catch (error) {
      console.error("API Error: ", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to check enrollment"
      );
    }
  }
);
export const fetchClassIds = createAsyncThunk(
  "enrollment/fetchClassIds",

  async ({ courseId, userId }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken"); // Điều chỉnh phương thức xác thực nếu cần
      const response = await axios.get(
        `https://localhost:7030/api/Enrollment/classIds`, // Sử dụng API endpoint chính xác
        {
          params: { courseId, userId }, // Truyền tham số qua query string
          headers: {
            Authorization: `Bearer ${token}`, // Thêm header Authorization nếu cần
          },
        }
      );

      return response.data; // Trả về dữ liệu trả về từ API (danh sách classIds)
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch class IDs" // Xử lý lỗi nếu có
      );
    }
  }
);
export const enrollUser = createAsyncThunk(
  "enrollment/enrollUser",
  async ({ courseId, userId, classId }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const enrollmentData = {
        courseId,
        userId,
        classId,
      };
      await axios.post(`${apiURLConfig.baseURL}/enrollment`, enrollmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true };
    } catch (error) {
      console.error("Enrollment failed", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to enroll"
      );
    }
  }
);

const initialState = {
  enrollment: null,
  enrollments: [],
  enrollmentStatus: "idle",
  enrollStatus: "idle",
  getEnrollmentsStatus: "idle",
  isEnrolled: false,
  error: null,
  enrollmentsError: null,
  classIds: [],
  classIdsStatus: "idle",
  classIdsError: null,
};

const EnrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(enrollUser.pending, (state) => {
        state.enrollStatus = "pending";
      })
      .addCase(CheckUserEnrollment.pending, (state) => {
        state.enrollmentStatus = "pending";
      })
      .addCase(CheckUserEnrollment.fulfilled, (state, action) => {
        state.enrollmentStatus = "succeeded";
        state.isEnrolled = action.payload;
      })
      .addCase(CheckUserEnrollment.rejected, (state, action) => {
        state.enrollmentStatus = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchClassIds.pending, (state) => {
        state.classIdsStatus = "pending";
      })
      .addCase(fetchClassIds.fulfilled, (state, action) => {
        state.classIdsStatus = "succeeded";
        state.classIds = action.payload;
      })
      .addCase(fetchClassIds.rejected, (state, action) => {
        state.classIdsStatus = "failed";
        state.classIdsError = action.payload || action.error.message;
      });
  },
});

export default EnrollmentSlice.reducer;
