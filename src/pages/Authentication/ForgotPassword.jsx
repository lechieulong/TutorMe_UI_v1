import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestForgotAPI } from '../../redux/auth/AuthSlice';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.email) errors.email = 'Email is required';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            setFormErrors({
                email: '',
            });
            dispatch(requestForgotAPI(formData)); // Dispatch the action with form data
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className="font-montserrat bg-gradient-to-br from-sky-50 to-gray-200 w-screen h-screen flex items-center justify-center">
            <div className="flex w-full max-w-screen-lg">
                <div className="w-full lg:w-1/2 bg-yellow-100 hidden lg:flex items-center justify-center bg-cover rounded-l-lg">
                    <img
                        src="./src/assets/images/logo_1.png"
                        loading="lazy"
                        className="w-[200px] p-6 transition-all duration-300 hover:drop-shadow-lg"
                        alt="tutorme logo"
                    />
                </div>
                <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none flex flex-col justify-center">
                    <div className="px-8 mb-4 text-center">
                        <h3 className="pt-4 mb-2 text-2xl font-semibold">Forgot Your Password?</h3>
                        <p className="mb-4 text-sm text-gray-700">
                            We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!
                        </p>
                    </div>
                    <form className="px-8 pb-8 mb-4 bg-white rounded flex flex-col" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter Email Address..."
                                value={formData.email} // Bind value to state
                                onChange={handleChange} // Update state on change
                            />
                            {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>} {/* Show error if exists */}
                        </div>
                        <div className="mb-6 text-center">
                            <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
                                Reset Password
                            </button>
                            {status === "success" && (
                                <p className="font-mono text-xs text-green-500 text-center mt-2">
                                    Please <Link to="https://mail.google.com/" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">Check your email</Link>.
                                </p>
                            )}
                            {status === "pending" && (
                                <p className="font-mono text-xs text-yellow-500 text-center mt-2">Sending email...</p>
                            )}
                            {status === "failed" && (
                                <p className="font-mono text-xs text-red-500 text-center mt-2">{error}</p>
                            )}
                        </div>
                        <hr className="mb-6 border-t" />
                        <div className="text-center text-xs mb-4">
                            You don't have an account? <Link to="/register" className="underline">Register</Link> a new account <br />
                        </div>
                        <div className="text-center text-xs">
                            Already have an account? <Link to="/login" className="underline">Login</Link>
                            <p className="text-xs mt-2">
                                Back to our{" "}
                                <Link to="/" className="underline">
                                    Home page
                                </Link>{" "}
                                and continue.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
