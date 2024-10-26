import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

// Action to get users
export const Admin_GetUsers = createAsyncThunk(
    `${SLICE_NAMES.USER}/${ACTIONS.GET_ALL_USERS}`,
    async ({ page, pageSize }, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.get(
                `${apiURLConfig.baseURL}/user/users`,
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
                error.response?.data?.message || "Failed to get users."
            );
        }
    }
);

// Action to lock user
export const Admin_LockUser = createAsyncThunk(
    `${SLICE_NAMES.USER}/${ACTIONS.LOCK_USER}`,
    async (lockData, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.post(
                `${apiURLConfig.baseURL}/user/lock`, lockData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to lock user."
            );
        }
    }
);

const initialState = {
    users: [],
    totalUsers: null,
    totalPages: null,
    lock: null,
    status: STATUS.IDLE, // Trạng thái mặc định
    lockstatus: STATUS.IDLE, // Trạng thái mặc định
    getuserstatus: STATUS.IDLE,
    error: null, // Thông báo lỗi nếu có
    lockerror: null, // Thông báo lỗi nếu có
};

const UserSlice = createSlice({
    name: SLICE_NAMES.USER,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Handle get Users
            .addCase(Admin_GetUsers.pending, (state) => {
                state.getuserstatus = STATUS.PENDING;
            })
            .addCase(Admin_GetUsers.fulfilled, (state, action) => {
                state.getuserstatus = STATUS.SUCCESS;
                state.users = action.payload.users;
                state.totalUsers = action.payload.totalCount;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(Admin_GetUsers.rejected, (state, action) => {
                state.getuserstatus = STATUS.FAILED;
                state.error = action.payload || action.error.message;
            })

            // Handle lock User
            .addCase(Admin_LockUser.pending, (state) => {
                state.lockstatus = STATUS.PENDING;
            })
            .addCase(Admin_LockUser.fulfilled, (state, action) => {
                state.lockstatus = STATUS.SUCCESS;
                state.lock = action.payload;
            })
            .addCase(Admin_LockUser.rejected, (state, action) => {
                state.lockstatus = STATUS.FAILED;
                state.lockerror = action.payload || action.error.message;
            })
    },
});

export default UserSlice.reducer;
