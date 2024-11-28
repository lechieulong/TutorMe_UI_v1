import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

// Action to get requests
export const Admin_GetTeacherRequests = createAsyncThunk(
    `${SLICE_NAMES.USER}/${ACTIONS.GET_ALL_REQUESTS}`,
    async ({ page, pageSize, status }, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.get(
                `${apiURLConfig.baseURL}/teacherrequest/get-requests`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    params: {
                        page,
                        pageSize,
                        status
                    }
                }
            );
            return response.data.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to get requests."
            );
        }
    }
);

// Action to get teacher request
export const Admin_GetTeacherRequestDetail = createAsyncThunk(
    `${SLICE_NAMES.TEACHER}/${ACTIONS.GET_REQUEST_DETAILS}`,
    async (requestId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const { data } = await axios.get(
                `${apiURLConfig.baseURL}/teacherrequest/get-request-by-id/${requestId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in headers
                    },
                }
            );
            return data.result; // Return the result from the response
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to get teacher request detail."
            );
        }
    }
);

// Action to process teacher request
export const Admin_ProcessTeacherRequest = createAsyncThunk(
    `${SLICE_NAMES.TEACHER}/${ACTIONS.PROCESS_TEACHER_REQUEST}`,
    async ({ requestId, processTeacherRequestData }, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const { data } = await axios.post(
                `${apiURLConfig.baseURL}/teacherrequest/process-request/${requestId}`, processTeacherRequestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in headers
                    },
                }
            );
            return data.result; // Return the result from the response
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to process teacher request."
            );
        }
    }
);

const initialState = {
    request: null,
    requests: [],
    totalRequests: null,
    totalPages: null,
    getRequestsStatus: STATUS.IDLE,
    getRequestDetailStatus: STATUS.IDLE,
    processStatus: STATUS.IDLE,
    getRequestsError: null, // Thông báo lỗi nếu có
    getRequestDetailError: null, // Thông báo lỗi nếu có
    processError: null, // Thông báo lỗi nếu có
};

const TeacherSlice = createSlice({
    name: SLICE_NAMES.TEACHER,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Handle get requests
            .addCase(Admin_GetTeacherRequests.pending, (state) => {
                state.getRequestsStatus = STATUS.PENDING;
                state.getRequestsError = null;
            })
            .addCase(Admin_GetTeacherRequests.fulfilled, (state, action) => {
                state.getRequestsStatus = STATUS.SUCCESS;
                state.requests = action.payload.requests;
                state.totalRequests = action.payload.totalCount;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(Admin_GetTeacherRequests.rejected, (state, action) => {
                state.getRequestsStatus = STATUS.FAILED;
                state.getRequestsError = action.payload || action.error.message;
            })

            // Handle get requests details
            .addCase(Admin_GetTeacherRequestDetail.pending, (state) => {
                state.getRequestDetailStatus = STATUS.PENDING;
                state.getRequestDetailError = null;
            })
            .addCase(Admin_GetTeacherRequestDetail.fulfilled, (state, action) => {
                state.getRequestDetailStatus = STATUS.SUCCESS;
                state.request = action.payload;
            })
            .addCase(Admin_GetTeacherRequestDetail.rejected, (state, action) => {
                state.getRequestDetailStatus = STATUS.FAILED;
                state.getRequestDetailError = action.payload || action.error.message;
            })

            // Handle process teacher request
            .addCase(Admin_ProcessTeacherRequest.pending, (state) => {
                state.processStatus = STATUS.PENDING;
                state.processError = null;
            })
            .addCase(Admin_ProcessTeacherRequest.fulfilled, (state, action) => {
                state.processStatus = STATUS.SUCCESS;
                state.request = action.payload;
            })
            .addCase(Admin_ProcessTeacherRequest.rejected, (state, action) => {
                state.processStatus = STATUS.FAILED;
                state.processError = action.payload || action.error.message;
            })
    },
});

export default TeacherSlice.reducer;
