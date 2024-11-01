import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TestFormDetail from "./TestFormDetail";
import PreviewTest from "./PreviewTest";
import { useDispatch } from "react-redux";
import { addSkills } from "../../redux/testExam/TestSlice";

const CreateTest = ({ skills, testId }) => {
  const { control, resetField, handleSubmit, setValue, getValues } = useForm();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
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
        />
      ),
    },
    {
      label: "Preview",
      content: <PreviewTest data={formData} />,
    },
  ];

  const handleFinish = () => {
    if (formData) {
      console.log(formData, testId);

      dispatch(addSkills({ skillsData: formData, testId }));
      alert("Test Created!");
    } else {
      alert("Please fill out the form before finishing.");
    }
  };

  const onSubmit = (data) => {
    setFormData(data);
  };

  const handleNext = () => {
    // Validate the form before proceeding to the next step
    handleSubmit((data) => {
      setFormData(data);
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    })();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-16 p-10 ">
        <div className="">
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
        </div>

        <div>{steps[activeStep].content}</div>

        <div className="flex justify-between">
          <button
            className={`py-2 px-4 rounded bg-gray-200 text-gray-600 ${
              activeStep === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
            disabled={activeStep === 0}
          >
            Previous
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded bg-green-500 text-white ${
              activeStep === steps.length - 1 ? "hidden" : ""
            }`}
            onClick={handleNext} // Validate and go to next step
          >
            Next
          </button>
          <button
            className={`py-2 px-4 rounded bg-green-500 text-white ${
              activeStep !== steps.length - 1 ? "hidden" : ""
            }`}
            onClick={handleFinish}
          >
            Finish
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateTest;
