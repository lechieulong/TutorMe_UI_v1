// ./service/GetUser

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const getUser = () => {
  const token = Cookies.get("authToken");
  if (token) {
    try {
      const response = jwtDecode(token);
      return response;
    } catch (error) {
      console.error("Token không hợp lệ", error);
      return null;
    }
  } else {
    console.log("Token không tồn tại");
    return null;
  }
};
