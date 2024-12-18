import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainLayout from "../../layout/MainLayout";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { BeTeacher } from "../../redux/users/UserSlice";
import { GetSpecialization } from "../../redux/specialization/SpecializationSlice";
import { uploadFile } from "../../redux/testExam/TestSlice";
import { GetUserEducation } from "../../redux/users/UserSlice";
import { GetTeacherRequestByUserId } from "../../redux/users/UserSlice";
import { UpdateRole } from "../../redux/users/UserSlice";
import { GetRandomAdminTest } from "../../redux/users/UserSlice";
import TestLayout from "../TestExam/TestLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EducationSection = () => {
  const [takeTest, setTakeTest] = useState(false);
  const [testId, setTestId] = useState(null);
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openReasonPopup = () => {
    setIsReasonModalOpen(true);
  };

  // Extracting specializations and user data from Redux state
  const { specializations, getspecializationstatus } = useSelector(
    (state) => state.specialization
  );
  const {
    userInfor,
    beTeacherStatus,
    beTeacherError,
    userEducation,
    getUserEducationStatus,
    teacherRequest,
    roleToUpdate,
    roleUpdateStatus,
    roleUpdateError,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(GetSpecialization());
    dispatch(GetUserEducation());
    dispatch(GetTeacherRequestByUserId());
  }, [dispatch]);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/"); // Redirect to Landing Page if no token
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    aboutMe: "",
    career: "",
    degreeURL: "",
    yearsOfExperience: "",
    grade: "",
    specialization: {},
    acceptedTerms: false,
  });

  const [formErrors, setFormErrors] = useState({});

  // Pre-fill formData if userEducation data is available
  useEffect(() => {
    if (userEducation) {
      setFormData((prevData) => ({
        ...prevData,
        aboutMe: userEducation.aboutMe || "",
        career: userEducation.career || "",
        degreeURL: userEducation.degreeURL || "",
        yearsOfExperience: userEducation.yearExperience || "",
        grade: userEducation.grade || "",
        specialization: userEducation.specializationIds?.reduce((acc, id) => {
          acc[id] = true;
          return acc;
        }, {}),
      }));
    }
  }, [userEducation]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const resultAction = await dispatch(uploadFile(file));
        if (uploadFile.fulfilled.match(resultAction)) {
          const fileUrl = resultAction.payload.fileUrl;
          console.log("fileUrl: ", fileUrl);
          setFormData((prevData) => ({ ...prevData, degreeURL: fileUrl }));
        } else {
          console.error("Upload failed:", resultAction.error.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (
      type === "checkbox" &&
      specializations.find((spec) => spec.id === name)
    ) {
      setFormData((prevData) => ({
        ...prevData,
        specialization: {
          ...prevData.specialization,
          [name]: checked,
        },
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.aboutMe) errors.aboutMe = "Bio is required";
    if (!formData.career) errors.career = "Career is required";
    if (!formData.degreeURL) errors.degreeURL = "IELTS Certificate is required";
    if (!formData.yearsOfExperience || formData.yearsOfExperience <= 0) {
      errors.yearsOfExperience =
        "Years of Experience must be a positive number";
    }
    if (!formData.grade || formData.grade <= 0) {
      errors.grade = "IELTS Grade must be a positive number";
    }
    if (formData.grade > 9) {
      errors.grade = "IELTS Grade must be less than 9";
    }
    if (!formData.acceptedTerms)
      errors.acceptedTerms = "You must accept the terms and policies";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      const userData = {
        teacherId: userEducation?.teacherId || "",
        aboutMe: formData.aboutMe,
        grade: Number(formData.grade),
        degreeURL: formData.degreeURL,
        career: formData.career,
        yearExperience: Number(formData.yearsOfExperience),
        isApprove: false,
        isReject: false,
        specializationIds: Object.keys(formData.specialization).filter(
          (key) => formData.specialization[key]
        ),
      };
      try {
        const resultAction = await dispatch(BeTeacher(userData));
        if (BeTeacher.fulfilled.match(resultAction)) {
          window.location.reload();
        } else {
          setFormErrors({ server: "Failed to submit. Please try again." });
        }
      } catch (error) {
        console.error("Error during dispatch:", error);
        setFormErrors({ server: "An unexpected error occurred." });
      }
    } else {
      setFormErrors(errors);
    }
  };

  const updateRole = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(UpdateRole());
      if (UpdateRole.fulfilled.match(response)) {
        const newToken = response.payload;
        // Set the new token in cookies with an expiration of 7 days
        Cookies.set("authToken", newToken, { expires: 7 });
        navigate(`/user/${userInfor.userName}`);
      }
    } catch (error) {
      console.error("Role update failed:", error);
    }
  };

  const handleTestSkills = async () => {
    try {
      const resultAction = await dispatch(GetRandomAdminTest());
      if (GetRandomAdminTest.fulfilled.match(resultAction)) {
        const testExam = resultAction.payload; // Lấy dữ liệu từ payload

        if (testExam?.id) {
          setTestId(testExam?.id);
          setTakeTest(true);
        } else {
          toast.error("No test exam available now!");
        }
      } else {
        toast.error("Failed to fetch test. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching test:", error);
      toast.error(
        "An error occurred while fetching the test. Please try again."
      );
    }
  };

  return (
    <>
      {takeTest ? (
        <TestLayout fullTestId={testId} />
      ) : (
        <MainLayout>
          <div className="flex w-full">
            <Sidebar />
            <div className="flex-1">
              <div className="flex gap-8 bg-gray-100 py-10 px-12">
                <div className="hidden md:flex md:w-1/3 flex-col items-start">
                  {!userEducation ? (
                    // Display the information and terms section if userEducation does not exist
                    <>
                      <div className="mb-3 text-base text-red-600 shadow-sm italic">
                        <p>Make sure all information you provide is true.</p>
                      </div>
                      <label className="text-sm">
                        <input
                          type="checkbox"
                          name="acceptedTerms"
                          required
                          checked={formData.acceptedTerms}
                          onChange={handleChange}
                        />
                        Accept our{" "}
                        <Link to="/terms" target="_blank">
                          terms and policies
                        </Link>
                      </label>
                      {formErrors.acceptedTerms && (
                        <p className="font-mono text-red-500 text-xs mt-1">
                          {formErrors.acceptedTerms}
                        </p>
                      )}
                    </>
                  ) : (
                    // Display the test message and degree image if userEducation and degreeURL exist
                    userEducation.degreeURL && (
                      <>
                        <div className="mb-3 text-base text-green-400 italic">
                          <p>- You can test your skills or not.</p>
                          <p>
                            - But, doing the test will help us approve your
                            request faster...
                          </p>
                        </div>
                        <div className="mt-3">
                          <img
                            src={userEducation.degreeURL}
                            alt="Degree Image"
                            className="shadow-lg rounded-md"
                          />
                        </div>
                      </>
                    )
                  )}
                </div>
                <div className="flex-1 border-2 border-gray-500 rounded-lg p-6">
                  <ul className="flex space-x-4 border-b border-gray-300">
                    <li>
                      <p className="py-3 px-6 text-blue-800 border-b-2 border-blue-800 font-bold text-lg">
                        MORE INFORMATION ABOUT YOU
                      </p>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <form noValidate onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-gray-700">Bio</label>
                              <textarea
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                name="aboutMe"
                                value={formData.aboutMe}
                                onChange={handleChange}
                                placeholder="Enter your Bio"
                              />
                              {formErrors.aboutMe && (
                                <p className="font-mono text-red-500 text-xs mt-1">
                                  {formErrors.aboutMe}
                                </p>
                              )}
                            </div>

                            {/* Current career and IELTS Certificate */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-gray-700">
                                  Current career
                                </label>
                                <input
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  type="text"
                                  name="career"
                                  value={formData.career}
                                  onChange={handleChange}
                                  placeholder="Your current career..."
                                />
                                {formErrors.career && (
                                  <p className="font-mono text-red-500 text-xs mt-1">
                                    {formErrors.career}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-gray-700">
                                  IELTS Certificate
                                </label>
                                <input
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  type="file"
                                  name="degreeURL"
                                  onChange={(e) => handleFileChange(e)} // Updated to handle file change separately
                                />
                                {formErrors.degreeURL && (
                                  <p className="font-mono text-red-500 text-xs mt-1">
                                    {formErrors.degreeURL}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Number of Years Experience and IELTS grade on one row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-gray-700">
                                  Number of Years Experience
                                </label>
                                <input
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  type="number"
                                  name="yearsOfExperience"
                                  value={formData.yearsOfExperience}
                                  onChange={handleChange}
                                  placeholder="Number of years experience..."
                                />
                                {formErrors.yearsOfExperience && (
                                  <p className="font-mono text-red-500 text-xs mt-1">
                                    {formErrors.yearsOfExperience}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-gray-700">
                                  IELTS Grade
                                </label>
                                <input
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  type="number"
                                  name="grade"
                                  value={formData.grade}
                                  onChange={handleChange}
                                  placeholder="Your IELTS grade..."
                                />
                                {formErrors.grade && (
                                  <p className="font-mono text-red-500 text-xs mt-1">
                                    {formErrors.grade}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Specialization checkboxes from Redux state */}
                            <div>
                              <label className="block text-gray-700">
                                Specialization
                              </label>
                              <div className="flex space-x-4">
                                {getspecializationstatus === "pending" ? (
                                  <p>Loading specializations...</p>
                                ) : (
                                  specializations?.map((specialization) => (
                                    <label
                                      className="flex items-center"
                                      key={specialization.id}
                                    >
                                      <input
                                        type="checkbox"
                                        name={specialization.id}
                                        checked={
                                          formData.specialization[
                                          specialization.id
                                          ] || false
                                        }
                                        onChange={handleChange}
                                      />
                                      <span className="ml-2">
                                        {specialization.name}
                                      </span>
                                    </label>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          {!teacherRequest && (
                            <button
                              type="submit"
                              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
                            >
                              Next
                            </button>
                          )}
                          {teacherRequest?.status === 0 && (
                            <>
                              <p className="font-mono px-4 py-2 text-xs text-green-500 text-center mt-2">
                                User education and teacher request created
                                successfully...
                              </p>
                              {getUserEducationStatus === "success" ? (
                                <button
                                  onClick={handleTestSkills} // Gọi hàm xử lý khi nhấn nút
                                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
                                >
                                  Take Test
                                </button>
                              ) : (
                                <button
                                  type="submit"
                                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
                                >
                                  Next
                                </button>
                              )}
                            </>
                          )}

                          {teacherRequest?.status === 1 && (
                            <>
                              <p className="font-mono px-4 py-2 text-xs text-yellow-400 text-center mt-2">
                                Your request has been approved. Click reset window to update.
                              </p>
                              {roleUpdateStatus === "pending" && (
                                <Link
                                  to="#"
                                  onClick={(e) => e.preventDefault()}
                                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-red-400"
                                >
                                  Updating...
                                </Link>
                              )}
                              {roleUpdateStatus === "failed" && (
                                <button
                                  onClick={updateRole}
                                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                                >
                                  Retry
                                </button>
                              )}
                              {!roleUpdateStatus && (
                                <button
                                  onClick={updateRole}
                                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                                >
                                  Reset window
                                </button>
                              )}
                            </>
                          )}

                          {teacherRequest?.status === 2 && (
                            <>
                              <p className="font-mono px-4 text-xs text-red-500 text-center mt-2">
                                Your request has been rejected.
                                <button
                                  onClick={openReasonPopup}
                                  className="text-blue-500 underline bg-gray-100"
                                >
                                  View reason
                                </button>
                              </p>
                              <Link
                                to="/updateteacherrequest"
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                              >
                                Update request
                              </Link>
                            </>
                          )}

                          {/* Handling pending status */}
                          {beTeacherStatus === "pending" && (
                            <p className="font-mono px-4 py-2 text-xs text-yellow-500 text-center mt-2">
                              Checking...
                            </p>
                          )}

                          {/* Handling failed status */}
                          {beTeacherStatus === "failed" && (
                            <p className="font-mono px-4 py-2 text-xs text-red-500 text-center mt-2">
                              {beTeacherError}
                            </p>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Reason modal */}
          {isReasonModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
                <h2 className="text-xl font-bold mb-4">Reason</h2>
                <p className="text-gray-700 mb-6">
                  {teacherRequest?.description}
                </p>
                <button
                  onClick={() => setIsReasonModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <ToastContainer autoClose={3000} newestOnTop closeOnClick />
        </MainLayout>
      )}
    </>
  );
};

export default EducationSection;
