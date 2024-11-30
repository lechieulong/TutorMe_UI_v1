import React, { useState, useEffect } from "react";

const Notification = ({ message, onClose, duration = 4000, shoud = "yes" }) => {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 50);

      const timer = setTimeout(() => {
        setAnimate(false);
        setTimeout(() => {
          setVisible(false);
          if (onClose) onClose();
        }, 1000);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`px-4 py-2 rounded-lg shadow-lg transition-all duration-1000 ease-in-out transform ${
          animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        } ${
          shoud === "yes" ? "bg-green-600 text-white" : "bg-red-600 text-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Notification;
