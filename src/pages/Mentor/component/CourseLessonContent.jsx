import { useState, useEffect } from "react";
import axios from "axios";

const CourseLessonContent = ({ courseLessonContenttId }) => {
  const [courseLessonContents, setCourseLessonContents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseLessonContents = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7030/api/CourseLessonContent/lesson/${courseLessonContenttId}`
        );
        setCourseLessonContents(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch course lesson contents");
        setLoading(false);
      }
    };

    if (courseLessonContenttId) {
      fetchCourseLessonContents();
    }
  }, [courseLessonContenttId]);

  if (loading) {
    return <p>Loading contents...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="p-4 mb-4 relative">
        <div>
          {courseLessonContents.length === 0 ? (
            <p>No content found for this lesson.</p>
          ) : (
            courseLessonContents.map((content) => {
              switch (content.contentType) {
                case "image":
                  return (
                    <img
                      className="w-60 mb-4"
                      src={content.contentUrl}
                      alt="Lesson Content"
                      key={content.id}
                    />
                  );
                case "audio":
                  return (
                    <audio controls className="w-full mb-4" key={content.id}>
                      <source src={content.contentUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  );
                case "video":
                  return (
                    <iframe
                      className="w-full h-60 mb-4"
                      src={content.contentUrl}
                      title="Video Content"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      key={content.id}
                    />
                  );
                case "text":
                default:
                  return (
                    <p className="mb-4" key={content.id}>
                      {content.contentUrl}
                    </p>
                  );
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseLessonContent;
