import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const IdolListCard = ({ id,image, profileImage, title, description }) => {
  return (
    <a type="button" href={`/live-stream/?roomID=${id}`} className="bg-white border border-gray-200 rounded-lg w-full max-w-sm shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex items-center">
        <img
          src={profileImage}
          alt="Profile"
          className="w-12 h-12 object-cover rounded-full mr-4"
        />
        <div>
          <h3 className="text-black text-xl font-semibold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
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
