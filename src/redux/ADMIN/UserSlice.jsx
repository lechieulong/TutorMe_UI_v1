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

const initialState = {
    users: [],
    status: STATUS.IDLE, // Trạng thái mặc định
    error: null, // Thông báo lỗi nếu có
    getuserstatus: STATUS.IDLE,
};

const UserSlice = createSlice({
    name: SLICE_NAMES.USER,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle get User Information
            .addCase(Admin_GetUsers.pending, (state) => {
                state.getuserstatus = STATUS.PENDING;
            })
            .addCase(Admin_GetUsers.fulfilled, (state, action) => {
                state.getuserstatus = STATUS.SUCCESS;
                state.users = action.payload.users;
            })
            .addCase(Admin_GetUsers.rejected, (state, action) => {
                state.getuserstatus = STATUS.FAILED;
                state.error = action.payload || action.error.message;
            });
    },
});

export default UserSlice.reducer;
