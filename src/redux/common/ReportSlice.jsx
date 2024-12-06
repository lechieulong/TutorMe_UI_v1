import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURLConfig from "../common/apiURLConfig";
import Cookies from "js-cookie";

// Thunks to interact with the API using axios

// Create Report
export const createReport = createAsyncThunk(
  "reports/createReport",
  async (reportData, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        `${apiURLConfig.baseURL}/Reports`,
        reportData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create report"
      );
    }
  }
);

// Get All Reports
export const getReports = createAsyncThunk(
  "reports/getReports",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(`${apiURLConfig.baseURL}/Reports`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reports"
      );
    }
  }
);

// Get Report by ID
export const getReportById = createAsyncThunk(
  "reports/getReportById",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${apiURLConfig.baseURL}/Reports/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch report by ID"
      );
    }
  }
);

// Update Report
export const updateReport = createAsyncThunk(
  "reports/updateReport",
  async ({ id, reportData }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.put(
        `${apiURLConfig.baseURL}/Reports/${id}`,
        reportData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update report"
      );
    }
  }
);

// Delete Report
export const deleteReport = createAsyncThunk(
  "reports/deleteReport",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      await axios.delete(`${apiURLConfig.baseURL}/Reports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the ID of the deleted report
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete report"
      );
    }
  }
);

// export const createReport = createAsyncThunk(
//   "report/createReports",
//   async ({ courseId, reportData, token }, { rejectWithValue }) => {
//     try {
//       let contentUrl = reportData.attachmentUrl;

//       // Nếu contentType là file và có file được chọn
//       if (reportData.contentType === "file" && reportData.file) {
//         const formData = new FormData();
//         formData.append("file", reportData.file);

//         // Gọi API tải file lên Azure
//         const uploadResponse = await axios.post(
//           `https://localhost:7030/api/upload-course-file?type=reportCourse&id=${courseId}`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         // Lấy đường dẫn file từ response
//         const fileName = uploadResponse.data.fileName || reportData.file.name;
//         contentUrl = `https://thientvhde160268.blob.core.windows.net/reportCourse/${courseId}/${fileName}`;
//       }

//       // Dữ liệu báo cáo cần tạo
//       const reportDataToSend = {
//         userId: reportData.userId,
//         courseId: courseId,
//         reportType: reportData.reportType,
//         issueTitle: reportData.issueTitle,
//         issueDescription: reportData.issueDescription,
//         attachmentUrl: contentUrl, // Đường dẫn file đã tải lên
//         priority: reportData.priority,
//         feedbackOption: reportData.feedbackOption,
//         status: "pending", // Mặc định trạng thái là "pending"
//       };

//       // Gửi yêu cầu tạo báo cáo
//       await axios.post("https://localhost:7030/api/Reports", reportDataToSend, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return { success: true };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Failed to create report."
//       );
//     }
//   }
// );

// Initial state for reports
const initialState = {
  reports: [],
  loading: false,
  error: null,
  currentReport: null, // For storing the fetched single report
};

// Report slice
const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle create report
      .addCase(createReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports.push(action.payload); // Add the new report to the state
      })
      .addCase(createReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle get all reports
      .addCase(getReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload; // Set the reports in the state
      })
      .addCase(getReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle get single report by ID
      .addCase(getReportById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReportById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReport = action.payload; // Store the fetched report in state
      })
      .addCase(getReportById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle update report
      .addCase(updateReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        state.loading = false;
        // Find and update the report in the state
        const index = state.reports.findIndex(
          (report) => report.id === action.payload.id
        );
        if (index >= 0) {
          state.reports[index] = action.payload;
        }
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle delete report
      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted report from the state
        state.reports = state.reports.filter(
          (report) => report.id !== action.payload
        );
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reportSlice.reducer;
