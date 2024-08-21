import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className="font-montserrat bg-gradient-to-br from-sky-50 to-gray-200 w-screen h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-center space-x-4 mb-4">
                    <img
                        src="./src/assets/logo.png"
                        loading="lazy"
                        className="w-[200px]"
                        alt="tutorme logo"
                    />
                    <h1 className="font-mono text-2xl font-bold text-gray-900">REGISTER</h1>
                </div>
                <form className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="block w-full h-12 px-4 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                            placeholder="Email"
                        />
                    </div>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <div className="flex-1">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="block w-full h-12 px-4 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                                placeholder="Password"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="confirm-password" className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                className="block w-full h-12 px-4 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <label htmlFor="role" className="block text-gray-700 font-semibold mr-4">ROLE</label>
                        <select
                            id="role"
                            className="block w-full h-12 px-4 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                        >
                            <option value="" selected disabled>Select Role</option>
                            <option value="user">USER</option>
                            <option value="moderator">MENTOR</option>
                        </select>
                    </div>
                    <div className="mt-6">
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            REGISTER
                        </button>
                    </div>
                </form>
                <div className="space-y-4 text-gray-600 text-center">
                    <p className="text-xs mt-2">
                        -----------------or-----------------
                    </p>
                    <div className="grid gap-4">
                        <button className="group h-12 px-4 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-3 justify-center">
                                <img
                                    src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                                    className="absolute left-0 w-5"
                                    alt="Google logo"
                                />
                                <span className="block font-semibold text-gray-700 text-sm transition duration-300 group-hover:text-blue-600">
                                    Continue with Google
                                </span>
                            </div>
                        </button>
                        <button className="group h-12 px-4 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-3 justify-center">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                                    className="absolute left-0 w-5"
                                    alt="Facebook logo"
                                />
                                <span className="block font-semibold text-gray-700 text-sm transition duration-300 group-hover:text-blue-600">
                                    Continue with Facebook
                                </span>
                            </div>
                        </button>
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-xs">
                            Already have an account? <Link to="/login" className="underline">Login</Link>
                        </p>
                        <p className="text-xs mt-2">
                            Back to our <Link to="/" className="underline">Home page</Link> and continue.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
