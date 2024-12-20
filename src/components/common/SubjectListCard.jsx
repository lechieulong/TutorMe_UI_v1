import PropTypes from "prop-types";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Hook dùng để điều hướng trong React Router v6

const SubjectListCard = ({ averageRating, ratingCount, image, userName, fullName }) => {
  const navigate = useNavigate(); // Hook điều hướng

  const handleClick = () => {
    navigate(`/coachingschedule/${userName}`); // Dẫn hướng tới URL mới
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <FaStar key={`full-${index}`} className="text-yellow-500" />
          ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <FaRegStar key={`empty-${index}`} className="text-gray-300" />
          ))}
      </>
    );
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-lg w-full max-w-xs shadow-md overflow-hidden cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-2xl"
    >
      <img src={image || "https://hydra13.blob.core.windows.net/2aa17120-4bef-478a-8ea9-cb0788def29e/default-avatar.jpg"} alt={userName} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-black text-xl font-semibold">{fullName}</h3>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-lg font-medium mr-2">
            {averageRating?.toFixed(1) || 0}
          </span>
          {renderStars(averageRating || 0)}
        </div>
        <p className="text-gray-600 mt-1">({ratingCount || 0})</p>
      </div>
    </div>
  );
};

SubjectListCard.propTypes = {
  averageRating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default SubjectListCard;
