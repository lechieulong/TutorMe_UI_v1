import React from 'react';

const InputField = ({ label, id, type, name, value, onChange, placeholder, error }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 font-semibold mb-1">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="block w-full h-12 px-4 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder={placeholder}
            />
            {error && <p className="font-mono text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default InputField;