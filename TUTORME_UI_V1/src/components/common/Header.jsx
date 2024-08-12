import logo from "../../assets/images/logo.png";
import Button from "../common/Button";
import Search from "../common/Search";

const Header = () => {
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Thực hiện tìm kiếm hoặc xử lý kết quả tìm kiếm ở đây
  };
  return (
    <header className="bg-white drop-shadow-lg ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-50 mr-3" />
          <nav className="flex space-x-10 ml-10">
            <a href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </a>
            <a href="/about" className="text-gray-600 hover:text-gray-800">
              Live Hot
            </a>
            <a href="/contact" className="text-gray-600 hover:text-gray-800">
              Hot Class
            </a>
            <a href="/contact" className="text-gray-600 hover:text-gray-800">
              Hot Mentor
            </a>
          </nav>
        </div>
        <nav className="flex space-x-4">
          <Search onSearch={handleSearch} />
          <Button
            label="Đăng ký" //content btn
            onClick={() => alert("Cái gì z?")} //sự kiện khi click
            customClass="bg-green-500 text-white hover:bg-green-600" //CSS
            size="small" //Size btn
          />
          <Button
            label="Đăng nhập" //content btn
            onClick={() => alert("Giỡn mặt à?")} //sự kiện khi click
            customClass="bg-blue-500 text-white hover:bg-green-600" //CSS
            size="small" //Size btn
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
