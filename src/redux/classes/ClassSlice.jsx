import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";

// Action để lấy danh sách lớp của khóa học
export const fetchClasses = createAsyncThunk(
  `${SLICE_NAMES.CLASSES}/${ACTIONS.GET_CLASSESOFCOURSE}`,
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURLConfig.baseURL}/class/course/${courseId}/classes`
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get classes from course."
      );
    }
  }
);

const initialState = {
  classes: [],
  status: STATUS.IDLE,
  error: null,
  switchStates: {}, // Trạng thái của các switch
};

const classSlice = createSlice({
  name: SLICE_NAMES.CLASSES,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.classes = action.payload;
        // Cập nhật trạng thái switch cho mỗi lớp
        const initialSwitchStates = {};
        action.payload.forEach((classItem) => {
          initialSwitchStates[classItem.id] = classItem.isEnabled;
        });
        state.switchStates = initialSwitchStates;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      });
  },
});

export default classSlice.reducer;
