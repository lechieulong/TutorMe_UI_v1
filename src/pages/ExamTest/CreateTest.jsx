import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addSkills } from "../../redux/testExam/TestSlice";
import { useNavigate } from "react-router-dom";
import TestFormDetail from "./TestFormDetail";
import PreviewTest from "./PreviewTest";
import Modal from "react-modal"; // Import react-modal
import { toast } from "react-toastify";

const CreateTest = ({
  testId,
  skills,
  pageType,
  courseId,
  classId,
  setIsCreateTest,
}) => {
  const navigate = useNavigate();
  const { control, resetField, handleSubmit, setValue, getValues } = useForm();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false); // To manage modal state
  const [validationErrors, setValidationErrors] = useState([]); // Store validation errors
  const dispatch = useDispatch();

  const steps = [
    {
      label: "Update Test Info",
      content: (
        <TestFormDetail
          control={control}
          resetField={resetField}
          setSelectedSkills={setSelectedSkills}
          selectedSkills={selectedSkills}
          skillsCourse={skills}
          setValue={setValue}
        />
      ),
    },
  ];
  const validateFormData = (data) => {
    const errors = [];

    console.log("Data", data);

    if (!data || !data.skills) {
      errors.push("The data structure is missing or skills are undefined.");
      return { isValid: false, errors };
    }

    Object.entries(data.skills).forEach(([skillName, skillData]) => {
      // Skip if skillData is undefined
      if (!skillData) return;

      if (!skillData.parts || skillData.parts.length === 0) {
        errors.push(`Skill '${skillName}' must have at least one part.`);
        return;
      }

      skillData.parts.forEach((part, partIndex) => {
        // Skip if part is undefined
        if (!part) return;

        if (!part.sections || part.sections.length === 0) {
          errors.push(
            `Skill '${skillName}', Part ${
              partIndex + 1
            } must have at least one section.`
          );
          return;
        }

        part.sections.forEach((section, sectionIndex) => {
          // Skip if section is undefined
          if (!section) return;

          // Check for specific validations based on skill type and sectionType
          if (
            (skillData.type === 1 && // Listening
              [1, 2, 3, 4, 7].includes(section.sectionType)) ||
            (skillData.type === 0 && // Reading
              [7, 8, 9, 10, 11].includes(section.sectionType))
          ) {
            // Validate sectionContext for specific section types
            if (
              !section.sectionContext ||
              section.sectionContext.trim() === ""
            ) {
              errors.push(
                `Skill '${skillName}', Part ${partIndex + 1}, Section ${
                  sectionIndex + 1
                } requires a sectionContext for sectionType ${
                  section.sectionType
                }.`
              );
            }

            // Validate questions for required answers
            if (
              section.questions.length === 0 ||
              section.questions.some((q) => !q.answer || q.answer.trim() === "")
            ) {
              errors.push(
                `Skill '${skillName}', Part ${partIndex + 1}, Section ${
                  sectionIndex + 1
                } must have questions with answers.`
              );
            }
          } else {
            // For other section types, validate at least one question
            if (!section.questions || section.questions.length === 0) {
              errors.push(
                `Skill '${skillName}', Part ${partIndex + 1}, Section ${
                  sectionIndex + 1
                } must have at least one question.`
              );
            }
          }
        });
      });
    });

    return { isValid: errors.length === 0, errors };
  };

  const handleNext = () => {
    if (selectedSkills.length === 0) {
      alert("Please select at least one skill.");
      return;
    }

    handleSubmit((data) => {
      setFormData(data);

      const { isValid, errors } = validateFormData(data);
      if (!isValid) {
        setValidationErrors(errors); // Set validation errors for modal
        setModalIsOpen(true); // Open modal
        return;
      }

      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    })();
  };

  const handleFinish = handleSubmit((data) => {
    setFormData(data);

    const { isValid, errors } = validateFormData(data);
    if (!isValid) {
      setValidationErrors(errors); // Set validation errors for modal
      setModalIsOpen(true); // Open modal
      return;
    }

    dispatch(addSkills({ skillsData: data, testId }));
    toast.success("Skill created successfully!");

    if (pageType === "admin") {
      navigate("/admin/app/testsource");
    } else {
      setIsCreateTest(false);
    }
  });

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <form onSubmit={handleFinish}>
        <div className="mt-16">
          <ul className="relative flex flex-row justify-between gap-x-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex justify-center items-center gap-x-2 shrink basis-0 flex-1 group"
              >
                <div className="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
                  {activeStep === index ? (
                    <span className="size-7 flex justify-center items-center shrink-0 bg-green-500 text-white rounded-full">
                      {index + 1}
                    </span>
                  ) : (
                    <span className="size-7 flex justify-center items-center shrink-0 bg-white border border-gray-200 font-medium text-gray-800 rounded-full">
                      {index + 1}
                    </span>
                  )}
                  <span className="ms-2 block text-sm font-medium text-gray-800 dark:text-white">
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-full h-px flex-1 self-center bg-gray-400 group-last:hidden dark:bg-neutral-700"></div>
                )}
              </div>
            ))}
          </ul>

          <div>{steps[activeStep].content}</div>

          <div className="flex justify-around mt-4">
            <button
              type="button"
              className={`py-2 px-4 rounded bg-gray-200 text-gray-600 ${
                activeStep === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
              disabled={activeStep === 0}
            >
              Previous
            </button>

            {activeStep < steps.length - 1 && (
              <button
                type="button"
                className="py-2 px-4 rounded bg-green-500 text-white"
                onClick={handleNext}
                disabled={selectedSkills.length === 0}
              >
                Next
              </button>
            )}

            {activeStep === steps.length - 1 && (
              <button
                type="submit"
                className="py-2 px-4 rounded bg-green-500 text-white"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Modal for validation errors */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Validation Errors"
        ariaHideApp={false}
        className="bg-white p-4 rounded shadow-lg w-1/2 mx-auto"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold ">Validation Errors</h2>
          <button
            onClick={closeModal}
            className="mt-4 py-2 px-4 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>

        <ul className="mt-2 text-red-500">
          {validationErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default CreateTest;
