import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassesWithCourseId } from "../../redux/classes/ClassSlice";
import { STATUS } from "../../constant/SliceName";

const ClassesList = (courseId) => {
  const dispatch = useDispatch();
  const { classes, status, error } = useSelector((state) => state.classes);

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

export default ClassesList;
