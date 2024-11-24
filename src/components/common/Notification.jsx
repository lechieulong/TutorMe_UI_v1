import React, { useState, useEffect } from "react";

const Notification = ({ message, onClose, duration = 4000 }) => {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true); // Hiển thị thông báo
      setTimeout(() => setAnimate(true), 50); // Kích hoạt hiệu ứng xuất hiện

      const timer = setTimeout(() => {
        setAnimate(false); // Kích hoạt hiệu ứng biến mất
        setTimeout(() => {
          setVisible(false); // Tắt thông báo hoàn toàn
          if (onClose) onClose();
        }, 1000); // Thời gian trùng với hiệu ứng biến mất
      }, duration);

      return () => clearTimeout(timer); // Dọn dẹp khi component unmount
    }
  }, [message, duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-16 left-4 z-50">
      <div
        className={`bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-1000 ease-in-out transform ${
          animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Notification;
