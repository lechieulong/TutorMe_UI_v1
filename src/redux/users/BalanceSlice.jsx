import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";


// Action get user by ID
export const GetUserBalanceByUserID = createAsyncThunk(
    `${SLICE_NAMES.USERBALANCE}/${ACTIONS.GET_USER_BALANCE}`,
    async (userId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.get(
                `${apiURLConfig.baseURL}/AccountBalance/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in headers
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to load user!"
            );
        }
    }
);

const initialState = {
    user_balance: null,
    getBalanceStatus: STATUS.IDLE,
    getBalanceError: null,
};

const UserBalanceSlice = createSlice({
    name: SLICE_NAMES.USERBALANCE,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Handle get User balance by ID
            .addCase(GetUserBalanceByUserID.pending, (state) => {
                state.getBalanceStatus = STATUS.PENDING;
                state.getBalanceError = null;
            })
            .addCase(GetUserBalanceByUserID.fulfilled, (state, action) => {
                state.getBalanceStatus = STATUS.SUCCESS;
                state.user_balance = action.payload;
            })
            .addCase(GetUserBalanceByUserID.rejected, (state, action) => {
                state.getBalanceStatus = STATUS.FAILED;
                state.getBalanceError = action.payload || action.error.message;
            })
    },
});

export default UserBalanceSlice.reducer;