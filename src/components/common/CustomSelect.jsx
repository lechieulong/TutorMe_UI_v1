import React, { useState } from "react";

const CustomSelect = ({ options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  return (
    <div className="relative text-gray-600">
      <button
        type="button"
        onClick={toggleDropdown}
        className="relative py-3 px-4 flex justify-between items-center gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"
      >
        {selectedOptions.length > 0
          ? selectedOptions
              .map(
                (option) => options.find((opt) => opt.value === option)?.label
              )
              .join(", ")
          : placeholder}
        <svg
          className={`shrink-0 size-3.5 ${
            isOpen ? "rotate-180" : ""
          } text-gray-500 dark:text-neutral-500`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m7 15 5 5 5-5" />
          <path d="m7 9 5-5 5 5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 z-50 w-full max-h-40 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto dark:bg-neutral-900 dark:border-neutral-700">
          {options.length === 0 ? (
            <div className="py-2 px-4 text-gray-500 dark:text-neutral-400 text-sm">
              No options available
            </div>
          ) : (
            options.map((option) => (
              <div
                key={option.value}
                className={`py-2 px-2 w-full text-[12px] cursor-pointer hover:bg-gray-100 rounded-lg ${
                  selectedOptions.includes(option.value)
                    ? "bg-gray-100 text-blue-600 dark:bg-neutral-800 dark:text-blue-500"
                    : "text-gray-800 dark:text-neutral-200"
                }`}
                onClick={() => handleOptionClick(option.value)}
              >
                <div className="flex justify-between items-center w-full">
                  <span>{option.label}</span>
                  {selectedOptions.includes(option.value) && (
                    <svg
                      className="shrink-0 size-1.5 text-blue-600 dark:text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
