import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./classes/ClassSlice";
import authReducer from "./auth/AuthSlice";
import courseReducer from "./courses/CourseSlice";

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    classes: classReducer,
    auth: authReducer,
  },
});

export default store;
