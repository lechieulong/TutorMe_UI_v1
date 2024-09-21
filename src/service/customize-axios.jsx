import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "https://localhost:7030", // Cập nhật với URL API của bạn
});

// Thêm interceptor cho yêu cầu
instance.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu có
    const token = Cookies.get("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Xử lý lỗi yêu cầu
    return Promise.reject(error);
  }
);

// Thêm interceptor cho phản hồi
instance.interceptors.response.use(
  (response) => {
    // Trả về dữ liệu phản hồi
    return response.data;
  },
  (error) => {
    // Xử lý lỗi phản hồi
    if (error.response) {
      // Nếu có lỗi từ máy chủ
      const status = error.response.status;
      const message = error.response.data?.message || "An error occurred";

      // Hiển thị thông báo lỗi
      if (status === 401) {
        toast.error("Unauthorized. Please login again.");
        // Có thể thêm logic để xử lý đăng xuất người dùng
      } else if (status === 403) {
        toast.error("Forbidden. You do not have permission.");
      } else if (status === 404) {
        toast.error("Resource not found.");
      } else {
        toast.error(message);
      }
    } else {
      // Nếu không có lỗi từ máy chủ (network error, etc.)
      toast.error("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  }
);

export default instance;
