import { useState, useEffect } from "react";
import axios from "axios";
import AudioPlayer from "../../TestExam/AudioPlayer";

const CourseLessonContent = ({ courseLessontId, userRole }) => {
  const [courseLessonContents, setCourseLessonContents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseLessonContents = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7030/api/CourseLessonContent/lesson/${courseLessontId}`
        );
        // Sắp xếp nội dung theo `order` trước khi lưu vào state
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
                    <AudioPlayer src={content.contentUrl} key={content.id} />
                  );
                case "video":
                  return (
                    <iframe
                      key={content.id}
                      className="w-[560px] h-[315px]"
                      src={`https://www.youtube.com/embed/${content.contentUrl}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  );
                case "file":
                  return (
                    <a
                      key={content.id}
                      href={content.contentUrl}
                      download
                      className="text-blue-500 underline"
                    >
                      Download File
                    </a>
                  );
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
      </div>
    </div>
  );
};

export default CourseLessonContent;
