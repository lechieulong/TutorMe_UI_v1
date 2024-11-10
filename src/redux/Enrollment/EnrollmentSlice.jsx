import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

// Action để kiểm tra người dùng có đăng ký khóa học
export const CheckUserEnrollment = createAsyncThunk(
  "enrollment/CheckUserEnrollment",
  async ({ userId, courseId }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${apiURLConfig.baseURL}/enrollment/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userEnrollments = response.data;
      const isEnrolled = userEnrollments.some(
        (enrollment) => enrollment.courseId === courseId
      );
      return { isEnrolled };
    } catch (error) {
      console.error("API Error: ", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to check enrollment"
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
        state.isEnrolled = action.payload.isEnrolled;
      })
      .addCase(CheckUserEnrollment.rejected, (state, action) => {
        state.enrollmentStatus = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default EnrollmentSlice.reducer;
