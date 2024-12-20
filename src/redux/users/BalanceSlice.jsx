import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";


// Action get balance by user
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

// Action get balance history by user
export const GetUserBalanceHistoryByUserID = createAsyncThunk(
    `${SLICE_NAMES.USERBALANCE}/${ACTIONS.GET_USER_BALANCE_HISTORY}`,
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.get(
                `${apiURLConfig.baseURL}/AccountBalance/Get-balance-history-by-userid`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in headers
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to load balance history!"
            );
        }
    }
);

const initialState = {
    user_balance: null,
    balance_history: null,
    getBalanceStatus: STATUS.IDLE,
    getBalanceHistoryStatus: STATUS.IDLE,
    getBalanceError: null,
    getBalanceHistoryError: null,
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

            // Handle get User balance balance by UserID
            .addCase(GetUserBalanceHistoryByUserID.pending, (state) => {
                state.getBalanceHistoryStatus = STATUS.PENDING;
                state.getBalanceHistoryError = null;
            })
            .addCase(GetUserBalanceHistoryByUserID.fulfilled, (state, action) => {
                state.getBalanceHistoryStatus = STATUS.SUCCESS;
                state.balance_history = action.payload;
            })
            .addCase(GetUserBalanceHistoryByUserID.rejected, (state, action) => {
                state.getBalanceHistoryStatus = STATUS.FAILED;
                state.getBalanceHistoryError = action.payload || action.error.message;
            })
    },
});

export default UserBalanceSlice.reducer;