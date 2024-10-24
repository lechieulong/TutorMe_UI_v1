import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TestFormDetail from "./TestFormDetail";
import Header from "../../components/common/Header";
import PreviewTest from "./PreviewTest";
import { useDispatch } from "react-redux";
import { addSkills } from "../../redux/testExam/TestSlice";
import MainLayout from "../../layout/MainLayout";

const CreateTest = () => {
  const { control, resetField, handleSubmit, setValue, getValues } = useForm();

  const [activeStep, setActiveStep] = useState(0); // Active step index
  const [formData, setFormData] = useState(null); // To hold form data from TestFormDetail
  const [selectedSkills, setSelectedSkills] = useState([]); // Move selectedSkills to parent
  const dispatch = useDispatch();

  const steps = [
    {
      label: "Update Test Info",
      content: (
        <TestFormDetail
          control={control}
          resetField={resetField}
          setSelectedSkills={setSelectedSkills} // Pass down setSelectedSkills
          selectedSkills={selectedSkills} // Pass down selectedSkills
        />
      ),
    },
    {
      label: "Preview",
      content: <PreviewTest data={formData} />,
    },
  ];

  const handleFinish = () => {
    console.log("formData", formData);

    if (formData) {
      dispatch(addSkills(formData));
      alert("Test Created!"); // You can replace this with your actual submission logic
    } else {
      alert("Please fill out the form before finishing.");
    }
  };

  const onSubmit = (data) => {
    setFormData(data);
  };

  return (
    <MainLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-16 p-10 ">
          {/* Stepper */}
          <div className="">
            <ul className="relative flex flex-row justify-between gap-x-2  ">
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

          {/* End Stepper */}

          {/* Step Content */}
          <div>{steps[activeStep].content}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between ">
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
              type="submit"
              className={`py-2 px-4 rounded bg-green-500 text-white ${
                activeStep === steps.length - 1 ? "hidden" : ""
              }`}
              onClick={() =>
                setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
              }
            >
              Next
            </button>
            <button
              className={`py-2 px-4 rounded bg-green-500 text-white ${
                activeStep !== steps.length - 1 ? "hidden" : ""
              }`}
              onClick={handleFinish} // Call handleFinish here
            >
              Finish
            </button>
          </div>
        </div>
      </form>
    </MainLayout>
  );
};

export default CreateTest;
