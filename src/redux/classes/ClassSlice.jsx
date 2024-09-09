import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";

export const fetchClassesWithStudents = createAsyncThunk(
  `${SLICE_NAMES.CLASSES}/${ACTIONS.GET_CLASS}`,
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
);

const initialState = {
  courses: [],
  count: 0,
  status: STATUS.SUCCESS,
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
      });
  },
});

export default classSlice.reducer;
