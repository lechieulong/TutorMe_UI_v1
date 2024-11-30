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

const initialState = {
    tests: [],
    totalTests: null,
    totalPages: null,
    status: STATUS.IDLE, // Trạng thái mặc định
    getteststatus: STATUS.IDLE,
    error: null, // Thông báo lỗi nếu có
    gettestserror: null,
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
    },
});

export default TestSlice.reducer;
