// src/components/SetScheduleForm.js

import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetScheduleForm = ({ isModalOpen, toggleModal, onSubmit, formData, setFormData, formErrors, setFormErrors, nowFormatted, setStatus, error }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.startTime) errors.startTime = "Start Time is required";
        if (!formData.minutes) {
            errors.minutes = "Minutes is required";
        } else if (!Number.isInteger(Number(formData.minutes))) {
            errors.minutes = "Minutes must be a valid integer";
        }
        if (!formData.price) {
            errors.price = "Price is required";
        } else if (!Number.isInteger(Number(formData.price))) {
            errors.price = "Price must be a valid integer";
        }
        if (!formData.link) errors.link = "Link is required";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            try {
                await onSubmit(formData); // Call the onSubmit function passed as a prop
                setFormData({
                    startTime: "",
                    minutes: "",
                    price: "",
                    link: "",
                    isBooked: false,
                    teacherId: ""
                });
                toast.success("Set schedule successful");
                toggleModal();
            } catch (error) {
                console.log(error);
            }
        } else {
            setFormErrors(errors);
        }
    };

    return (
        isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                    <h2 className="text-2xl font-bold mb-4">Set Schedule</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
                            <input
                                type="datetime-local"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                min={nowFormatted}
                                required
                            />
                            {formErrors.startTime && <p className="text-red-500 text-xs">{formErrors.startTime}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Minutes</label>
                            <input
                                type="number"
                                name="minutes"
                                value={formData.minutes}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                            {formErrors.minutes && <p className="text-red-500 text-xs">{formErrors.minutes}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                            {formErrors.price && <p className="text-red-500 text-xs">{formErrors.price}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Link</label>
                            <input
                                type="url"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                            {formErrors.link && <p className="text-red-500 text-xs">{formErrors.link}</p>}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={toggleModal}
                                className="bg-gray-400 text-white px-4 py-2 rounded mr-2">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-green-400 text-white px-4 py-2 rounded">
                                Submit
                            </button>
                        </div>
                        {/* Success message */}
                        {setStatus === "pending" && (
                            <p className="font-mono text-xs text-yellow-500 text-center mt-2">Setting...</p>
                        )}
                        {setStatus === "failed" && (
                            <p className="font-mono text-xs text-red-500 text-center mt-2">{error}</p>
                        )}
                    </form>
                </div>
            </div>
        )
    );
};

export default SetScheduleForm;
