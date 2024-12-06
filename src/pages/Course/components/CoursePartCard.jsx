import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CourseLessonCard from "../../Mentor/component/CourseLessonCard";
import CreateCourseLesson from "../../Mentor/component/CreateCourseLesson";
import { deleteCoursePart } from "../../../redux/courses/CoursePartSlice";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Confirm from "../../../components/common/Confirm";
import Notification from "../../../components/common/Notification";

const CoursePartCard = ({ mentorAndList, skillId, isEnrolled }) => {
  const dispatch = useDispatch();
  const [courseParts, setCourseParts] = useState([]);
  const [collapsedParts, setCollapsedParts] = useState({});
  const [showLessonForm, setShowLessonForm] = useState({});
  const [error, setError] = useState(null);
  const [componentKeys, setComponentKeys] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [partToDelete, setPartToDelete] = useState(null);
  const [notification, setNotification] = useState("");
  const [should, setShould] = useState("");

  const fetchCourseParts = useCallback(async () => {
    if (!skillId) return;
    try {
      const response = await axios.get(
        `https://localhost:7030/api/CourseParts/ByCourseSkill/${skillId}`
      );
      const sortedCourseParts = response.data.sort((a, b) => a.order - b.order);
      setCourseParts(sortedCourseParts);
      const initialCollapsedState = sortedCourseParts.reduce((acc, part) => {
        acc[part.id] = true;
        return acc;
      }, {});
      setCollapsedParts(initialCollapsedState);

      const initialKeys = sortedCourseParts.reduce((acc, part) => {
        acc[part.id] = Date.now();
        return acc;
      }, {});
      setComponentKeys(initialKeys);

      setError(null);
    } catch (err) {
      setError("No course part found.");
    }
  }, [skillId]);

  useEffect(() => {
    fetchCourseParts();
  }, [skillId, fetchCourseParts]);

  const toggleCollapse = (partId) => {
    setCollapsedParts((prev) => ({
      ...prev,
      [partId]: !prev[partId],
    }));
  };

  const handleCreateLessonClick = (partId) => {
    setShowLessonForm((prev) => ({
      ...prev,
      [partId]: true,
    }));
    setCollapsedParts((prev) => ({
      ...prev,
      [partId]: false,
    }));
  };

  const handleFormClose = (partId) => {
    setShowLessonForm((prev) => ({
      ...prev,
      [partId]: false,
    }));
  };

  const handleLessonCreated = (partId) => {
    setComponentKeys((prev) => ({
      ...prev,
      [partId]: Date.now(),
    }));
    setShowLessonForm((prev) => ({
      ...prev,
      [partId]: false,
    }));
  };

  const handleDeleteConfirm = (partId) => {
    setPartToDelete(partId);
    setConfirmOpen(true);
    setShould("no");
  };

  const handleDelete = async () => {
    if (partToDelete) {
      dispatch(deleteCoursePart(partToDelete))
        .unwrap()
        .then(() => {
          setCourseParts((prev) =>
            prev.filter((part) => part.id !== partToDelete)
          );
          setNotification("Course part deleted successfully.");
          setPartToDelete(null);
          setConfirmOpen(false);
        })
        .catch((error) => {
          console.error("Error deleting course part:", error);
          setNotification("Failed to delete course part.");
          setConfirmOpen(false);
        });
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 mb-4">
      {courseParts.map((coursePart) => (
        <div
          key={coursePart.id}
          className="border rounded-md p-4 mb-4 shadow-md bg-[#EEEDEB]"
        >
          <div className="flex gap-2 justify-end">
            {mentorAndList && (
              <>
                <button
                  type="button"
                  onClick={() => handleDeleteConfirm(coursePart.id)}
                  className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-red-500 text-white shadow-sm hover:bg-red-600 focus:outline-none"
                >
                  Delete Course Part
                </button>
                <button
                  type="button"
                  onClick={() => handleCreateLessonClick(coursePart.id)}
                  className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-green-500 text-white shadow-sm hover:bg-green-600 focus:outline-none"
                >
                  Create Lesson
                </button>
              </>
            )}
          </div>

          <div
            onClick={() => toggleCollapse(coursePart.id)}
            className="cursor-pointer flex items-center gap-2"
          >
            {collapsedParts[coursePart.id] ? (
              <FaAngleDown className="text-gray-500" />
            ) : (
              <FaAngleUp className="text-gray-500" />
            )}
            <h3 className="text-lg font-semibold">{coursePart.title}</h3>
          </div>

          {showLessonForm[coursePart.id] && (
            <CreateCourseLesson
              coursePartId={coursePart.id}
              onClose={() => handleFormClose(coursePart.id)}
              onCreated={() => handleLessonCreated(coursePart.id)}
            />
          )}
          <div
            className={`transition-all duration-500 ease-in-out ${
              collapsedParts[coursePart.id]
                ? "max-h-0 opacity-0"
                : "opacity-100"
            }`}
            style={{
              maxHeight: collapsedParts[coursePart.id] ? 0 : "60vh",
              overflowY: collapsedParts[coursePart.id] ? "hidden" : "auto",
              transitionProperty: "max-height, opacity",
            }}
          >
            <CourseLessonCard
              key={componentKeys[coursePart.id]}
              mentorAndList={mentorAndList}
              coursePartId={coursePart.id}
              isEnrolled={isEnrolled}
            />
          </div>
        </div>
      ))}

      <Confirm
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        status="Delete Course Part"
        shoud={should} // Sử dụng giá trị động từ state
        message="Are you sure you want to delete this course part?"
      />

      <Notification
        message={notification}
        onClose={() => setNotification("")}
      />
    </div>
  );
};

export default CoursePartCard;
