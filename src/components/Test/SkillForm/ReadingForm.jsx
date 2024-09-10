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
import { faBook, faNairaSign, faPlus } from "@fortawesome/free-solid-svg-icons";

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
  const [image, setImage] = useState(null); // State for the image

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
        question.content.push({ question: "", options: [""] }); // Initialize with one empty option
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
    value,
    optionIndex
  ) => {
    const updatedParts = [...parts];
    const content =
      updatedParts[partIndex].questions[questionIndex].content[contentIndex];
    if (field === "options") {
      content[field][optionIndex] = value;
    } else {
      content[field] = value;
    }
    setParts(updatedParts);
  };

  const handleReadingTextChange = (partIndex, value) => {
    const updatedParts = [...parts];
    updatedParts[partIndex].readingText = value;
    setParts(updatedParts);
  };

  const handleImageChange = (event, partIndex) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedParts = [...parts];
    const imageRef = ref(storage, `uploads/${file.name}`);

    uploadBytes(imageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            updatedParts[partIndex].image = imageUrl;
          updatedParts[partIndex].imageUrl = url;
            setParts(updatedParts);
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
      setImage(imageUrl); // Update the image state
    }
  };

  return (
    <section className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        <span className="mr-2 ">
          <FontAwesomeIcon icon={faBook} />
        </span>
        Reading
      </h2>
      {parts.map((part, partIndex) => (
        <div
          key={partIndex}
          className="flex mb-6 p-4 border border-gray-300 rounded-lg"
        >
          {/* Left side: Reading Text and Image */}
          <div
            style={{ height: "calc(100% - 200px)" }}
            className="w-1/2   border-r border-gray-300 overflow-auto"
          >
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, partIndex)}
                className="border border-gray-300 p-2 rounded-lg mb-4"
              />
              <button className="bg-green-600 text-white ml-2">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faNairaSign} />
                </span>
                Generate image from AI
              </button>
            </div>

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
            <div className="flex flex-col gap-2">
              <p className="text-lg">Name of Reading</p>
              <input
                type="text"
                placeholder="Name of reading"
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none "
              />
              <p className="text-lg">Content of Reading</p>
              <textarea
                className="w-full h-72 p-4 border border-gray-300 rounded-lg mb-4"
                placeholder="Enter Reading Text"
                value={part.readingText}
                onChange={(e) =>
                  handleReadingTextChange(partIndex, e.target.value)
                }
              />
            </div>
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
                              Options
                            </span>
                            {content.options.map((option, optionIndex) => (
                              <div key={optionIndex} className=" mb-2">
                                <input
                                  type="text"
                                  value={option.join(", ")}
                                  onChange={(e) =>
                                    handleContentChange(
                                      partIndex,
                                      questionIndex,
                                      contentIndex,
                                      "options",
                                      e.target.value,
                                      optionIndex
                                    )
                                  }
                                  placeholder={`Option ${optionIndex + 1}`}
                                  className="w-full p-1 border border-gray-300 rounded-lg"
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                handleContentChange(
                                  partIndex,
                                  questionIndex,
                                  contentIndex,
                                  "options",
                                  "",
                                  content.options.length
                                )
                              }
                              className="p-2 bg-green-500 text-white rounded-lg mt-2"
                            >
                              Add Option
                            </button>
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handleAddQuestion(partIndex, questionIndex)}
                  className="p-2 bg-green-500 text-white rounded-lg mt-2"
                >
                  <span className="mr-2 ">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  Add Question
                </button>
              </div>
            ))}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => handleAddQuestionType(partIndex, "Matching")}
                className="p-2 bg-green-500 text-white rounded-lg mt-2"
              >
                <span className="mr-2 ">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Matching Question
              </button>
              <button
                type="button"
                onClick={() => handleAddQuestionType(partIndex, "Filling")}
                className="p-2 bg-green-500 text-white rounded-lg mt-2"
              >
                <span className="mr-2 ">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Filling Question
              </button>
              <button
                type="button"
                onClick={() => handleAddQuestionType(partIndex, "True-False")}
                className="p-2 bg-green-500 text-white rounded-lg mt-2"
              >
                <span className="mr-2 ">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                True-False Question
              </button>
              <button
                type="button"
                onClick={() => handleAddQuestionType(partIndex, "Radio")}
                className="p-2 bg-green-500 text-white rounded-lg mt-2"
              >
                <span className="mr-2 ">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Radio Question
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddPart}
        className="p-2 bg-green-500 text-white rounded-lg mt-4"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Add Part
      </button>
    </section>
  );
};

export default ReadingForm;
