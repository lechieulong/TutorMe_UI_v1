import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./classes/ClassSlice";
import authReducer from "./auth/AuthSlice";

export const store = configureStore({
  reducer: {
    classes: classReducer,
    auth: authReducer,
  },
});

export default store;
