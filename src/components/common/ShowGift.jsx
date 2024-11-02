// src/components/common/GiftNotification.jsx
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const GiftNotification = ({ notifications }) => {
    return (
        <>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                position: "absolute",
                top: "41px",
                left: "10px",
                padding: "5px 10px", // Giảm padding để nhỏ hơn
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Thay đổi độ trong suốt
                color: "white",
                borderRadius: "5px",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                fontSize: "14px", // Có thể giảm kích thước chữ nếu cần
              }}
            >
              <span>{notification.UserName} Send a Gift!</span>
              <DotLottieReact src={notification.GiftURL} loop autoplay style={{ width: "50px", height: "50px", marginLeft: "10px" }} /> {/* Thay đổi kích thước của biểu tượng nếu cần */}
            </div>
          ))}
        </>
        );
};

export default GiftNotification;
