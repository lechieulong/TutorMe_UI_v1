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

// Action Get Schedule session by userID
export const GetScheduleSessionByUserId = createAsyncThunk(
    `${SLICE_NAMES.SCHEDULESESSION}/${ACTIONS.GET_SCHEDULE_SESSION}`,
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.get(
                `${apiURLConfig.baseURL}/bookedschedulesession/getSessionsByUserId`,
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
                error.response?.data?.message || "Failed to get schedule session."
            );
        }
    }
);

// Action Get isBooked Schedule session by userID
export const GetIsBookedScheduleSessionByUserId = createAsyncThunk(
    `${SLICE_NAMES.SCHEDULESESSION}/${ACTIONS.GET_IS_BOOKED_SCHEDULE_SESSION}`,
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.get(
                `${apiURLConfig.baseURL}/bookedschedulesession/getIsBookedSessionsByUserId`,
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
                error.response?.data?.message || "Failed to get schedule session."
            );
        }
    }
);

const initialState = {
    scheduleSession: null,
    scheduleSessions: [],
    isBookedScheduleSessions: [],
    setScheduleSessionStatus: STATUS.IDLE,
    getScheduleSessionStatus: STATUS.IDLE,
    getIsbookedScheduleSessionStatus: STATUS.IDLE,
    setScheduleSessionError: null, // Error message if any
    getScheduleSessionError: null,
    getIsbookedScheduleSessionError: null,
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

            // Handle get schedule sessions
            .addCase(GetScheduleSessionByUserId.pending, (state) => {
                state.getScheduleSessionStatus = STATUS.PENDING;
                state.getScheduleSessionError = null;
            })
            .addCase(GetScheduleSessionByUserId.fulfilled, (state, action) => {
                state.getScheduleSessionStatus = STATUS.SUCCESS;
                state.scheduleSessions = action.payload;
            })
            .addCase(GetScheduleSessionByUserId.rejected, (state, action) => {
                state.getScheduleSessionStatus = STATUS.FAILED;
                state.getScheduleSessionError = action.payload || action.error.message; // Set error message
            })

            // Handle get is booked schedule sessions
            .addCase(GetIsBookedScheduleSessionByUserId.pending, (state) => {
                state.getIsbookedScheduleSessionStatus = STATUS.PENDING;
                state.getIsbookedScheduleSessionError = null;
            })
            .addCase(GetIsBookedScheduleSessionByUserId.fulfilled, (state, action) => {
                state.getIsbookedScheduleSessionStatus = STATUS.SUCCESS;
                state.isBookedScheduleSessions = action.payload;
            })
            .addCase(GetIsBookedScheduleSessionByUserId.rejected, (state, action) => {
                state.getIsbookedScheduleSessionStatus = STATUS.FAILED;
                state.getIsbookedScheduleSessionError = action.payload || action.error.message; // Set error message
            })

    },
});

export default ScheduleSlice.reducer;
