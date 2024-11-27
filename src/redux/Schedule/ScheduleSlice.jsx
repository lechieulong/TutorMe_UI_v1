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

export const DeleteSchedule = createAsyncThunk(
    `${SLICE_NAMES.SCHEDULE}/${ACTIONS.DELETE_SCHEDULE}`,
    async (scheduleId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken"); // Ensure token is included
            const response = await axios.delete(
                `${apiURLConfig.baseURL}/teacheravailableschedule/${scheduleId}`,
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
                error.response?.data?.message || "Failed to delete schedule."
            );
        }
    }
);

export const UpdateSchedule = createAsyncThunk(
    `${SLICE_NAMES.SCHEDULE}/${ACTIONS.UPDATE_SCHEDULE}`,
    async (formData, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken"); // Ensure token is included
            const response = await axios.patch(
                `${apiURLConfig.baseURL}/teacheravailableschedule`, formData,
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
                error.response?.data?.message || "Failed to update schedule."
            );
        }
    }
);


const initialState = {
    schedule: null,
    schedules: [],
    scheduleStatus: STATUS.IDLE, // Default status
    setStatus: STATUS.IDLE,
    deleteStatus: STATUS.IDLE,
    updateStatus: STATUS.IDLE,
    get7daysStatus: STATUS.IDLE,
    error: null, // Error message if any
    scheduleError: null, // Error message if any
    deleteError: null, // Error message if any
    updateError: null, // Error message if any
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
                state.error = action.payload || action.error.message;
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
                state.scheduleError = action.payload || action.error.message;
            })

            // Handle delete schedule
            .addCase(DeleteSchedule.pending, (state) => {
                state.deleteStatus = STATUS.PENDING;
                state.deleteError = null;
            })
            .addCase(DeleteSchedule.fulfilled, (state, action) => {
                state.deleteStatus = STATUS.SUCCESS;
                state.schedule = action.payload;
            })
            .addCase(DeleteSchedule.rejected, (state, action) => {
                state.deleteStatus = STATUS.FAILED;
                state.deleteError = action.payload || action.error.message;
            })

            // Handle update schedule
            .addCase(UpdateSchedule.pending, (state) => {
                state.updateStatus = STATUS.PENDING;
                state.updateError = null;
            })
            .addCase(UpdateSchedule.fulfilled, (state, action) => {
                state.updateStatus = STATUS.SUCCESS;
                state.schedule = action.payload;
            })
            .addCase(UpdateSchedule.rejected, (state, action) => {
                state.updateStatus = STATUS.FAILED;
                state.updateError = action.payload || action.error.message;
            })
    },
});

export default ScheduleSlice.reducer;
