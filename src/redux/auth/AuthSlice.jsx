import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";

// Action login
export const LoginApi = createAsyncThunk(
  `${SLICE_NAMES.AUTH}/${ACTIONS.LOGIN}`,
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiURLConfig.baseURL}/auth/login`,
        loginData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to login"
      );
    }
  }
);

// Action register
export const Regis = createAsyncThunk(
  `${SLICE_NAMES.AUTH}/${ACTIONS.REGIS}`,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiURLConfig.baseURL}/auth/register`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to register"
      );
    }
  }
);

// Action check if email exists
export const checkEmailExistsApi = createAsyncThunk(
  `${SLICE_NAMES.AUTH}/${ACTIONS.CHECK_EMAIL}`,
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/auth/check-email?email=${email}`,
      );
      return response.data.exists;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check email"
      );
    }
  }
);

// Action register user with Google
export const registerGoogleUserApi = createAsyncThunk(
  `${SLICE_NAMES.AUTH}/${ACTIONS.REGISTER_GOOGLE}`,
  async (googleData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiURLConfig.baseURL}/auth/register-google`,
        googleData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to register with Google"
      );
    }
  }
);

// Action login with Google
export const loginWithGoogleApi = createAsyncThunk(
  `${SLICE_NAMES.AUTH}/${ACTIONS.LOGIN_GOOGLE}`,
  async (googleToken, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiURLConfig.baseURL}/auth/login-google`,
        googleToken
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to login with Google"
      );
    }
  }
);

// Action change password
export const changePasswordAPI = createAsyncThunk(
  `${SLICE_NAMES.AUTH}/${ACTIONS.CHANGE_PASSWORD}`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiURLConfig.baseURL}/auth/change-password`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change password."
      );
    }
  }
);

// Action change password
export const requestForgotAPI = createAsyncThunk(
  `${SLICE_NAMES.AUTH}/${ACTIONS.REQUEST_FORGOT}`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiURLConfig.baseURL}/auth/forgot-password`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change password."
      );
    }
  }
);

// Action reset password
export const resetPasswordAPI = createAsyncThunk(
  `${SLICE_NAMES.AUTH}/${ACTIONS.RESET_PASSWORD}`,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiURLConfig.baseURL}/auth/reset-password`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password. Please request again."
      );
    }
  }
);

const initialState = {
  user: null,
  status: STATUS.IDLE,
  loginStatus: STATUS.IDLE,
  registerStatus: STATUS.IDLE,
  changePasswordStatus: STATUS.IDLE,
  forgotPasswordStatus: STATUS.IDLE,
  resetPassworStatus: STATUS.IDLE,
  error: null,
  token: null,
  // IschangePassword
};

const AuthSlice = createSlice({
  name: SLICE_NAMES.AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý login
      .addCase(LoginApi.pending, (state) => {
        state.loginStatus = STATUS.PENDING;
      })
      .addCase(LoginApi.fulfilled, (state, action) => {
        state.loginStatus = STATUS.SUCCESS;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(LoginApi.rejected, (state, action) => {
        state.loginStatus = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      })

      // Xử lý register
      .addCase(Regis.pending, (state) => {
        state.registerStatus = STATUS.PENDING;
      })
      .addCase(Regis.fulfilled, (state, action) => {
        state.registerStatus = STATUS.SUCCESS;
        state.user = action.payload;
      })
      .addCase(Regis.rejected, (state, action) => {
        state.registerStatus = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      })

      // Xử lý checkEmailExistsApi
      .addCase(checkEmailExistsApi.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(checkEmailExistsApi.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
      })
      .addCase(checkEmailExistsApi.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      })

      // Xử lý registerGoogleUserApi
      .addCase(registerGoogleUserApi.pending, (state) => {
        state.registerStatus = STATUS.PENDING;
      })
      .addCase(registerGoogleUserApi.fulfilled, (state, action) => {
        state.registerStatus = STATUS.SUCCESS;
        state.user = action.payload;
      })
      .addCase(registerGoogleUserApi.rejected, (state, action) => {
        state.registerStatus = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      })

      // Xử lý loginWithGoogleApi
      .addCase(loginWithGoogleApi.pending, (state) => {
        state.loginStatus = STATUS.PENDING;
      })
      .addCase(loginWithGoogleApi.fulfilled, (state, action) => {
        state.loginStatus = STATUS.SUCCESS;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginWithGoogleApi.rejected, (state, action) => {
        state.loginStatus = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      })

      // Xử lý change password
      .addCase(changePasswordAPI.pending, (state) => {
        state.changePasswordStatus = STATUS.PENDING;
      })
      .addCase(changePasswordAPI.fulfilled, (state, action) => {
        state.changePasswordStatus = STATUS.SUCCESS;
      })
      .addCase(changePasswordAPI.rejected, (state, action) => {
        state.changePasswordStatus = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      })

      // Xử lý forgot password
      .addCase(requestForgotAPI.pending, (state) => {
        state.forgotPasswordStatus = STATUS.PENDING;
      })
      .addCase(requestForgotAPI.fulfilled, (state, action) => {
        state.forgotPasswordStatus = STATUS.SUCCESS;
      })
      .addCase(requestForgotAPI.rejected, (state, action) => {
        state.forgotPasswordStatus = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      })

      // Xử lý reset password
      .addCase(resetPasswordAPI.pending, (state) => {
        state.resetPassworStatus = STATUS.PENDING;
      })
      .addCase(resetPasswordAPI.fulfilled, (state, action) => {
        state.resetPassworStatus = STATUS.SUCCESS;
      })
      .addCase(resetPasswordAPI.rejected, (state, action) => {
        state.resetPassworStatus = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      })
  },
});

export default AuthSlice.reducer;
