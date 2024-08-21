import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <div className="font-montserrat bg-gradient-to-br from-sky-50 to-gray-200 w-screen h-screen flex items-center justify-center">
            <div className="flex w-full max-w-screen-lg">
                <div className="w-full lg:w-1/2 bg-gray-400 hidden lg:flex items-center justify-center bg-cover rounded-l-lg">
                    <img
                        src="./src/assets/logo.png"
                        loading="lazy"
                        className="h-24 p-6 transition-all duration-300 hover:drop-shadow-lg"
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
                    <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded flex flex-col">
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Enter Email Address..."
                            />
                        </div>
                        <div className="mb-6 text-center">
                            <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                                Reset Password
                            </button>
                        </div>
                        <hr className="mb-6 border-t" />
                        <div className="text-center text-xs mb-4">
                            You don't have an account? <Link to="/register" className="underline">Register</Link> a new account <br />
                        </div>
                        <div className="text-center text-xs">
                            Already have an account? <Link to="/" className="underline">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
