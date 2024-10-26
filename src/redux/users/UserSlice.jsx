import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SLICE_NAMES, ACTIONS, STATUS } from "../../constant/SliceName";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

// Action get user by ID
export const GetUserByID = createAsyncThunk(
    `${SLICE_NAMES.USER}/${ACTIONS.GET_USER_BY_ID}`,
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${apiURLConfig.baseURL}/user/${userId}`,
            );
            return response.data.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to load user!"
            );
        }
    }
);

// Action profile
export const Profile = createAsyncThunk(
    `${SLICE_NAMES.USER}/${ACTIONS.GET_USER_INFORMATION}`,
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${apiURLConfig.baseURL}/user/profile/${username}`,
            );
            return response.data.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to load user profile!"
            );
        }
    }
);

// Action to get top 10 teachers
export const GetTopTeachers = createAsyncThunk(
    `${SLICE_NAMES.USER}/${ACTIONS.GET_TOP10_TEACHERS}`,
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const { data } = await axios.get(
                `${apiURLConfig.baseURL}/user/top-teachers`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in headers
                    },
                }
            );
            return data.result; // Return the result from the response
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to get teachers."
            );
        }
    }
);

// Action to search top 5 teachers
export const SearchTeacher = createAsyncThunk(
    `${SLICE_NAMES.USER}/${ACTIONS.SEARCH_TEACHER}`,
    async (searchText, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${apiURLConfig.baseURL}/user/search/${searchText}`,
                searchText
            );
            return response.result.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to get teachers."
            );
        }
    }
);

//Action to reagister teacher
export const BeTeacher = createAsyncThunk(
    `${SLICE_NAMES.USER}/${ACTIONS.BE_TEACHER}`,
    async (userData, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            const response = await axios.post(
                `${apiURLConfig.baseURL}/teacherrequest/beteacher`, userData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in the request headers
                    },
                }
            );
            return response.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to be teacher."
            );
        }
    }
);

const initialState = {
    user: null,
    teachers: [],
    searchTeachers: [],
    userInfor: null, // Thông tin người dùng
    status: STATUS.IDLE, // Trạng thái mặc định
    getuserstatus: STATUS.IDLE, // Trạng thái mặc định
    error: null, // Thông báo lỗi nếu có
    loadingTopTeachers: false,
    beTeacherResponse: null,
    beTeacherStatus: STATUS.IDLE,
    beTeacherError: null,
};

const UserSlice = createSlice({
    name: SLICE_NAMES.USER,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Handle get User ny ID
            .addCase(GetUserByID.pending, (state) => {
                state.getuserstatus = STATUS.PENDING;
            })
            .addCase(GetUserByID.fulfilled, (state, action) => {
                state.getuserstatus = STATUS.SUCCESS;
                state.user = action.payload;
            })
            .addCase(GetUserByID.rejected, (state, action) => {
                state.getuserstatus = STATUS.FAILED;
                state.error = action.payload || action.error.message;
            })

            //Hanlde get User Information
            .addCase(Profile.pending, (state) => {
                state.status = STATUS.PENDING;
            })
            .addCase(Profile.fulfilled, (state, action) => {
                state.status = STATUS.SUCCESS;
                state.userInfor = action.payload;
            })
            .addCase(Profile.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                state.error = action.payload || action.error.message;
            })

            // Handle get top teachers
            .addCase(GetTopTeachers.pending, (state) => {
                state.loadingTopTeachers = true; // Set loading state for top teachers
                state.status = STATUS.PENDING;
            })
            .addCase(GetTopTeachers.fulfilled, (state, action) => {
                state.loadingTopTeachers = false; // Reset loading state
                state.status = STATUS.SUCCESS;
                state.teachers = action.payload;
            })
            .addCase(GetTopTeachers.rejected, (state, action) => {
                state.loadingTopTeachers = false; // Reset loading state
                state.status = STATUS.FAILED;
                state.error = action.payload || action.error.message;
            })

            // Handle search top teachers
            .addCase(SearchTeacher.pending, (state) => {
                state.status = STATUS.PENDING;
            })
            .addCase(SearchTeacher.fulfilled, (state, action) => {
                state.status = STATUS.SUCCESS;
                state.searchTeachers = action.payload;
            })
            .addCase(SearchTeacher.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                state.error = action.payload || action.error.message;
            })

            // Handle be teacher
            .addCase(BeTeacher.pending, (state) => {
                state.beTeacherStatus = STATUS.PENDING;
            })
            .addCase(BeTeacher.fulfilled, (state, action) => {
                state.beTeacherStatus = STATUS.SUCCESS;
                state.beTeacherResponse = action.payload;
            })
            .addCase(BeTeacher.rejected, (state, action) => {
                state.beTeacherStatus = STATUS.FAILED;
                state.beTeacherError = action.payload || action.error.message;
            })
    },
});

export default UserSlice.reducer;