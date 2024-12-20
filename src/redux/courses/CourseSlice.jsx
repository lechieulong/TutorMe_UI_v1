/* eslint-disable react/prop-types */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURLConfig from "../common/apiURLConfig";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import Cookies from "js-cookie";

// Thunk để lấy tất cả khóa học với phân trang
export const fetchCourses = createAsyncThunk(
  "courses/getCourses",
  async (
    { pageNumber = 1, pageSize = 8, searchTerm = "", categoryFilter = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(`${apiURLConfig.baseURL}/Courses`, {
        params: {
          pageNumber,
          pageSize,
          searchTerm,
          categoryFilter,
        },
      });

      const data = response.data || {};
      const {
        data: courses = [],
        totalPages = 0,
        pageNumber: currentPage = 1,
        pageSize: currentPageSize = 8,
      } = data;

      return {
        data: courses,
        totalPages,
        pageNumber: currentPage,
        pageSize: currentPageSize,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch courses");
    }
  }
);

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
export const LecturerOfCourse = createAsyncThunk(
  "course/LecturerOfCourse",
  async ({ courseId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/Courses/check-lecturer`,
        {
          params: { courseId, userId },
        }
      );

      return !!response?.data?.result; // Chỉ lấy kết quả boolean từ API
    } catch (error) {}
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
export const updateCourseStatus = createAsyncThunk(
  "courses/updateStatus",
  async ({ courseId, courseEnabled }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${apiURLConfig.baseURL}/Courses/${courseId}/update-status`,
        courseEnabled, // Gửi trực tiếp giá trị boolean
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { courseEnabled: updatedCourseEnabled } = response.data; // Lấy giá trị courseEnabled từ response
      return { courseId, courseEnabled: updatedCourseEnabled }; // Trả về courseId và trạng thái courseEnabled từ response
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          return rejectWithValue("Cannot enable course without any classes.");
        }
      } else {
        return rejectWithValue("Lỗi kết nối với server.");
      }
    }
  }
);

export const checkIfRatedTeacher = createAsyncThunk(
  "course/checkIfRatedTeacher",
  async ({ userId, learnerId }, { rejectWithValue }) => {
    console.log(userId + "||" + learnerId);

    try {
      const response = await axios.get(
        `${apiURLConfig}/TeacherRatings/CheckIfRated`,
        {
          params: { userId, learnerId },
        }
      );
      return response.data; // Trả về boolean từ API
    } catch (error) {
      return rejectWithValue(error.response.data || "Error checking rating");
    }
  }
);

const initialState = {
  courseEnabled: {},
  hasRatedTeacher: null,
  isMentor: false,
  isLoading: false,
  error: null,
  course: null,
  courses: [],
  createdCourses: [],
  checkLecturer: null,
  classes: [],
  courseParts: [],
  courseLessonsByPart: {},
  count: 0,
  status: STATUS.IDLE,
  getCreatedCoursesStatus: STATUS.IDLE,
  checkLecturerStatus: STATUS.IDLE,
  getCreatedCoursesError: null,
  checkLecturerError: null,
  totalPages: 0,
  pageNumber: 1,
  pageSize: 8,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = STATUS.PENDING;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.courses = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || "Failed to fetch courses";
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
      .addCase(LecturerOfCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(LecturerOfCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isMentor = action.payload; // Nhận kết quả true/false
      })
      .addCase(LecturerOfCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //Handle switch course
      .addCase(updateCourseStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourseStatus.fulfilled, (state, action) => {
        const { courseId, courseEnabled } = action.payload;
        state.courseEnabled[courseId] = courseEnabled; // Cập nhật trạng thái courseEnabled cho khóa học tương ứng
        state.loading = false;
      })
      .addCase(updateCourseStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkIfRatedTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkIfRatedTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.hasRatedTeacher = action.payload;
      })
      .addCase(checkIfRatedTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
