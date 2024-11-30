import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa"; // Import FaStar icon

// Rating component to show a star rating based on ratingValue
const StarRating = ({ rating }) => {
  const stars = [];

  // Render filled and empty stars based on rating
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<FaStar key={i} className="text-yellow-500" />); // Filled star
    } else {
      stars.push(<FaStar key={i} className="text-gray-300" />); // Empty star
    }
  }

  return <div className="flex space-x-1">{stars}</div>; // Use flex to align stars in a row
};

// Main component to display ratings for a course
const Comment = ({ courseId }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch course ratings from the API
    const fetchRatings = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7030/api/CourseRating/${courseId}`
        );
        setRatings(response.data);
      } catch (error) {
        setError("");
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Course Ratings</h3>
      {ratings.length === 0 ? (
        <p>No ratings yet for this course.</p>
      ) : (
        <div className="space-y-4">
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
