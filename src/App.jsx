import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./components/common/NotFound";
import ClassesList from "./pages/classes/ClassList";
import TestSetting from "./pages/TestExam/TestSetting";
import TestView from "./pages/TestExam/TestView";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import UserDetail from "./pages/User/UserDetail";
import ProfileEdit from "./pages/User/ProfileEdit";
import ChangePassword from "./pages/User/ChangePassword";
import Calendar from "./pages/Calendar/Calendar";
import SkillPart from "./pages/TestExam/SkillPart";
import LiveStream from "./pages/LiveStream";
 
const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpass" element={<ForgotPassword />} />
          <Route path="/userdetail" element={<UserDetail />} />
          <Route path="/profileedit" element={<ProfileEdit />} />
          <Route path="/changepassword" element={<ChangePassword />} />
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
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
