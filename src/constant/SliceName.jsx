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
  SPECIALIZATION: "specialization",
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
  BE_TEACHER: "beteacher",
  
  //Event
  GET_EVENT_BY_USERID: "geteventbyuserid",

  //Schedule
  SET_SCHEDULE: "setschedule",
  GET_SCHEDULE_7DAYS: "getschedule7days",

  //Specialization
  GET_SPECIALIZATION: "getspecialization",

  //ADMIN
  GET_ALL_USERS: "getallusers"
};

export const STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};
