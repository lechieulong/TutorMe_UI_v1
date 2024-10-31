import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const CourseTimeline = ({ courseId }) => {
  const [timelines, setTimelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false); // State to toggle form visibility
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchTimelines = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7030/api/CourseTimeline/Course/${courseId}`
        );
        setTimelines(response.data);
      } catch (error) {
        console.error("Error fetching timelines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimelines();
  }, [courseId]);

  const onSubmit = async (formData) => {
    const newTimeline = {
      courseId: courseId,
      eventDate: new Date(formData.eventDate).toISOString(), // Ensure correct date format
      title: formData.title,
      description: formData.description,
      author: "YourAuthorName",
      isEnabled: true,
    };

    try {
      // Make sure the eventDate is valid before posting
      if (!isNaN(new Date(formData.eventDate).getTime())) {
        await axios.post(
          `https://localhost:7030/api/CourseTimeline`,
          newTimeline
        );
        // Fetch updated timelines after adding new one
        const response = await axios.get(
          `https://localhost:7030/api/CourseTimeline/Course/${courseId}`
        );
        setTimelines(response.data);
        reset(); // Reset the form
        setIsCreating(false); // Hide form after submission
      } else {
        console.error(`Invalid date for timeline: ${formData.title}`);
      }
    } catch (error) {
      console.error("Error creating timeline:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-4/12 bg-gray-50 p-6 rounded-md shadow-md">
      {isCreating ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700">Event Date</label>
            <input
              type="date"
              {...register("eventDate", { required: true })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="border p-2 rounded w-full"
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Create Timeline
          </button>
          <button
            type="button"
            onClick={() => setIsCreating(false)}
            className="py-2 px-4 bg-gray-300 text-black rounded ml-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          {timelines.length === 0 ? (
            <p className="text-red-500">No timeline found for this course.</p>
          ) : (
            timelines.map((timeline, index) => (
              <div key={timeline.id} className="mb-6 flex items-start">
                {index % 2 === 0 ? (
                  <div className="w-full pl-4">
                    <div className="flex items-center gap-2">
                      <div className="pr-4 w-16 text-right text-sm font-semibold text-gray-500">
                        {timeline.eventDateFormatted}
                      </div>
                      <div className="w-full bg-white p-4 rounded-lg shadow-lg relative">
                        <h3 className="font-semibold text-gray-800">
                          {timeline.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                          {timeline.description}
                        </p>
                        <div className="absolute top-2 left-[-20px] w-2 h-2 rounded-full bg-gray-500"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full pr-4 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-white p-4 rounded-lg shadow-lg relative">
                        <h3 className="font-semibold text-gray-800">
                          {timeline.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                          {timeline.description}
                        </p>
                        <div className="absolute top-2 right-[-20px] w-2 h-2 rounded-full bg-gray-500"></div>
                      </div>
                      <div className="pl-4 w-16 text-sm font-semibold text-gray-500">
                        {timeline.eventDateFormatted}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          <button
            onClick={() => setIsCreating(true)}
            className="py-2 px-4 bg-blue-500 text-white rounded mt-4"
          >
            Add Timeline
          </button>
        </>
      )}
    </div>
  );
};

export default CourseTimeline;
