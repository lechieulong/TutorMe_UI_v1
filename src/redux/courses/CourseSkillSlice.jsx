import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURLConfig from "../common/apiURLConfig";

// Thêm Thunk để lấy các kỹ năng từ courseId
export const fetchSkills = createAsyncThunk(
  "courses/fetchSkills",
  async (courseId, { rejectWithValue }) => {
    if (!courseId) return rejectWithValue("Course ID is required");
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseSkills/Course/${courseId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch skills.");
    }
  }
);
// Thêm Thunk để lấy mô tả kỹ năng từ skillId
export const fetchSkillDescription = createAsyncThunk(
  "courses/fetchSkillDescription",
  async (skillId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseSkills/DescriptionBySkill/${skillId}`
      );
      return { skillId, description: response.data.description };
    } catch (error) {
      return rejectWithValue("Failed to fetch description.");
    }
  }
);

const initialState = {
  courseSkills: [],
  skillDescriptions: {},
  activeTab: null,
  status: "idle",
  error: null,
};

const courseSkill = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchSkills.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = "success";
        state.courseSkills = action.payload;
        state.activeTab = action.payload[0]?.id || null;
        state.error = null;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(fetchSkillDescription.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchSkillDescription.fulfilled, (state, action) => {
        state.status = "success";
        state.skillDescriptions[action.payload.skillId] =
          action.payload.description;
        state.error = null;
      })
      .addCase(fetchSkillDescription.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default courseSkill.reducer;
