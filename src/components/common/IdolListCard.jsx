import PropTypes from "prop-types";

const IdolListCard = ({ image, profileImage, title, description }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg w-[300px] shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex items-center">
        <img
          src={profileImage}
          alt="Profile"
          className="w-12 h-12 object-cover rounded-full mr-4 mb-8"
        />
        <div>
          <h3 className="text-black text-xl font-semibold">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>
      </div>
    </div>
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
