import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormSkill from "../../components/Test/SkillForm/FormSkill";
import FilterForm from "../../components/Test/SkillForm/FilterForm";
import Header from "../../components/common/Header";
import { faPlane, faStream } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { createTest } from "../../redux/testExam/TestSlice";

const TestForm = () => {
  const [formData, setFormData] = useState({
    testName: "",
    classIds: [],
    startTime: new Date(),
    endTime: new Date(),
    skills: [],
  });
  const dispatch = useDispatch();
  const {
    control,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDataChange = (updatedData) =>
    setFormData((prevData) => ({ ...prevData, ...updatedData }));

  const onSubmit = async (values) => {
    console.log(formData);

    try {
      // dispatch(createTest(finalFormData));
      alert("Submission successful!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed.");
    }
  };

  const renderSkillForms = () =>
    formData.skills.map((skill, index) => (
      <FormSkill
        formData={formData}
        control={control}
        unregister={unregister}
        skill={skill.type}
        key={index}
        skillData={skill}
        handleDataChange={handleDataChange}
      />
    ));

  return (
    <div className="w-full p-3 mt-16">
      <Header />
      <h3 className="mb-4 text-2xl font-semibold text-gray-500">
        <span className="mr-2">
          <FontAwesomeIcon icon={faStream} />
        </span>
        Form Create Test
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-green-50 shadow-lg rounded-lg border border-gray-200"
      >
        <div className="flex gap-3 mb-6">
          <div className="w-6/12">
            <label
              htmlFor="testName"
              className="block font-semibold text-gray-800"
            >
              Test Name
            </label>
            <Controller
              name="testName"
              control={control}
              defaultValue=""
              rules={{ required: "Test Name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="mt-2 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter test name"
                />
              )}
            />
            {errors.testName && (
              <p className="text-red-500 text-sm">{errors.testName.message}</p>
            )}
          </div>
        </div>

        <FilterForm
          onSelectClass={(classes) => handleDataChange({ classIds: classes })}
          formData={formData}
          handleDataChange={handleDataChange}
        />

        <div className="flex gap-6">
          <div className="mb-6">
            <label
              htmlFor="startTime"
              className="block font-semibold text-gray-800"
            >
              Start Time
            </label>
            <Controller
              name="startTime"
              control={control}
              defaultValue={formData.startTime}
              rules={{ required: "Start time is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="datetime-local"
                  className="mt-2 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().slice(0, 16)}
                />
              )}
            />
            {errors.startTime && (
              <p className="text-red-500 text-sm">{errors.startTime.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="endTime"
              className="block font-semibold text-gray-800"
            >
              End Time
            </label>
            {/* <Controller
              name="endTime"
              control={control}
              defaultValue={formData.endTime}
              rules={{
                required: "End time is required",
                validate: (value) =>
                  value > formData.startTime ||
                  "End time must be after start time",
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="datetime-local"
                  className="mt-2 block w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={formData.startTime.toISOString().slice(0, 16)}
                />
              )}
            />
            {errors.endTime && (
              <p className="text-red-500 text-sm">{errors.endTime.message}</p>
            )} */}
          </div>
        </div>

        <main className="mx-auto mt-8 rounded border-2">
          <div className="flex flex-col gap-2">{renderSkillForms()}</div>

          <div className="p-2">
            <button
              type="submit"
              className="w-28 ml-10 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              <span className="mr-2">
                <FontAwesomeIcon icon={faPlane} />
              </span>
              Submit
            </button>
          </div>
        </main>
      </form>
    </div>
  );
};

export default TestForm;
