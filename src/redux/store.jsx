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
import ADMIN_usersReducer from "./ADMIN/UserSlice";
import ADMIN_teachersReducer from "./ADMIN/TeacherSlice";
import enrollmentReducer from "./Enrollment/EnrollmentSlice";
import ratingReducer from "./common/RatingSlice";
import User_BalanceReducer from "./users/BalanceSlice";
import courseSkillReducer from "./courses/CourseSkillSlice";
import courseLessonContentReducer from "./courses/CourseLessonContentSlice";
import coursePartReducer from "./courses/CoursePartSlice";
import courseReportReducer from "./courses/CourseReportSlice";
import reportReducer from "./common/ReportSlice";

export const store = configureStore({
  reducer: {
    report: reportReducer,
    courseReport: courseReportReducer,
    coursePart: coursePartReducer,
    courseLessonContent: courseLessonContentReducer,
    courseSkill: courseSkillReducer,
    rating: ratingReducer,
    enrollment: enrollmentReducer,
    courseTimelineDetail: courseTimelineDetailReducer,
    courseTimeline: courseTimelineReducer,
    courses: courseReducer,
    classes: classReducer,
    auth: authReducer,
    test: testReducer,
    user: userReducer,
    user_balance: User_BalanceReducer,
    event: eventReducer,
    answer: answerReducer,
    schedule: scheduleReducer,
    specialization: specializationReducer,
    ADMIN_userslice: ADMIN_usersReducer,
    ADMIN_teachers: ADMIN_teachersReducer,
  },
});

export default store;
