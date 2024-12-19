import PropTypes from "prop-types";
import { FaLock, FaEye } from "react-icons/fa";

const IdolListCard = ({
  id,
  image,
  profileImage,
  title,
  description,
  type,
  usercount,
}) => {
  return (
    <a
      href={`/live-stream/?roomID=${id}`}
      className="w-1/6  border-2 border-blue-500 m-[5px] p-[5px] rounded-xl   shadow-md   overflow-hidden h-full relative bg-gradient-to-r from-green-500 to-green-200 box-border"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover border rounded-[12px] "
      />
      <div className="absolute top-2 right-2 px-0.5 bg-gray-400 opacity-50 border rounded-[8px]  text-black text-sm flex items-center gap-1">
        <FaEye className="text-base" />
        <span>{usercount}</span>
      </div>
      {/* Nếu type === 1 thì hiển thị icon khóa ở giữa */}
      {type === 1 && (
        <div className="absolute inset-0 flex items-center rounded-[12px] justify-center bg-black bg-opacity-50">
          <FaLock className="text-white text-4xl" />
        </div>
      )}
      <div className="p-4 flex items-center w-full">
        <img
          src={profileImage}
          alt="Profile"
          className="w-12 h-12 object-cover rounded-full mr-1 border -ml-4"
        />
        <div className="flex-1 overflow-hidden w-full">
          <h3 className="text-black font-semibold truncate ">{title}</h3>
        </div>
      </div>
      <div className="flex-1 overflow-hidden w-full">
        <p className="text-white text-center  font-semibold truncate">
          {description}
        </p>
      </div>
    </a>
  );
};

// Định nghĩa kiểu dữ liệu của props
IdolListCard.propTypes = {
  image: PropTypes.string.isRequired, // Hình ảnh của sản phẩm
  profileImage: PropTypes.string.isRequired, // Hình ảnh của profile
  title: PropTypes.string.isRequired, // Tiêu đề của sản phẩm
  description: PropTypes.string.isRequired, // Mô tả của sản phẩm
};

export default IdolListCard;
