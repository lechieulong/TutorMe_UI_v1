import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

//custom lại axios

// Tạo Axios instance
const instance = axios.create({
  // sau deploy sẽ thay tên miền vào đây
  baseURL: "https://localhost:7030",
});

// Thêm interceptor cho yêu cầu
instance.interceptors.request.use(
  (config) => {
    // Kiểm tra nếu yêu cầu có thuộc tính skipAuth, không thêm token
    if (!config.skipAuth) {
      const token = Cookies.get("authToken");
      if (token) {
        // Đoạn này sẽ thêm token vào header để authorize người dùng đã login
        config.headers["Authorization"] = `Bearer ${token}`;
      }
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
      const status = error.response.status;
      const message = error.response.data?.message || "An error occurred";

      if (status === 401) {
        // Chuyen toi trang Login
        toast.error("Unauthorized. Please login again.");
        // Có thể thêm logic để xử lý đăng xuất người dùng
      } else if (status === 403) {
        // Có thể là trường hợp bị lockout || account trong db bị xóa
        toast.error("Forbidden. You do not have permission.");
      } else if (status === 404) {
        // Return 404 page
        toast.error("Resource not found.");
      } else {
        toast.error(message);
      }
    } else {
      //return page 404
      toast.error("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  }
);

export default instance;
