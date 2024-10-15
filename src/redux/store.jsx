import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./classes/ClassSlice";
import authReducer from "./auth/AuthSlice";
import courseReducer from "./courses/CourseSlice";
import courseTimelineReducer from "./courses/CourseTimelineSlice";
import courseTimelineDetailReducer from "./courses/CourseTimelineDetailSlice";
import testReducer from "./testExam/TestSlice";
import userReducer from "./users/UserSlice";
import eventReducer from "./event/EventSlice";
import answerReducer from "./answer/answerSlice";
import scheduleReducer from "./Schedule/ScheduleSlice";
import specializationReducer from "./specialization/SpecializationSlice";

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
    answer: answerReducer,
    schedule: scheduleReducer,
    specialization: specializationReducer,
  },
});

export default store;
