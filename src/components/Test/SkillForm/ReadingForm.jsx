import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoenixFramework } from "@fortawesome/free-brands-svg-icons";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../../../firebaseConfig"; // Import Firebase
console.log("Firebase Storage:", storage);

const ReadingForm = () => {
  const [parts, setParts] = useState([
    {
      title: "Part 1",
      readingText: "",
      image: null,
      imageUrl: "",
      questions: [],
    },
  ]);

  const handleAddPart = () => {
    setParts([
      ...parts,
      {
        title: `Part ${parts.length + 1}`,
        readingText: "",
        image: null,
        imageUrl: "",
        questions: [],
      },
    ]);
  };

  const handleAddQuestionType = (partIndex, questionType) => {
    const updatedParts = [...parts];
    updatedParts[partIndex].questions.push({
      titleTopic: "",
      type: questionType,
      content: [],
    });
    setParts(updatedParts);
  };

  const handleAddQuestion = (partIndex, questionIndex) => {
    const updatedParts = [...parts];
    const question = updatedParts[partIndex].questions[questionIndex];
    switch (question.type) {
      case "Matching":
        question.content.push({ heading: "", question: "" });
        break;
      case "Filling":
        question.content.push({ question: "", answer: "" });
        break;
      case "True-False":
        question.content.push({ question: "", answer: "true" });
        break;
      case "Radio":
        question.content.push({ question: "", options: [] });
        break;
      default:
        break;
    }
    setParts(updatedParts);
  };

  const handleContentChange = (
    partIndex,
    questionIndex,
    contentIndex,
    field,
    value
  ) => {
    const updatedParts = [...parts];
    updatedParts[partIndex].questions[questionIndex].content[contentIndex][
      field
    ] = value;
    setParts(updatedParts);
  };

  const handleQuestionChange = (partIndex, questionIndex, field, value) => {
    const updatedParts = [...parts];
    updatedParts[partIndex].questions[questionIndex][field] = value;
    setParts(updatedParts);
  };

  const handleReadingTextChange = (partIndex, value) => {
    const updatedParts = [...parts];
    updatedParts[partIndex].readingText = value;
    setParts(updatedParts);
  };

  const handleImageChange = (partIndex, file) => {
    const updatedParts = [...parts];
    const imageRef = ref(storage, `uploads/${file.name}`);

    uploadBytes(imageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updatedParts[partIndex].image = file;
          updatedParts[partIndex].imageUrl = url;
          setParts(updatedParts);
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <section className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Reading</h2>
      {parts.map((part, partIndex) => (
        <div
          key={partIndex}
          className="flex mb-6 p-4 border border-gray-300 rounded-lg"
        >
          {/* Left side: Reading Text and Image */}
          <div
            style={{ height: "calc(100% - 200px)" }}
            className="w-1/2  pr-4 border-r border-gray-300 overflow-auto"
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(partIndex, e.target.files[0])}
              className="w-full mb-4 text-gray-500"
            />
            {part.image && (
              <div className="mb-4">
                <img
                  src={part.imageUrl}
                  alt="Uploaded"
                  className="w-full h-auto"
                />
                <p className="text-gray-700">
                  Selected Image: {part.image.name}
                </p>
              </div>
            )}
            <h3 className="text-xl font-semibold mb-4">{part.title}</h3>
            <textarea
              className="w-full h-72 p-4 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter Reading Text"
              value={part.readingText}
              onChange={(e) =>
                handleReadingTextChange(partIndex, e.target.value)
              }
            />
          </div>

          {/* Right side: Questions */}
          <div
            className="w-1/2 pl-4 overflow-auto flex-grow"
            style={{ maxHeight: "500px", overflowY: "auto" }} // Update here
          >
            {part.questions.map((question, questionIndex) => (
              <div
                key={questionIndex}
                className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <h5 className="text-2xl font-semibold mb-2">
                  <span className="">
                    <FontAwesomeIcon icon={faPhoenixFramework} />
                  </span>
                  <span className="mr-4">{question.type}</span>
                </h5>
                <label className="block mb-2">
                  <span className="font-semibold text-lg text-gray-700">
                    Title Topic
                  </span>
                  <input
                    type="text"
                    value={question.titleTopic}
                    onChange={(e) =>
                      handleQuestionChange(
                        partIndex,
                        questionIndex,
                        "titleTopic",
                        e.target.value
                      )
                    }
                    placeholder="Title Topic"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                  />
                </label>
                <div>
                  {question.content.map((content, contentIndex) => (
                    <div key={contentIndex} className="">
                      {question.type === "Matching" && (
                        <div>
                          <p className="text-lg font-semibold">
                            Question {contentIndex + 1}
                          </p>
                          <div className="flex justify-between gap-4">
                            <label className="block mb-2">
                              <span className=" text-gray-700">
                                Heading title
                              </span>
                              <input
                                type="text"
                                value={content.heading}
                                onChange={(e) =>
                                  handleContentChange(
                                    partIndex,
                                    questionIndex,
                                    contentIndex,
                                    "heading",
                                    e.target.value
                                  )
                                }
                                placeholder="Heading Title"
                                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                              />
                            </label>
                            <label className="block mb-2">
                              <span className="font-semibold text-gray-700">
                                Matched heading
                              </span>
                              <input
                                type="text"
                                value={content.question}
                                onChange={(e) =>
                                  handleContentChange(
                                    partIndex,
                                    questionIndex,
                                    contentIndex,
                                    "question",
                                    e.target.value
                                  )
                                }
                                placeholder="Matched Heading"
                                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                              />
                            </label>
                          </div>
                        </div>
                      )}

                      {question.type === "Filling" && (
                        <div>
                          <label className="block mb-2">
                            <span className="font-semibold text-gray-700">
                              Question
                            </span>
                            <input
                              type="text"
                              value={content.question}
                              onChange={(e) =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "question",
                                  e.target.value
                                )
                              }
                              placeholder="Question"
                              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            />
                          </label>
                          <label className="block mb-2">
                            <span className="font-semibold text-gray-700">
                              Answer
                            </span>
                            <input
                              type="text"
                              value={content.answer}
                              onChange={(e) =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "answer",
                                  e.target.value
                                )
                              }
                              placeholder="Answer"
                              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            />
                          </label>
                        </div>
                      )}

                      {question.type === "True-False" && (
                        <div>
                          <label className="block mb-2">
                            <span className="font-semibold text-gray-700">
                              Question
                            </span>
                            <input
                              type="text"
                              value={content.question}
                              onChange={(e) =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "question",
                                  e.target.value
                                )
                              }
                              placeholder="Question"
                              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            />
                          </label>
                          <label className="block mb-2">
                            <span className="font-semibold text-gray-700">
                              Answer
                            </span>
                            <select
                              value={content.answer}
                              onChange={(e) =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "answer",
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            >
                              <option value="true">True</option>
                              <option value="false">False</option>
                            </select>
                          </label>
                        </div>
                      )}

                      {question.type === "Radio" && (
                        <div>
                          <label className="block mb-2">
                            <span className="font-semibold text-gray-700">
                              Question
                            </span>
                            <input
                              type="text"
                              value={content.question}
                              onChange={(e) =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "question",
                                  e.target.value
                                )
                              }
                              placeholder="Question"
                              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            />
                          </label>
                          <label className="block mb-2">
                            <span className="font-semibold text-gray-700">
                              Options
                            </span>
                            <input
                              type="text"
                              value={content.options.join(", ")}
                              onChange={(e) =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "options",
                                  e.target.value.split(", ")
                                )
                              }
                              placeholder="Options (comma separated)"
                              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddQuestion(partIndex, questionIndex)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Add Question
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddQuestionType(partIndex, "Matching")}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
            >
              Add Matching Question
            </button>
            <button
              onClick={() => handleAddQuestionType(partIndex, "Filling")}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
            >
              Add Filling Question
            </button>
            <button
              onClick={() => handleAddQuestionType(partIndex, "True-False")}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
            >
              Add True-False Question
            </button>
            <button
              onClick={() => handleAddQuestionType(partIndex, "Radio")}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Add Radio Question
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={handleAddPart}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Add Part
      </button>
    </section>
  );
};

export default ReadingForm;
