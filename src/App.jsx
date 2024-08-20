import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./components/common/NotFound";
import ClassesList from "./pages/classes/ClassList";
import Test from "./pages/TestExam/TestView";
import TestSetting from "./pages/TestExam/TestSetting";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test-exam" element={<Test />} />
          <Route path="/test-setting" element={<TestSetting />} />
          <Route path="/classes" element={<ClassesList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
