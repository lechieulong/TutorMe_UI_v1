// Slice name
export const SLICE_NAMES = {
  COURSESTIMELINEDETAIL: "courseTimelineDetail",
  COURSESTIMELINE: "coursesTimeline",
  COURSES: "courses",
  CLASSES: "classes",
  AUTH: "auth",
  TEST: "test",
  USER: "user",
  EVENT: "event",
  SCHEDULE: "schedule",
  COMMON: "common",
};

export const ACTIONS = {
  GET_COURSES: "getCourses",
  GET_CLASSESOFCOURSE: "getClassesOfCourse",
  GET_CLASS: "getClass",
  CREATE_CLASS: "createClass",

  LOGIN: "login",
  REGIS: "register",
  CHECK_EMAIL: "check-email",
  REGISTER_GOOGLE: "register-google",
  LOGIN_GOOGLE: "login-google",
  CHANGE_PASSWORD: "change-password",
  REQUEST_FORGOT: "forgot-password",
  RESET_PASSWORD: "reset-password",

  FETCH_TESTS: "getTests",
  CREATE_TEST: "createTest",
  UPDATE_TEST: "updateTest",
  DELETE_TEST: "deleteTest",

  IMPORT_QUESTION: "importQuestion",
  GET_QUESTIONS_BANK: "getQuestionsBank",
  ADD_QUESTIONS: "addQuestions",
  DELETE_QUESTION: "deleteQuestion",
  UPDATE_QUESTION: "updateQuestion",
  ADD_SKILLS: "addSkills",

  GET_USER_INFORMATION: "getProfile",
  GET_TOP10_TEACHERS: "getTop10Teachers",
  SEARCH_TEACHER: "searchteacher",

  //Event
  GET_EVENT_BY_USERID: "geteventbyuserid",

  //Schedule
  SET_SCHEDULE: "setschedule",
  GET_SCHEDULE_7DAYS: "getschedule7days",
};

export const STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};
