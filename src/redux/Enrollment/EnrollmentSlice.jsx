import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

// Action Enroll User
export const EnrollUser = createAsyncThunk(
  "enrollment/EnrollUser",
  async (enrollmentData, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        `${apiURLConfig.baseURL}/enrollment`,
        enrollmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("API Error: ", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to enroll user"
      );
    }
  }
);

// Action to get user enrollments
export const GetUserEnrollments = createAsyncThunk(
  "enrollment/GetUserEnrollments",
  async (userId, { rejectWithValue }) => {
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
      return response.data;
    } catch (error) {
      console.error("API Error: ", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to get user enrollments"
      );
    }
  }
);

const initialState = {
  enrollment: null,
  enrollments: [],
  enrollmentStatus: "idle", // Default status for checking enrollment
  enrollStatus: "idle",
  getEnrollmentsStatus: "idle",
  error: null,
  enrollmentsError: null,
};

const EnrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle user enrollment
      .addCase(EnrollUser.pending, (state) => {
        state.enrollStatus = "pending";
      })
      .addCase(EnrollUser.fulfilled, (state, action) => {
        state.enrollStatus = "succeeded";
        state.enrollment = action.payload;
      })
      .addCase(EnrollUser.rejected, (state, action) => {
        state.enrollStatus = "failed";
        state.error = action.payload || action.error.message; // Set error message
      })

      // Handle get user enrollments
      .addCase(GetUserEnrollments.pending, (state) => {
        state.getEnrollmentsStatus = "pending";
      })
      .addCase(GetUserEnrollments.fulfilled, (state, action) => {
        state.getEnrollmentsStatus = "succeeded";
        state.enrollments = action.payload; // Assuming the API returns an array of enrollments
      })
      .addCase(GetUserEnrollments.rejected, (state, action) => {
        state.getEnrollmentsStatus = "failed";
        state.enrollmentsError = action.payload || action.error.message; // Set error message
      });
  },
});

export default EnrollmentSlice.reducer;
