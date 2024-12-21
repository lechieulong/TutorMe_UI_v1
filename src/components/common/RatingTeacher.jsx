import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import apiURLConfig from "../../redux/common/apiURLConfig";
const RatingTeacher = ({ teacherId, userId, onClose }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [review, setReview] = useState("");
  console.log(teacherId, userId);

  const handleSubmit = async () => {
    try {
      const RatedAt = new Date().toISOString().split("T")[0];
      const response = await axios.post(
        `${apiURLConfig.baseURL}/TeacherRatings`,
        {
          UserId: teacherId,
          LearnerID: userId,
          RatingValue: ratingValue,
          Review: review,
          RatedAt,
        }
      );

      if (response.status === 201) {
        alert("Rating submitted successfully!");
        onClose();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit rating.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Rate This Teacher</h2>
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer ${
                ratingValue >= star ? "text-yellow-400" : "text-gray-300"
              }`}
              size={30}
              onClick={() => setRatingValue(star)}
            />
          ))}
        </div>
        <textarea
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button
            className="py-2 px-4 bg-gray-500 text-white rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingTeacher;
