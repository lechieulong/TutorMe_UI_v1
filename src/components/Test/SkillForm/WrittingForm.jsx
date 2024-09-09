import React, { useState } from "react";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WritingForm = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        <span className="mr-5">
          <FontAwesomeIcon icon={faPencilAlt} />
        </span>
        Writing
      </h2>
      <div className="flex flex-col gap-6">
        {/* Part 1 with image upload */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Part 1</h3>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 rounded-lg"
          />
          {/* Display the uploaded image for Part 1 */}
          {image && (
            <div className="mt-2">
              <img
                src={image}
                alt="Uploaded Part 1"
                className="max-w-[700px] max-h-96 object-contain rounded-lg"
              />
            </div>
          )}

          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-lg"
            placeholder="enter a content .... "
          />
        </div>

        {/* Part 2 without image upload */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Part 2</h3>
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-lg"
            placeholder="enter a content ..."
          />
        </div>
      </div>
    </section>
  );
};

export default WritingForm;
