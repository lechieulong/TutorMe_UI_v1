import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTests } from "../../redux/testExam/TestSlice";
import { getUser } from "../../service/GetUser";
import MainLayout from "../../layout/MainLayout";
import { Link } from "react-router-dom";

const ListTest = () => {
  const [tests, setTests] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const user = getUser();
      if (user && user.sub) {
        const result = await dispatch(fetchTests(user.sub));
        if (result.payload) {
          console.log("Fetched tests:", result.payload); // Debugging log
          setTests(result.payload); // Store the fetched data in state
        }
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="flex justify-center mt-20">
        {tests.length > 0 ? (
          tests.map((test, index) => (
            <Link
              to={`/testDetail/${test.id}`}
              key={test.Id || index}
              className="p-2 border border-green-400"
            >
              <p>{test.testName || "Untitled Test"}</p>{" "}
            </Link>
          ))
        ) : (
          <p>No tests available.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default ListTest;
