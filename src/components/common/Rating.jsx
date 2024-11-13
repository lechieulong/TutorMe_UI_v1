import React, { useState, useDispatch } from "react";
import { SubmitRating } from "../../redux/common/RatingSlice";

const Rating = ({ userId, courseId, onVote }) => {
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  // Hàm xử lý khi người dùng chọn đánh giá
  const handleRating = (value) => {
    setRating(value);

    // Gọi action SubmitRating với dữ liệu đánh giá
    dispatch(SubmitRating({ userId, courseId, ratingValue: value }))
      .unwrap()
      .then((response) => {
        console.log("Rating submitted successfully:", response);
      })
      .catch((error) => {
        console.error("Failed to submit rating:", error);
      });
  };

  return (
    <div className="flex flex-row-reverse justify-end items-center">
      {[1, 2, 3, 4, 5].map((value) => (
        <React.Fragment key={value}>
          <input
            id={`hs-ratings-readonly-${value}`}
            type="radio"
            className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
            name="hs-ratings-readonly"
            value={value}
            onClick={() => handleRating(value)}
          />
          <label
            htmlFor={`hs-ratings-readonly-${value}`}
            className={`peer-checked:text-yellow-400 text-gray-300 pointer-events-none ${
              rating >= value ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            <svg
              className="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Rating;
