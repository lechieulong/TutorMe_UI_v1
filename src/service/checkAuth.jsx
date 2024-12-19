import { useState, useEffect } from 'react';
import axios from "axios";
import { Roles } from "../utils/config";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"; // Import js-cookie
import { useNavigate } from "react-router-dom";
import { GetUserByID } from '../redux/users/UserSlice';
import { useDispatch, useSelector } from "react-redux";
import { checkLocked } from '../redux/auth/AuthSlice';

const CheckAuthUser = () => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const TOKEN = Cookies.get("authToken");
        // Check if the token exists
        if (!TOKEN) {
            setIsAuthenticated(false);
            return;
        }
        try {
            const decodedToken = jwtDecode(TOKEN);
            const userId = decodedToken.sub; // Assuming userId is stored in the 'sub' field

            // Dispatch action to get user details and check for existence
            const userPromise = dispatch(GetUserByID(userId));
            userPromise
                .unwrap() // Wait for the action to complete
                .then((userData) => {
                    setIsAuthenticated(true); // Set authenticated state to true
                })
                .catch((error) => {
                    Cookies.remove("authToken");
                    console.error("Error fetching user data:", error);
                    setIsAuthenticated(false); // Set authenticated state to false
                });

        } catch (error) {
            console.error("Invalid token:", error);
            setIsAuthenticated(false); // Invalid token means not authenticated
        }
    }, [dispatch]);

    return isAuthenticated; // Return the authentication status
};

const CheckLockUser = () => {
    const dispatch = useDispatch();
    const [isLocked, setIsLocked] = useState(false);
    const [lockMessage, setLockMessage] = useState(null);

    useEffect(() => {
        const TOKEN = Cookies.get("authToken");

        // Check if the token exists
        if (!TOKEN) {
            setIsLocked(false);
            setLockMessage("No token found, user not authenticated.");
            return;
        }

        try {
            const decodedToken = jwtDecode(TOKEN);
            const email = decodedToken.email;

            // Dispatch action to check lock status
            const checkLockStatus = async () => {
                try {
                    const data = await dispatch(checkLocked({ email })).unwrap();  // unwrap to handle resolved or rejected action
                    if (data && data.result) {
                        setIsLocked(true);
                        setLockMessage(data.message || "User is locked.");
                    } else {
                        setIsLocked(false);
                        setLockMessage(data.message || "User is not locked.");
                    }
                } catch (error) {
                    console.error("Error checking lock status:", error);
                    setIsLocked(false);
                    setLockMessage("Error occurred while checking lock status.");
                }
            };

            checkLockStatus();
        } catch (error) {
            console.error("Invalid token:", error);
            setIsLocked(false);
            setLockMessage("Invalid token, user not authenticated.");
        }
    }, [dispatch]);

    return { isLocked, lockMessage };
};

// AdminRoute component to check admin authentication
const AdminRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const TOKEN = Cookies.get("authToken");

        if (!TOKEN) {
            navigate("/not-authorized");
            return;
        }

        try {
            const decodedToken = jwtDecode(TOKEN);
            const userRoles = decodedToken.role;

            if (!userRoles.includes(Roles.ADMIN)) {
                // Redirect if the user does not have the Admin role
                navigate("/not-authorized");
            }
        } catch (error) {
            console.error("Invalid token:", error);
            navigate("/not-authorized");
        }
    }, [navigate]);

    return children; // Render the children (AdminApp) if authenticated
};

export { AdminRoute, CheckAuthUser, CheckLockUser };