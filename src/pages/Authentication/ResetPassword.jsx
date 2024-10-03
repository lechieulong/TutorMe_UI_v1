import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAPI } from '../../redux/auth/AuthSlice';

const ResetPassword = () => {
    const [searchParams] = useSearchParams(); // Access the search parameters
    const token = searchParams.get('token'); // Get the token from the URL
    const email = searchParams.get('email'); // Get the email from the URL

    const dispatch = useDispatch();

    const { status, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: email,
        token: token,
        newPassword: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

        if (!formData.newPassword) {
            errors.newPassword = "New password is required";
        } else if (!passwordRegex.test(formData.newPassword)) {
            errors.newPassword = "Password must be at least 8 characters long and contain at least one uppercase letter and one special character";
        }
        if (formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            setFormErrors({});

            const { confirmPassword, ...userData } = formData;
            dispatch(resetPasswordAPI(userData)); // Dispatch the action with form data
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="container mx-auto my-10 p-5 border rounded shadow-lg bg-white max-w-sm">
                <h1 className="text-2xl font-bold mb-5 text-center">Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">New Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formErrors.newPassword && <p className="text-red-500">{formErrors.newPassword}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formErrors.confirmPassword && <p className="text-red-500">{formErrors.confirmPassword}</p>}
                    </div>
                    {status === 'failed' && <p className="text-red-500">{error}</p>}
                    {status === 'success' && <p className="text-green-500">Reset successfully.</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                        disabled={status === 'pending'}
                    >
                        {status === 'pending' ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
