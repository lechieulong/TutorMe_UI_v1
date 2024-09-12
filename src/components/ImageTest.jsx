import UploadTestExamImage from "./ImageUploadExample/UploadTestExamImage";
import DisplayTestExamImage from "./ImageUploadExample/DisplayTestExamImage";

const App = () => {
  const testId = "14"; // Thay đổi theo ID bài kiểm tra thực tế

  return (
    <div>
      <h1>Upload and Display Test Exam Image</h1>
      <UploadTestExamImage testId={testId} />
      {/* <DisplayTestExamImage testId={testId} /> */}
    </div>
  );
};

export default App;
