import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

// Action to get specialization
export const GetSpecialization = createAsyncThunk(
  `${SLICE_NAMES.SPECIALIZATION}/${ACTIONS.GET_SPECIALIZATION}`,
  async ( rejectWithValue ) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/specialization` // API endpoint
      );
      return response.data.result; // Return the result from the response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get specializations."
      );
    }
  }
);

const initialState = {
  specializations: [],
  status: STATUS.IDLE, // Default status
  getspecializationstatus: STATUS.IDLE, // Default status for getting events
  error: null, // Error message if any
};

const SpecializationSlice = createSlice({
  name: SLICE_NAMES.EVENT,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Handle get Specialization
      .addCase(GetSpecialization.pending, (state) => {
        state.getspecializationstatus = STATUS.PENDING;
      })
      .addCase(GetSpecialization.fulfilled, (state, action) => {
        state.getspecializationstatus = STATUS.SUCCESS;
        state.specializations = action.payload;
      })
      .addCase(GetSpecialization.rejected, (state, action) => {
        state.getspecializationstatus = STATUS.FAILED;
        state.error = action.payload || action.error.message; // Set error message
      });
  },
});

export default SpecializationSlice.reducer;
