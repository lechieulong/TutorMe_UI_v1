import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./classes/ClassSlice";

export const store = configureStore({
  reducer: {
    classes: classReducer,
  },
});

export default store;
