// Slice name
export const SLICE_NAMES = {
  COURSESTIMELINEDETAIL: "courseTimelineDetail",
  COURSESTIMELINE: "coursesTimeline",
  COURSES: "courses",
  CLASSES: "classes",
  AUTH: "auth",
  TEST: "test",
  USER: "user",
};

export const ACTIONS = {
  GET_COURSES: "getCourses",
  GET_CLASS: "getClass",

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

  GET_USER_INFORMATION: "getProfile"
};

export const STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};
