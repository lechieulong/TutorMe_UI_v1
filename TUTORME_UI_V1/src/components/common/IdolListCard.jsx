import PropTypes from "prop-types";

const IdolListCard = ({ image, title, description, price }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg w-[480px] shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-500">${price}</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Định nghĩa kiểu dữ liệu của props
IdolListCard.propTypes = {
  image: PropTypes.string.isRequired, // Hình ảnh của sản phẩm
  title: PropTypes.string.isRequired, // Tiêu đề của sản phẩm
  description: PropTypes.string.isRequired, // Mô tả của sản phẩm
  price: PropTypes.number.isRequired, // Giá của sản phẩm
};

export default IdolListCard;
