import Test from "./pages/TestExam/Test";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test-exam" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
