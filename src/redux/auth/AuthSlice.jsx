import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";

// Action login
export const Login = createAsyncThunk(
  `${SLICE_NAMES.AUTH}/${ACTIONS.LOGIN}`,
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://localhost:7104/api/auth/login", loginData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to login");
    }
  }
);

// Action register
export const Regis = createAsyncThunk(
  `${SLICE_NAMES.AUTH}/${ACTIONS.REGIS}`,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://localhost:7030/api/auth/register", userData);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error details:", error.response);
      return rejectWithValue(error.response?.data?.message || "Failed to register");
    }
  }
);

const initialState = {
  user: null,         // Thông tin người dùng sau khi đăng nhập hoặc đăng ký
  status: STATUS.IDLE, // Trạng thái mặc định
  error: null,        // Thông báo lỗi nếu có
};

const AuthSlice = createSlice({
  name: SLICE_NAMES.AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý login
      .addCase(Login.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.user = action.payload;
      })
      .addCase(Login.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      })

      // Xử lý register
      .addCase(Regis.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(Regis.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.user = action.payload;
      })
      .addCase(Regis.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      });
  },
});

export default AuthSlice.reducer;
