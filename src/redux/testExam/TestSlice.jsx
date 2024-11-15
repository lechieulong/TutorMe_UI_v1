import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import Cookies from "js-cookie";

const API_BASE_URL = "https://localhost:7030/api";

export const fetchTests = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.FETCH_TESTS}`,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/test/${userId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tests"
      );
    }
  }
);

export const getTest = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.GET_TEST}`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/test/${id}/testDetail`);
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tests"
      );
    }
  }
);

export const getHistorytest = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.GET_HISTORY_TEST}`,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/test/${userId}/history`
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch history tests"
      );
    }
  }
);

export const getParts = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.GET_PARTS}`,
  async (skillId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/test/${skillId}/parts`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tests"
      );
    }
  }
);

export const getSkills = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.GET_SKILLS}`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/test/${id}/skills`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tests"
      );
    }
  }
);

export const getSkill = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.GET_SKILL}`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/test/${id}/skill`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tests"
      );
    }
  }
);

export const getTesting = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.GET_TESTING}`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/test/${id}/testing`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tests"
      );
    }
  }
);

export const downloadTemplate = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.DOWNLOAD_TEMPLATE}`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/template`);
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
    const token = Cookies.get("authToken");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      const token = Cookies.get("authToken");
      const response = await axios.post(`${API_BASE_URL}/test`, testData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", //
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create test"
      );
    }
  }
);

export const getTestBySectionCourseId = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.GET_TEST_SECTION_COURSE}`,
  async (sectionCourseId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${sectionCourseId}/sectionCourseId`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get test by section course id "
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
      await axios.post(`${API_BASE_URL}/test/questionsBank/import`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Ensure correct content type is set
        },
      });
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

export const addSkills = createAsyncThunk(
  `${SLICE_NAMES.TEST}/${ACTIONS.ADD_SKILLS}`,
  async ({ skillsData, testId }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        `${API_BASE_URL}/test/skills/${testId}`,
        skillsData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add skills"
      );
    }
  }
);

const initialState = {
  tests: [],
  status: STATUS.IDLE,
  error: null,
  questions: [],
};

const TestSlice = createSlice({
  name: SLICE_NAMES.TEST,
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      action.payload.forEach((newQuestion) => {
        const questionId = newQuestion.id;
        if (!state.questions.some((question) => question.id === questionId)) {
          state.questions.push(newQuestion);
        }
      });
    },

    removeQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (question) => question.id !== action.payload
      );
    },
    clearQuestions: (state) => {
      state.questions = [];
    },
  },
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
export const { addQuestion, removeQuestion, clearQuestions } =
  TestSlice.actions;
export const selectQuestions = (state) => state[SLICE_NAMES.TEST].questions;
export default TestSlice.reducer;
