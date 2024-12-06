import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

// Action to get tests
export const Admin_GetTests = createAsyncThunk(
    `${SLICE_NAMES.ADMIN_TESTEXAM}/${ACTIONS.GET_ALL_TESTS}`,
    async ({ page, pageSize }, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.get(
                `${apiURLConfig.baseURL}/test/tests`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    params: {
                        page,
                        pageSize
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to get tests."
            );
        }
    }
);

//Action to delete test
export const DeleteTest = createAsyncThunk(
    `${SLICE_NAMES.ADMIN_TESTEXAM}/${ACTIONS.DELETE_TEST}`,
    async (testId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.delete(
                `${apiURLConfig.baseURL}/test/${testId}`,
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
                error.response?.data?.message || "Failed to delete test."
            );
        }
    }
);

//Action to update test
export const UpdateTest = createAsyncThunk(
    `${SLICE_NAMES.SCHEDULE}/${ACTIONS.UPDATE_TEST}`,
    async (formData, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken"); // Ensure token is included
            const response = await axios.put(
                `${apiURLConfig.baseURL}/test/update-test`, formData,
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
                error.response?.data?.message || "Failed to update test."
            );
        }
    }
);

const initialState = {
    test: null,
    tests: [],
    totalTests: null,
    totalPages: null,
    status: STATUS.IDLE, // Trạng thái mặc định
    deleteStatus: STATUS.IDLE,
    updateStatus: STATUS.IDLE,
    getteststatus: STATUS.IDLE,
    error: null, // Thông báo lỗi nếu có
    gettestserror: null,
    deleteError: null,
    updateError: null,
};

const TestSlice = createSlice({
    name: SLICE_NAMES.ADMIN_TESTEXAM,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Handle get Users
            .addCase(Admin_GetTests.pending, (state) => {
                state.getteststatus = STATUS.PENDING;
                state.gettestserror = null;
            })
            .addCase(Admin_GetTests.fulfilled, (state, action) => {
                state.getteststatus = STATUS.SUCCESS;
                state.tests = action.payload.tests;
                state.totalTests = action.payload.totalCount;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(Admin_GetTests.rejected, (state, action) => {
                state.getteststatus = STATUS.FAILED;
                state.gettestserror = action.payload || action.error.message;
            })

            // Handle delete test
            .addCase(DeleteTest.pending, (state) => {
                state.deleteStatus = STATUS.PENDING;
                state.deleteError = null;
            })
            .addCase(DeleteTest.fulfilled, (state, action) => {
                state.deleteStatus = STATUS.SUCCESS;
                state.test = action.payload;
            })
            .addCase(DeleteTest.rejected, (state, action) => {
                state.deleteStatus = STATUS.FAILED;
                state.deleteError = action.payload || action.error.message;
            })

            // Handle update test
            .addCase(UpdateTest.pending, (state) => {
                state.updateStatus = STATUS.PENDING;
                state.updateError = null;
            })
            .addCase(UpdateTest.fulfilled, (state, action) => {
                state.updateStatus = STATUS.SUCCESS;
                state.schedule = action.payload;
            })
            .addCase(UpdateTest.rejected, (state, action) => {
                state.updateStatus = STATUS.FAILED;
                state.updateError = action.payload || action.error.message;
            })
    },
});

export default TestSlice.reducer;
