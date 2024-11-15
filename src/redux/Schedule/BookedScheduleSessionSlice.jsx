import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

// Action Set Schedule session
export const SetScheduleSession = createAsyncThunk(
    `${SLICE_NAMES.SCHEDULESESSION}/${ACTIONS.SET_SCHEDULE_SESSION}`,
    async (scheduleSessionData, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.post(
                `${apiURLConfig.baseURL}/bookedschedulesession/create-schedule-session`,
                scheduleSessionData,
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
    scheduleSession: null,
    setScheduleSessionStatus: STATUS.IDLE,
    setScheduleSessionError: null, // Error message if any
};

const ScheduleSlice = createSlice({
    name: SLICE_NAMES.SCHEDULESESSION,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle set schedule session
            .addCase(SetScheduleSession.pending, (state) => {
                state.setScheduleSessionStatus = STATUS.PENDING;
                state.setScheduleSessionError = null;
            })
            .addCase(SetScheduleSession.fulfilled, (state, action) => {
                state.setScheduleSessionStatus = STATUS.SUCCESS;
                state.scheduleSession = action.payload;
            })
            .addCase(SetScheduleSession.rejected, (state, action) => {
                state.setScheduleSessionStatus = STATUS.FAILED;
                state.setScheduleSessionError = action.payload || action.error.message; // Set error message
            })

    },
});

export default ScheduleSlice.reducer;
