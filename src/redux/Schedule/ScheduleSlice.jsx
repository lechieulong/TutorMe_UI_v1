import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

// Action Set Schedule
export const SetSchedule = createAsyncThunk(
    `${SLICE_NAMES.SCHEDULE}/${ACTIONS.SetSchedule}`,
    async (scheduleData, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.post(
                `${apiURLConfig.baseURL}/teacheravailableschedule`,
                scheduleData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in the request headers
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("API Error: ", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to set schedule"
            );
        }
    }
);

// Action to get teacher schedule for the next 7 days
export const GetSchedule7Days = createAsyncThunk(
    `${SLICE_NAMES.SCHEDULE}/${ACTIONS.GET_SCHEDULE_7DAYS}`,
    async (username, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken"); // Ensure token is included
            const response = await axios.get(
                `${apiURLConfig.baseURL}/teacheravailableschedule/${username}/7days`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in the request headers
                    },
                }
            );
            return response.data.result;
        } catch (error) {
            console.error("API Error: ", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to get schedule"
            );
        }
    }
);

const initialState = {
    schedule: null,
    schedules: [],
    scheduleStatus: STATUS.IDLE, // Default status
    setStatus: STATUS.IDLE,
    get7daysStatus: STATUS.IDLE,
    error: null, // Error message if any
    scheduleError: null, // Error message if any
};

const ScheduleSlice = createSlice({
    name: SLICE_NAMES.SCHEDULE,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle set schedule
            .addCase(SetSchedule.pending, (state) => {
                state.setStatus = STATUS.PENDING;
            })
            .addCase(SetSchedule.fulfilled, (state, action) => {
                state.setStatus = STATUS.SUCCESS;
                state.schedule = action.payload;
            })
            .addCase(SetSchedule.rejected, (state, action) => {
                state.setStatus = STATUS.FAILED;
                state.error = action.payload || action.error.message; // Set error message
            })

            // Handle get 7 days schedule
            .addCase(GetSchedule7Days.pending, (state) => {
                state.scheduleStatus = STATUS.PENDING;
            })
            .addCase(GetSchedule7Days.fulfilled, (state, action) => {
                state.scheduleStatus = STATUS.SUCCESS;
                state.schedules = action.payload;
            })
            .addCase(GetSchedule7Days.rejected, (state, action) => {
                state.scheduleStatus = STATUS.FAILED;
                state.scheduleError = action.payload || action.error.message; // Set error message
            })
    },
});

export default ScheduleSlice.reducer;
