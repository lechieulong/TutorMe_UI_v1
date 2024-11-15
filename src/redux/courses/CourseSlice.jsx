import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURLConfig from "../common/apiURLConfig";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import Cookies from "js-cookie";

// Thunk để lấy tất cả khóa học
export const fetchCourses = createAsyncThunk("courses/getCourses", async () => {
  try {
    const response = await axios.get("https://localhost:7030/api/Courses");
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

// Thunk để lấy khóa học theo UserId
export const fetchCoursesByUserId = createAsyncThunk(
  "courses/getCoursesByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/Courses/user/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch courses by UserId."
      );
    }
  }
);

// Action get courses info by id
export const GetCourseById = createAsyncThunk(
  `${SLICE_NAMES.COURSES}/${ACTIONS.GET_COURSE_BY_ID}`,
  async (courseId, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${apiURLConfig.baseURL}/Courses/course-info/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        }
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load courses!"
      );
    }
  }
);

// Action get created courses
export const GetCreatedCourses = createAsyncThunk(
  `${SLICE_NAMES.COURSES}/${ACTIONS.GET_CREATED_COURSES}`,
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${apiURLConfig.baseURL}/Courses/created-courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load courses!"
      );
    }
  }
);

// Action check lecturer
export const CheckLecturerOfCourse = createAsyncThunk(
  `${SLICE_NAMES.COURSES}/${ACTIONS.CHECK_LECTURER_OF_COURSE}`,
  async (courseId, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${apiURLConfig.baseURL}/Courses/check-lecturer/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        }
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check lecturer!"
      );
    }
  }
);

// Thunk để lấy lớp học từ courseId
export const fetchClasses = createAsyncThunk(
  "courses/getClassesOfCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/Courses/${courseId}/classes`
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get classes from course."
      );
    }
  }
);

// Thêm Thunk mới để lấy các CourseParts từ CourseId
export const fetchCourseParts = createAsyncThunk(
  "courses/getCourseParts",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseParts/ByCourse/${courseId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch course parts."
      );
    }
  }
);

// Thêm Thunk mới để lấy các CourseLessons từ CoursePartId
export const fetchCourseLessons = createAsyncThunk(
  "courses/getCourseLessons",
  async (coursePartId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/CourseLessons?coursePartId=${coursePartId}`
      );
      return { coursePartId, lessons: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        `Failed to fetch lessons for CoursePart ${coursePartId}`
      );
    }
  }
);

const initialState = {
  course: null,
  courses: [],
  createdCourses: [],
  checkLecturer: null,
  classes: [],
  courseParts: [],
  courseLessonsByPart: {},
  count: 0,
  status: "idle",
  getCreatedCoursesStatus: STATUS.IDLE,
  checkLecturerStatus: STATUS.IDLE,
  error: null,
  getCreatedCoursesError: null,
  checkLecturerError: null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "success";
        state.courses = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCoursesByUserId.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCoursesByUserId.fulfilled, (state, action) => {
        state.status = "success";
        state.courses = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchCoursesByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchClasses.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = "success";
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCourseParts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCourseParts.fulfilled, (state, action) => {
        state.status = "success";
        state.courseParts = action.payload;
      })
      .addCase(fetchCourseParts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCourseLessons.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCourseLessons.fulfilled, (state, action) => {
        state.status = "success";
        state.courseLessonsByPart[action.payload.coursePartId] =
          action.payload.lessons;
      })
      .addCase(fetchCourseLessons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Handle get course by id
      .addCase(GetCourseById.pending, (state) => {
        state.status = STATUS.PENDING;
        state.error = null;
      })
      .addCase(GetCourseById.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.course = action.payload;
      })
      .addCase(GetCourseById.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      })

      // Handle get created courses
      .addCase(GetCreatedCourses.pending, (state) => {
        state.getCreatedCoursesStatus = STATUS.PENDING;
        state.getCreatedCoursesError = null;
      })
      .addCase(GetCreatedCourses.fulfilled, (state, action) => {
        state.getCreatedCoursesStatus = STATUS.SUCCESS;
        state.createdCourses = action.payload;
      })
      .addCase(GetCreatedCourses.rejected, (state, action) => {
        state.getCreatedCoursesStatus = STATUS.FAILED;
        state.getCreatedCoursesError = action.payload || action.error.message;
      })

      // Handle check lecturer
      .addCase(CheckLecturerOfCourse.pending, (state) => {
        state.checkLecturerStatus = STATUS.PENDING;
        state.checkLecturerError = null;
      })
      .addCase(CheckLecturerOfCourse.fulfilled, (state, action) => {
        state.checkLecturerStatus = STATUS.SUCCESS;
        state.checkLecturer = action.payload;
      })
      .addCase(CheckLecturerOfCourse.rejected, (state, action) => {
        state.checkLecturerStatus = STATUS.FAILED;
        state.checkLecturerError = action.payload || action.error.message;
      })
  },
});

export default courseSlice.reducer;
