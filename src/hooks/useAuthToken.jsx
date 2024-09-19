// src/hooks/useAuthToken.js
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useAuthToken = () => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get('authToken'); // Lấy token từ cookie
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return authToken;
};

export default useAuthToken;
