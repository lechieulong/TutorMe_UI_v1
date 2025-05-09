import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassesWithCourseId } from "../../redux/classes/ClassSlice";
import { STATUS } from "../../constant/SliceName";

const ClassListOfCourse = (courseId) => {
  const dispatch = useDispatch();
  const { classes, status, error } = useSelector((state) => ({
    classes: state.classes.classes[courseId] || [], // Lấy danh sách lớp học theo courseId
    status: state.classes.status,
    switchStates: state.classes.switchStates,
  }));

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      dispatch(fetchClassesWithCourseId(courseId));
    }
  }, []);

  if (status === STATUS.FAILED) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Classes with Students</h1>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem.id}>
            {classItem.name} - {classItem.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassListOfCourse;
