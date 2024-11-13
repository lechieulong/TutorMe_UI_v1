import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

export const SubmitRating = createAsyncThunk(
  "rating/SubmitRating",
  async ({ userId, courseId, ratingValue }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        `${apiURLConfig.baseURL}/CourseRating/${courseId}/rate`,
        { userId, courseId, ratingValue },
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
        error.response?.data?.message || "Failed to submit rating"
      );
    }
  }
);

export const GetCourseRatings = createAsyncThunk(
  "rating/GetCourseRatings",
  async (courseId, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseRating/${courseId}/ratings`,
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
        error.response?.data?.message || "Failed to get course ratings"
      );
    }
  }
);

const initialState = {
  ratings: [],
  submitRatingStatus: "idle",
  getCourseRatingsStatus: "idle",
  submitRatingError: null,
  getCourseRatingsError: null,
};

const RatingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle submit rating
      .addCase(SubmitRating.pending, (state) => {
        state.submitRatingStatus = "pending";
      })
      .addCase(SubmitRating.fulfilled, (state, action) => {
        state.submitRatingStatus = "succeeded";
        state.ratings.push(action.payload); // Add new rating to the ratings list
      })
      .addCase(SubmitRating.rejected, (state, action) => {
        state.submitRatingStatus = "failed";
        state.submitRatingError = action.payload || action.error.message;
      })

      // Handle get course ratings
      .addCase(GetCourseRatings.pending, (state) => {
        state.getCourseRatingsStatus = "pending";
      })
      .addCase(GetCourseRatings.fulfilled, (state, action) => {
        state.getCourseRatingsStatus = "succeeded";
        state.ratings = action.payload; // Assuming the API returns an array of ratings
      })
      .addCase(GetCourseRatings.rejected, (state, action) => {
        state.getCourseRatingsStatus = "failed";
        state.getCourseRatingsError = action.payload || action.error.message;
      });
  },
});

export default RatingSlice.reducer;
