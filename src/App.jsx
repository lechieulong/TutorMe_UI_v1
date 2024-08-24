import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./components/common/NotFound";
import ClassesList from "./pages/classes/ClassList";
import TestSetting from "./pages/TestExam/TestSetting";
import TestView from "./pages/TestExam/TestView";
import SkillPart from "./pages/TestExam/SkillPart";
import LiveStream from "./pages/LiveStream";
import "preline";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Router>
        <Routes>
          {/* Test  common*/}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          {/* Test  exam*/}
          <Route path="/test-setting/test-exam" element={<TestView />} />
          <Route path="/live-stream" element={<LiveStream />} />
          <Route path="/skill-part/test-setting" element={<TestSetting />} />
          <Route path="/skill-part" element={<SkillPart />} />
          {/* Test  class*/}
          <Route path="/classes" element={<ClassesList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
