import PropTypes from "prop-types";

const Button = ({
  label,
  onClick,
  customClass = "",
  size = "medium",
  icon: Icon,
  modalTarget, // Thêm prop cho modal target
}) => {
  const baseStyle = "font-bold rounded focus:outline-none focus:ring-2";
  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${sizeStyles[size]} ${customClass}`}
      data-hs-overlay={modalTarget ? `#${modalTarget}` : null} // Kích hoạt modal khi nút được nhấn
    >
      {Icon && <Icon className="mr-2" />}
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  customClass: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.elementType,
  modalTarget: PropTypes.string, // Thêm prop types cho modal target
};

Button.defaultProps = {
  customClass: "",
  size: "medium",
  icon: null,
  modalTarget: null, // Default không có modal
};

export default Button;