import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./classes/ClassSlice";
import authReducer from "./auth/AuthSlice";
import courseReducer from "./courses/CourseSlice";
import courseTimelineReducer from "./courses/CourseTimelineSlice";
import courseTimelineDetailReducer from "./courses/CourseTimelineDetailSlice";
import testReducer from "./testExam/TestSlice";
import userReducer from "./users/UserSlice";
import eventReducer from "./event/EventSlice";
import scheduleReducer from "./Schedule/ScheduleSlice";

export const store = configureStore({
  reducer: {
    courseTimelineDetail: courseTimelineDetailReducer,
    courseTimeline: courseTimelineReducer,
    courses: courseReducer,
    classes: classReducer,
    auth: authReducer,
    test: testReducer,
    user: userReducer,
    event: eventReducer,
    schedule: scheduleReducer,
  },
});

export default store;
