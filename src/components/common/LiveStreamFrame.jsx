// src/components/common/LiveStreamFrame.jsx

import PropTypes from "prop-types";

const LiveStreamFrame = ({ width, height, className }) => {
  return (
    <div className={`bg-black ${className}`} style={{ width, height }}>
      <h5 className="text-white">Đây là khung livestream</h5>
    </div>
  );
};

// Định nghĩa PropTypes để kiểm tra kiểu dữ liệu của các props
LiveStreamFrame.propTypes = {
  width: PropTypes.string.isRequired, // Kích thước chiều rộng
  height: PropTypes.string.isRequired, // Kích thước chiều cao
  className: PropTypes.string, // Các lớp CSS bổ sung
};

export default LiveStreamFrame;
