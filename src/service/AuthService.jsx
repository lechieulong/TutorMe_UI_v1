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

const logoutApi = () => {
    Cookies.remove('authToken');
    window.location.reload();
};

export { loginApi, logoutApi };