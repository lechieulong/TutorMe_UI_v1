import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";

export const fetchClasses = createAsyncThunk(
  `${SLICE_NAMES.CLASSES}/${ACTIONS.GET_CLASSESOFCOURSE}`,
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/class/course/${courseId}/classes`
      );
      return { courseId, classes: response.data.result || [] }; // Gắn kèm courseId để sử dụng sau
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get classes from course."
      );
    }
  }
);

export const fetchUnenrolledClasses = createAsyncThunk(
  "unenrolledClasses/fetchUnenrolledClasses",
  async ({ courseId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiURLConfig}/class/unenrolled`, {
        params: { courseId, userId },
      });
      console.log(courseId);
      return { courseId, classes: response.data }; // Trả về dữ liệu kèm courseId
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch unenrolled classes."
      );
    }
  }
);

export const fetchEnabledStatus = createAsyncThunk(
  "class/fetchEnabledStatus",
  async (classId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig}/class/${classId}/enabled`
      );
      return { classId, isEnabled: response.data.isEnabled };
    } catch (error) {
      console.error("Không thể tải trạng thái enabled của lớp học:", error);
      return rejectWithValue("Lỗi khi tải trạng thái lớp học");
    }
  }
);

export const updateEnabledStatus = createAsyncThunk(
  "class/updateEnabledStatus",
  async ({ classId, newStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${apiURLConfig}/class/${classId}/enabled`,
        newStatus, // Truyền trực tiếp giá trị boolean
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // API trả về true/false nên sử dụng trực tiếp:
      return { classId, isEnabled: response.data };
    } catch (error) {
      console.error("Không thể cập nhật trạng thái lớp học:", error);
      return rejectWithValue("Lỗi khi cập nhật trạng thái lớp học");
    }
  }
);

// Async thunk để tạo lớp học mới
export const createClass = createAsyncThunk(
  `${SLICE_NAMES.CLASSES}/${ACTIONS.CREATE_CLASS}`,
  async ({ newClass }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiURLConfig.baseURL}/class`,
        newClass
      );
      const result = response.data.result;

      console.log("API response:", response.data);

      if (!result) {
        throw new Error("Response does not contain valid data.");
      }

      if (!result.id) {
        console.warn("Class created but response is missing class ID.");
      }

      return result;
    } catch (error) {
      console.error("Create class error:", error.response || error.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create class."
      );
    }
  }
);

// Async thunk để upload file cho lớp học
export const uploadClassFile = createAsyncThunk(
  `${SLICE_NAMES.CLASSES}/uploadClassFile`,
  async ({ classId, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${apiURLConfig}/upload-course-file?type=class&id=${classId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fileName = response.data.fileName || file.name;
      const fileEndpoint = `https://thientvhde160268.blob.core.windows.net/class/${classId}/${fileName}`;

      return { fileUrl: fileEndpoint };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to upload file. Please try again."
      );
    }
  }
);

export const updateClass = createAsyncThunk(
  `${SLICE_NAMES.CLASSES}/${ACTIONS.UPDATE_CLASS}`,
  async ({ classId, classDto }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${apiURLConfig.baseURL}/class/update/${classId}`,
        classDto,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data.result;
    } catch (error) {
      console.error("Cập nhật lớp học thất bại:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update class."
      );
    }
  }
);

export const fetchClassById = createAsyncThunk(
  `${SLICE_NAMES.CLASSES}/fetchClassById`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiURLConfig.baseURL}/class/${id}`);

      if (response.data?.isSuccess) {
        return response.data.result; // Trả về thông tin lớp học
      }

      throw new Error(response.data?.message || "Failed to fetch class data");
    } catch (error) {
      console.error("Không thể lấy thông tin lớp học:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch class."
      );
    }
  }
);

const initialState = {
  unenrolledClassesByCourse: {},
  classes: {},
  status: STATUS.IDLE,
  error: null,
  switchStates: {},
  createStatus: STATUS.IDLE,
  createError: null,
  classDetails: null,
  loading: false,
};

const classSlice = createSlice({
  name: SLICE_NAMES.CLASSES,
  initialState,
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = STATUS.IDLE;
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        const { courseId, classes } = action.payload;
        state.status = STATUS.SUCCEEDED;
        state.classes[courseId] = classes; // Gắn danh sách classes theo courseId
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(createClass.pending, (state) => {
        state.createStatus = STATUS.PENDING;
        state.createError = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.createStatus = STATUS.SUCCESS;
        state.classes.push(action.payload);
      })
      .addCase(createClass.rejected, (state, action) => {
        state.createStatus = STATUS.FAILED;
        state.createError = action.payload || action.error.message;
      })
      .addCase(fetchEnabledStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnabledStatus.fulfilled, (state, action) => {
        const { classId, isEnabled } = action.payload;
        state.classes[classId] = { isEnabled };
        state.loading = false;
      })
      .addCase(fetchEnabledStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update trạng thái lớp học
      .addCase(updateEnabledStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEnabledStatus.fulfilled, (state, action) => {
        const { classId, isEnabled } = action.payload;
        state.classes[classId] = { isEnabled };
        state.loading = false;
      })
      .addCase(updateEnabledStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUnenrolledClasses.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchUnenrolledClasses.fulfilled, (state, action) => {
        const { courseId, classes } = action.payload;
        state.status = STATUS.SUCCEEDED;
        state.unenrolledClassesByCourse[courseId] = classes; // Lưu danh sách theo courseId
      })
      .addCase(fetchUnenrolledClasses.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(updateClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.loading = false;
        const updatedClass = action.payload;
        state.classes[updatedClass.id] = updatedClass; // Cập nhật thông tin lớp học mới
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchClassById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassById.fulfilled, (state, action) => {
        state.loading = false;
        state.classDetails = action.payload;
      })
      .addCase(fetchClassById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateStatus } = classSlice.actions;

export default classSlice.reducer;
