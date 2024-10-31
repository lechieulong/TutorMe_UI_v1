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

// Action to lock user
export const Admin_UnlockUser = createAsyncThunk(
    `${SLICE_NAMES.USER}/${ACTIONS.UNLOCK_USER}`,
    async (userId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.post(
                `${apiURLConfig.baseURL}/user/unlock/${userId}`,null,
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


// Action to import user from file
export const Admin_ImportUser = createAsyncThunk(
    `${SLICE_NAMES.USER}/${ACTIONS.IMPORT_USER}`,
    async (formData, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.post(
                `${apiURLConfig.baseURL}/user/import-excel`, formData, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            // console.log("Import response: ", response.data.result);
            return response.data.result;
        } catch (error) {
            console.log("Import error: ", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to import users."
            );
        }
    }
);

const initialState = {
    users: [],
    importedResponse: null,
    totalUsers: null,
    totalPages: null,
    lock: null,
    unlock: null,
    status: STATUS.IDLE, // Trạng thái mặc định
    lockstatus: STATUS.IDLE, // Trạng thái mặc định
    unlockStatus: STATUS.IDLE, // Trạng thái mặc định
    getuserstatus: STATUS.IDLE,
    importUserStatus: STATUS.IDLE,
    error: null, // Thông báo lỗi nếu có
    lockerror: null, // Thông báo lỗi nếu có
    unlockError: null, // Thông báo lỗi nếu có
    importUserError: null, // Thông báo lỗi nếu có
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

            // Handle unlock User
            .addCase(Admin_UnlockUser.pending, (state) => {
                state.unlockStatus = STATUS.PENDING;
            })
            .addCase(Admin_UnlockUser.fulfilled, (state, action) => {
                state.unlockStatus = STATUS.SUCCESS;
                state.unlock = action.payload;
            })
            .addCase(Admin_UnlockUser.rejected, (state, action) => {
                state.unlockStatus = STATUS.FAILED;
                state.unlockError = action.payload || action.error.message;
            })

            // Handle import User
            .addCase(Admin_ImportUser.pending, (state) => {
                state.importUserStatus = STATUS.PENDING;
            })
            .addCase(Admin_ImportUser.fulfilled, (state, action) => {
                state.importUserStatus = STATUS.SUCCESS;
                state.importedResponse = action.payload;
                state.importUserError = action.payload || action.error.message;
            })
            .addCase(Admin_ImportUser.rejected, (state, action) => {
                state.importUserStatus = STATUS.FAILED;
                state.importUserError = action.payload || action.error.message;
            })
    },
});

export default UserSlice.reducer;
