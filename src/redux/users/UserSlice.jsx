import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";
import { act } from "react";

// Action profile
export const Profile = createAsyncThunk(
    `${SLICE_NAMES.USER}/${ACTIONS.GET_USER_INFORMATION}`,
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${apiURLConfig.baseURL}/user/profile/${username}`,
            );
            return response.data.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to load user profile!"
            );
        }
    }
);

const initialState = {
    userInfor: null, // Thông tin người dùng
    status: STATUS.IDLE, // Trạng thái mặc định
    error: null, // Thông báo lỗi nếu có
};

const UserSlice = createSlice({
    name: SLICE_NAMES.USER,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Profile.pending, (state) => {
                state.status = STATUS.PENDING;
            })
            .addCase(Profile.fulfilled, (state, action) => {
                state.status = STATUS.SUCCESS;
                state.userInfor = action.payload;
            })
            .addCase(Profile.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                state.error = action.payload || action.error.message;
            })
    },
});

export default UserSlice.reducer;