import axios from './customize-axios';
import Cookies from 'js-cookie';

const loginApi = async (username, password) => {
    try {
        const response = await axios.post('/api/auth/login', { username, password });
        // Save token to cookies after successful login
        if (response.result.token) {
            Cookies.set('authToken', response.result.token, { expires: 30 });
        }
        return response;
    } catch (error) {
        console.error('Login error: ', error.response?.data || error.message);
        return error.response?.data || null;
    }
};

// Check if email exists
export const checkEmailExistsApi = async (email) => {
    const response = await fetch(`/api/auth/check-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    return response.json();
};

// Register a new user with Google email
export const registerGoogleUserApi = async (email, token) => {
    const response = await fetch(`/api/auth/register-google`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
    });
    return response.json();
};

// Log in with Google token
export const loginWithGoogleApi = async (token) => {
    const response = await fetch(`/api/auth/login-google`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });
    return response.json();
};

const logoutApi = () => {
    Cookies.remove('authToken');
    window.location.reload();
};

export { loginApi, logoutApi };