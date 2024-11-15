import { useState, useEffect } from "react";
import axios from "axios";
import AudioPlayer from "../../TestExam/AudioPlayer";

const CourseLessonContent = ({ courseLessontId }) => {
  const [courseLessonContents, setCourseLessonContents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseLessonContents = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7030/api/CourseLessonContent/lesson/${courseLessontId}`
        );
        const sortedContents = response.data.sort((a, b) => a.order - b.order);
        setCourseLessonContents(sortedContents);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch course lesson contents");
        setLoading(false);
      }
    };

    if (courseLessontId) {
      fetchCourseLessonContents();
    }
  }, [courseLessontId]);

  if (loading) {
    return <p>Loading contents...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Separate content into left (text, audio) and right (video, image)
  const leftContents = courseLessonContents.filter(
    (content) => content.contentType === "text" || content.contentType === "audio"
  );
  const rightContents = courseLessonContents.filter(
    (content) => content.contentType === "video" || content.contentType === "image"
  );

  return (
    <div className="p-4">
      <hr className="border-0 border-t-2 border-gray-500 mb-4" />
      <div className="flex flex-wrap lg:flex-nowrap gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {leftContents.length === 0 ? (
            <p>No content found on the left side.</p>
          ) : (
            leftContents.map((content) => {
              switch (content.contentType) {
                case "audio":
                  return <AudioPlayer src={content.contentUrl} key={content.id} />;
                case "text":
                default:
                  return (
                    <div
                      key={content.id}
                      dangerouslySetInnerHTML={{ __html: content.contentText }}
                    />
                  );
              }
            })
          )}
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center gap-4">
          {rightContents.length === 0 ? (
            <p>No content found on the right side.</p>
          ) : (
            rightContents.map((content) => {
              switch (content.contentType) {
                case "image":
                  return (
                    <img
                      className="w-full max-w-xs"
                      src={content.contentUrl}
                      alt="Lesson Content"
                      key={content.id}
                    />
                  );
                case "video":
                  return (
                    <iframe
                      key={content.id}
                      className="w-full h-64 lg:w-[500px] lg:h-[300px]"
                      src={`https://www.youtube.com/embed/${content.contentUrl}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  );
                default:
                  return null;
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseLessonContent;
