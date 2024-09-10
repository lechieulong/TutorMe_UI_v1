import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";

export const Login = createAsyncThunk(
  `${SLICE_NAMES.AUTH}/${ACTIONS.LOGIN}`,
  async () => {
    const response = await axios.get("https://localhost:7104/api/auth/login");
    return response.data;
  }
);

export const Regis = createAsyncThunk(
  `${SLICE_NAMES.AUTH}/${ACTIONS.REGIS}`,
  async (userData) => {
    try {
      const response = await axios.post(
        "https://localhost:7104/api/auth/register",
        userData
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to register");
    }
  }
);

const initialState = {
  user: {},
  status: STATUS.SUCCESS,
  error: null,
};

const AuthSlice = createSlice({
  name: SLICE_NAMES.AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.user = action.payload;
      })
      .addCase(Login.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })

      .addCase(Regis.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(Regis.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.classes = action.payload;
      })
      .addCase(Regis.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export default AuthSlice.reducer;
