import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";

export const fetchClassesWithStudents = createAsyncThunk(
  `${SLICE_NAMES.CLASSES}/${ACTIONS.GET_CLASS}`,
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
);

// Action create class
export const CreateClassAPI = createAsyncThunk(
  `${SLICE_NAMES.CLASSES}/${ACTIONS.CREATE_CLASS}`,
  async (classData, { rejectWithValue }) => {
    console.log(classData);
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
      .addCase(fetchClassesWithStudents.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(fetchClassesWithStudents.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.classes = action.payload;
      })
      .addCase(fetchClassesWithStudents.rejected, (state, action) => {
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
