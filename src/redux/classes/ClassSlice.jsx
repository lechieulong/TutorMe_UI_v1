import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";

// Async thunk để lấy danh sách lớp học
export const fetchClasses = createAsyncThunk(
  `${SLICE_NAMES.CLASSES}/${ACTIONS.GET_CLASSESOFCOURSE}`,
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/class/course/${courseId}/classes`
      );
      return response.data.result || []; // Trả về mảng trống nếu không có lớp học
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get classes from course."
      );
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
        `https://localhost:7030/api/upload-course-file?type=class&id=${classId}`,
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

const initialState = {
  classes: [],
  status: STATUS.IDLE,
  error: null,
  switchStates: {},
  createStatus: STATUS.IDLE,
  createError: null,
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
        state.status = STATUS.PENDING;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.classes = action.payload;
        const initialSwitchStates = {};
        action.payload.forEach((classItem) => {
          initialSwitchStates[classItem.id] = classItem.isEnabled;
        });
        state.switchStates = initialSwitchStates;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error.message;
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
      });
  },
});

export const { resetCreateStatus } = classSlice.actions;

export default classSlice.reducer;
