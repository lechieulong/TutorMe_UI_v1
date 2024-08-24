import axios from "./customize-axios";

const loginApi = async (username, password) => {
    try {
        let response = await axios.post("/api/auth/login", {username, password});
        return response;
    } catch (error) {
        console.error("Login error: ", error.response?.data || error.message);
        return error.response?.data || null;
    }
}

export { loginApi };