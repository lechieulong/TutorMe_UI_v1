import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

// Action to get events by user ID
export const GetEventByUserId = createAsyncThunk(
  `${SLICE_NAMES.EVENT}/${ACTIONS.GET_EVENT_BY_USERID}`,
  async (_, { rejectWithValue }) => {
    try {
      // Retrieve the token from the Redux state (or wherever it's stored)
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${apiURLConfig.baseURL}/event/events`, // API endpoint
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in the request headers
          },
        }
      );
      return response.data.result; // Return the result from the response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get event."
      );
    }
  }
);

const initialState = {
  events: [],
  status: STATUS.IDLE, // Default status
  getstatus: STATUS.IDLE, // Default status for getting events
  error: null, // Error message if any
};

const EventSlice = createSlice({
  name: SLICE_NAMES.EVENT,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle get event by userId
      .addCase(GetEventByUserId.pending, (state) => {
        state.getstatus = STATUS.PENDING;
      })
      .addCase(GetEventByUserId.fulfilled, (state, action) => {
        state.getstatus = STATUS.SUCCESS;
        state.events = action.payload.map(event => ({
          ...event,
          start: new Date(event.start), // Convert to Date object
          end: new Date(event.end),     // Convert to Date object
      }));
      })
      .addCase(GetEventByUserId.rejected, (state, action) => {
        state.getstatus = STATUS.FAILED;
        state.error = action.payload || action.error.message; // Set error message
      });
  },
});

export default EventSlice.reducer;
