import { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // State để lưu giá trị của ô tìm kiếm

  // Sự kiện khi nhấn phím Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter (nếu có)
      handleSearch(); // Gọi hàm handleSearch khi nhấn Enter
    }
  };

  // Sự kiện khi nhấn nút search
  const handleSearch = () => {
    if (onSearch) {
      onSearch(query); // Gọi hàm onSearch với giá trị của query
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Cập nhật state khi người dùng nhập dữ liệu
        onKeyDown={handleKeyDown} // Thêm sự kiện khi nhấn phím
        placeholder="Search..."
        className="bg-white text-black flex-1 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

// Định nghĩa kiểu dữ liệu của props
Search.propTypes = {
  onSearch: PropTypes.func, // Hàm xử lý tìm kiếm
};

export default Search;