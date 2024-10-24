import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import Cookies from "js-cookie";

const API_BASE_URL = "https://localhost:7030/api";

export const fetchTests = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.FETCH_TESTS}`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/test`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tests"
      );
    }
  }
);

export const uploadFile = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.UPLOAD}`,
  async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // Return the response data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload file"
      );
    }
  }
);

export const createTest = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.CREATE_TEST}`,
  async (testData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/test`, testData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create test"
      );
    }
  }
);

// Action to update a test
export const updateTest = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.UPDATE_TEST}`,
  async ({ id, testData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/test/${id}`, testData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update test"
      );
    }
  }
);

export const deleteTest = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.DELETE_TEST}`,
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/test/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete test"
      );
    }
  }
);

// Updated importQuestion action to accept FormData
export const importQuestion = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.IMPORT_QUESTION}`,
  async (formData, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      await axios.post(
        `${API_BASE_URL}/test/questionsBank/questionsBank/import`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Ensure correct content type is set
          },
        }
      );
      return formData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to import questions"
      );
    }
  }
);
export const getQuestionsBank = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.GET_QUESTIONS_BANK}`,
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/test/questionsBank/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to retrieve questions bank"
      );
    }
  }
);

export const addQuestions = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.ADD_QUESTIONS}`,
  async (questions, { rejectWithValue }) => {
    try {
      console.log("questions", questions);

      const token = Cookies.get("authToken");

      await axios.post(
        `${API_BASE_URL}/test/questionsBank`, // Adjust endpoint if necessary
        questions,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Adjust according to your backend needs
          },
        }
      );
      return questions;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add questions"
      );
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.DELETE_QUESTION}`,
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/test/questionsBank/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete test"
      );
    }
  }
);

export const updateQuestion = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.UPDATE_QUESTION}`,
  async ({ id, updatedQuestion }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/test/questionsBank/${id}`,
        updatedQuestion
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update question"
      );
    }
  }
);

const initialState = {
  tests: [],
  status: STATUS.IDLE,
  error: null,
};

const TestSlice = createSlice({
  name: SLICE_NAMES.TEST,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tests
      .addCase(fetchTests.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.tests = action.payload;
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      })

      .addCase(createTest.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.tests.push(action.payload); // Add the new test to the list
      })
      .addCase(createTest.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      })

      // Update a test
      .addCase(updateTest.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(updateTest.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        // Update the test in the list
        const index = state.tests.findIndex(
          (test) => test.id === action.payload.id
        );
        if (index !== -1) {
          state.tests[index] = action.payload;
        }
      })
      .addCase(updateTest.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      })

      // Delete a test
      .addCase(deleteTest.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(deleteTest.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        // Remove the test from the list
        state.tests = state.tests.filter((test) => test.id !== action.payload);
      })
      .addCase(deleteTest.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error.message;
      });
  },
});

export default TestSlice.reducer;
