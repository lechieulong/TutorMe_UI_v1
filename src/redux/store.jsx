import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./classes/ClassSlice";
import authReducer from "./auth/AuthSlice";
import testReducer from "./testExam/TestSlice";

export const store = configureStore({
  reducer: {
    classes: classReducer,
    auth: authReducer,
    test: testReducer,
  },
});

export default store;
