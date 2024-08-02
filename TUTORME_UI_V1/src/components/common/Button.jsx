import PropTypes from 'prop-types';

const Button = ({ label, onClick, customClass = '', size = 'medium', icon: Icon }) => {
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
      onClick={onClick}  // Xử lý sự kiện khi nút được nhấp.
      className={`${baseStyle} ${sizeStyles[size]} ${customClass}`}  // Kết hợp các lớp CSS cơ bản, kích thước và lớp tùy chỉnh.
    >
      {Icon && <Icon className="mr-2" />}  {/* Nếu có biểu tượng, hiển thị biểu tượng với khoảng cách bên phải (mr-2). */}
      {label}  {/* Văn bản của nút */}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,  // label phải là một chuỗi và là bắt buộc.
  onClick: PropTypes.func.isRequired,  // onClick phải là một hàm và là bắt buộc.
  customClass: PropTypes.string,  // customClass là một chuỗi tùy chọn cho lớp CSS tùy chỉnh.
  size: PropTypes.oneOf(['small', 'medium', 'large']),  // size phải là một trong các kích thước đã định nghĩa.
  icon: PropTypes.elementType,  // icon có thể là một component React.
};

Button.defaultProps = {
  customClass: '',  // Giá trị mặc định của customClass là chuỗi rỗng.
  size: 'medium',  // Giá trị mặc định của size là 'medium'.
  icon: null,  // Giá trị mặc định của icon là null.
};

export default Button;
