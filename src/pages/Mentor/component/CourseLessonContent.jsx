/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import AudioPlayer from "../../TestExam/AudioPlayer";
import apiURLConfig from "../../../redux/common/apiURLConfig";

const CourseLessonContent = ({ courseLessontId }) => {
  const [courseLessonContents, setCourseLessonContents] = useState([]);

  useEffect(() => {
    const fetchCourseLessonContents = async () => {
      try {
        const response = await axios.get(
          `${apiURLConfig.baseURL}/CourseLessonContent/lesson/${courseLessontId}`
        );
        const sortedContents = response.data.sort((a, b) => a.order - b.order);
        setCourseLessonContents(sortedContents);
      } catch (err) {
        console.log();
      }
    };

    if (courseLessontId) {
      fetchCourseLessonContents();
    }
  }, [courseLessontId]);

  // Group contents by order
  const groupedContents = courseLessonContents.reduce((acc, content) => {
    const { order } = content;
    if (!acc[order]) {
      acc[order] = [];
    }
    acc[order].push(content);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <hr className="border-0 border-t-2 border-gray-500 mb-4" />
      <div className="flex flex-col gap-1">
        {Object.keys(groupedContents).map((order) => (
          <div
            key={order}
            className={`border rounded-lg p-4 flex flex-wrap lg:flex-nowrap gap-6 ${
              groupedContents[order].length === 1
                ? "justify-center items-center"
                : ""
            }`}
          >
            {/* Left Section */}
            <div
              className={`w-full lg:w-1/2 flex flex-col gap-4 ${
                groupedContents[order].length === 1 ? "text-center" : ""
              }`}
            >
              {groupedContents[order]
                .filter(
                  (content) =>
                    content.contentType === "text" ||
                    content.contentType === "audio"
                )
                .map((content) => {
                  switch (content.contentType) {
                    case "audio":
                      return (
                        <AudioPlayer
                          src={content.contentUrl}
                          key={content.id}
                        />
                      );
                    case "text":
                    default:
                      return (
                        <div
                          key={content.id}
                          dangerouslySetInnerHTML={{
                            __html: content.contentText,
                          }}
                        />
                      );
                  }
                })}
            </div>

            {/* Right Section */}
            <div
              className={`w-full lg:w-1/2 flex flex-col items-center gap-4 ${
                groupedContents[order].length === 1 ? "text-center" : ""
              }`}
            >
              {groupedContents[order]
                .filter(
                  (content) =>
                    content.contentType === "video" ||
                    content.contentType === "image" ||
                    content.contentType === "file"
                )
                .map((content) => {
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
                    case "file":
                      return (
                        <a
                          key={content.id}
                          href={content.contentUrl}
                          download
                          className="text-blue-600 hover:underline"
                        >
                          Tải file
                        </a>
                      );

                    default:
                      return null;
                  }
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseLessonContent;
