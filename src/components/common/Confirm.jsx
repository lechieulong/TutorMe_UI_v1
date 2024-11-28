import React, { useState, useEffect } from "react";

const Confirm = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure?",
  status = "Confirmation",
  shoud = "yes",
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimate(true), 50);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div
        className={`flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 transition-all duration-500 ease-in-out ${
          animate ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          className={`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all duration-500 ease-in-out sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 ${
            animate ? "translate-y-0" : "translate-y-10"
          }`}
        >
          <div className="sm:flex sm:items-start">
            <div
              className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                shoud === "yes" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {shoud === "yes" ? (
                <svg
                  className="h-6 w-6 text-green-600"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-red-600"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              )}
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {status}
              </h3>
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-500">{message}</p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                onClick={handleConfirm}
                className={`inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm transition ease-in-out duration-150 sm:text-sm sm:leading-5 ${
                  shoud === "yes"
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-red-600 hover:bg-red-500"
                }`}
              >
                Accept
              </button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
