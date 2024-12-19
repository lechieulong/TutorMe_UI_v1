import PropTypes from "prop-types";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Hook dùng để điều hướng trong React Router v6

const SubjectListCard = ({ averageRating, ratingCount, image, userName }) => {
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
      className="cursor-pointer bg-white border border-gray-200 rounded-lg w-full sm:max-w-[140px] md:max-w-[180px] lg:max-w-[260px] shadow-md overflow-hidden p-4 transition-shadow duration-300 ease-in-out hover:shadow-2xl"
    >
      <div className="flex flex-col items-center">
        <img src={image} alt={userName} />
        <div className="flex items-center space-x-2 mt-2">
          {/* Average Rating and Stars */}
          <div className="flex items-center">
            <span className="ml-2">{averageRating?.toFixed(1) || 0}</span>
            {renderStars(averageRating || 0)}
          </div>
          {/* Rating Count */}
          <div className="flex items-center">
            <span className="ml-2 text-gray-500">({ratingCount || 0})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectListCard;
