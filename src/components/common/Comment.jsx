import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import apiURLConfig from "../../redux/common/apiURLConfig";
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <FaStar
        key={i}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
      />
    );
  }
  return <div className="flex space-x-1">{stars}</div>;
};

const Comment = ({ courseId, onLoadingChange }) => {
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRatings = async () => {
      setIsLoading(true);
      onLoadingChange?.(true); // Notify parent that loading has started
      try {
        const response = await axios.get(
          `${apiURLConfig}/CourseRating/${courseId}`
        );
        setRatings(response.data);
      } finally {
        setIsLoading(false);
        onLoadingChange?.(false); // Notify parent that loading has ended
      }
    };

    fetchRatings();
  }, [courseId, onLoadingChange]);

  return (
    <div>
      {ratings.length === 0 ? (
        <p></p>
      ) : (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Course Ratings</h3>
          {ratings.map((rating, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <img
                  src={rating.imageUrl}
                  alt={rating.username}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <span className="font-bold text-lg">{rating.username}</span>{" "}
                  <span className="ml-2 text-sm text-gray-500">
                    {rating.ratedAt}
                  </span>
                  <div className="flex items-center mt-1">
                    <StarRating rating={rating.ratingValue} />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{rating.review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
