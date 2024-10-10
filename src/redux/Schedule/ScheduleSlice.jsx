import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

// Action Set Schedule
export const SetSchedule = createAsyncThunk(
    `${SLICE_NAMES.SCHEDULE}/${ACTIONS.SetSchedule}`,
    async (scheduleData, { rejectWithValue }) => {
        console.log("Data: ", scheduleData);
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

const initialState = {
    schedule: null,
    status: STATUS.IDLE, // Default status
    setStatus: STATUS.IDLE,
    error: null, // Error message if any
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

    },
});

export default ScheduleSlice.reducer;
