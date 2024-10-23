import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

const AnswerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    storeAnswer: (state, action) => {
      state.answer = {
        ...state.answer,
        ...action.payload,
      };
    },
  },
});

export const { storeAnswer } = AnswerSlice.actions;

export default AnswerSlice.reducer;
