import PropTypes from "prop-types";

const Button = ({
  label,
  onClick,
  customClass = "",
  size = "medium",
  icon: Icon,
}) => {
  // Các lớp cơ bản cho nút
  const baseStyle = "font-bold rounded focus:outline-none focus:ring-2";

  // Các kích thước khác nhau cho nút
  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${sizeStyles[size]} ${customClass}`}
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
};

Button.defaultProps = {
  customClass: "",
  size: "medium",
  icon: null,
};

export default Button;