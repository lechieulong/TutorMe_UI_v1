import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";

export const fetchClasses = createAsyncThunk(
  `${SLICE_NAMES.COURSES}/${ACTIONS.GET_CLASSESOFCOURSE}`,
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/courses/${courseId}/classes`,
        courseId
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get classes from course."
      );
    }
  }
);
// Action create class
export const CreateClassAPI = createAsyncThunk(
  `${SLICE_NAMES.CLASSES}/${ACTIONS.CREATE_CLASS}`,
  async (classData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiURLConfig.baseURL}/class`,
        classData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to craete class."
      );
    }
  }
);

const initialState = {
  class: null,
  classes: [],
  count: 0,
  status: STATUS.IDLE,
  createStatus: STATUS.IDLE,
  error: null,
};

const classSlice = createSlice({
  name: SLICE_NAMES.CLASSES,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })

      // Xử lý create class
      .addCase(CreateClassAPI.pending, (state) => {
        state.createStatus = STATUS.PENDING;
        state.error = null; // Clear any previous errors
      })
      .addCase(CreateClassAPI.fulfilled, (state, action) => {
        state.createStatus = STATUS.SUCCESS;
        state.class = action.payload.result;
        state.classes.push(action.payload.result); // Add the newly created class to the list
        state.error = null;
      })
      .addCase(CreateClassAPI.rejected, (state, action) => {
        state.createStatus = STATUS.FAILED;
        state.error = action.payload || "Failed to create class."; // Show error message
      });
  },
});

export default classSlice.reducer;
