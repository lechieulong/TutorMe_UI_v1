import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "regenerator-runtime/runtime";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AdminRoute } from "./service/checkAuth";

import Home from "./pages/Home";
import NotFound from "./components/common/NotFound";
import TestSetting from "./pages/TestExam/TestSetting";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import UpMoney from "./pages/User/UpMoney";

import UserDetail from "./pages/User/UserDetail";
import TeacherProfile from "./pages/Teacher/TeacherProfile";
import ProfileEdit from "./pages/User/ProfileEdit";
import ChangePassword from "./pages/User/ChangePassword";
import BeTeacher from "./pages/User/Beteacher";
import UpdateTeacherRequest from "./pages/User/UpdateTeacherRequest";

import Calendar from "./pages/Calendar/Calendar";
import CoachingSchedule from "./pages/Teacher/CoachingSchedule";
import ConfirmBook from "./pages/Schedule/ConfirmBook";
import BookedSchedule from "./pages/Schedule/Scheduled";

import SkillPart from "./pages/TestExam/SkillPart";
import LiveStream from "./pages/LiveStream";
import MetorInfor from "./pages/Mentor/MentorInforTest";
import CourseList from "./pages/Course/CourseList";
import ClassOfCourse from "./pages/Course/ClassList";
import TestList from "./pages/User/TestList";
import MentorCourseDetail from "./pages/Mentor/MentorCourseDetail";
// import MyLearning from "./pages/Class/MyLearning";
// import CourseDetail from './CourseDetail';

import "preline";
import TestLayout from "./pages/TestExam/TestLayout";
import CourseDetail from "./pages/Course/CourseDetail";
import CourseTimeline from "./pages/Course/components/CourseTimeline";
import CreateCourse from "./pages/Course/components/CreateCourse";
import SpeakingGemini from "./service/SpeakingGemini";

import MyLearning from "./pages/Class/MyLearning";
// import PayOS from "./pages/User/PayOS";
import TestForm from "./pages/ExamTest/TestForm";
// import TestFormDetail from "./pages/ExamTest/TestFormDetail";
import CreateTest from "./pages/ExamTest/CreateTest";
import MentorCourseList from "./pages/Mentor/MentorCourseList";
import Error404 from "./pages/Error/Error404";
import NotAuthorizedPage from "./pages/Error/NotAuthorizedPage";
import QuestionBank from "./pages/ExamTest/questionBank/QuestionBank";
import PayOS from "./pages/User/PayOS";
import PaymentResult from "./pages/User/PayOSResult ";
import CreateTestLayout from "./pages/course/CreateTestLayout";
import CourseLayout from "./pages/course/CourseLayout";
import ListTest from "./pages/ExamTest/ListTest";

import Term from "./pages/Terms";

//ADMIN
import AdminApp from "./pages/ADMIN/Index";

import CreateClass from "./pages/Class/CreateClass";
const App = () => {
  return (
    <div className=" min-h-screen ">
      <Router>
        <Routes>
          <Route path="/terms" element={<Term />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpass" element={<ForgotPassword />} />
          <Route path="/user/:username" element={<UserDetail />} />
          <Route path="/teacherprofile" element={<TeacherProfile />} />
          <Route path="/user/edit/:username" element={<ProfileEdit />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/beteacher" element={<BeTeacher />} />
          <Route path="/updateteacherrequest" element={<UpdateTeacherRequest />} />
          <Route path="/upmoney" element={<UpMoney />} />
          {/* <Route path="/Payment" element={<PayOS />} /> */}
          {/* Test  common*/}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/gemini" element={<SpeakingGemini />} />
          {/* Test  exam*/}
          <Route path="/testing/:testId" element={<TestLayout />} />
          <Route path="/testing/:skillId/skill" element={<TestLayout />} />
          <Route
            path="/test/:testId/settings/:skillId"
            element={<TestSetting />}
          />
          <Route path="/testDetail/:testId" element={<SkillPart />} />
          <Route path="/listTest" element={<ListTest />} />
          <Route path="/create-skill" element={<CreateTest />} />
          <Route path="/create-test/:sectionCourseId" element={<TestForm />} />
          <Route path="/create-test" element={<TestForm />} />
          <Route path="/questionbank" element={<QuestionBank />} />
          {/* LiveStream  exam*/}
          <Route path="/live-stream" element={<LiveStream />} />
          {/* Test  class*/}
          {/* <Route
            path="/courseDetail/:courseId/classList"
            element={< />}
          /> */}
          {/* Calender */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/coachingschedule" element={<CoachingSchedule />} />
          <Route
            path="/coachingschedule/:teachername"
            element={<CoachingSchedule />}
          />
          <Route path="/schedulepaymentmethod" element={<ConfirmBook />} />
          <Route path="/coachingschedule/bookedschedule" element={<BookedSchedule />} />

          {/* Test Mentor */}
          {/* Mentor */}
          <Route path="/metorinfor" element={<MetorInfor />} />
          <Route path="/mentorCourseList" element={<MentorCourseList />} />
          {/* Course */}
          <Route path="/courseLayout" element={<CourseLayout />} />
          <Route path="/courseList" element={<CourseList />} />
          <Route path="/createCourse" element={<CreateCourse />} />
          <Route path="/courseDetail/:courseId" element={<CourseDetail />} />
          <Route
            path="/mentorCourseDetail/:courseId"
            element={<MentorCourseDetail />}
          />
          <Route
            path="/courseDetail/:courseId/classes"
            element={<ClassOfCourse />}
          />
          <Route path="/course-timeline" element={<CourseTimeline />} />
          {/* <Route path="/courses/:courseId" element={<CourseDetail />} /> */}
          {/* Class */}
          <Route path="/mylearning" element={<MyLearning />} />
          <Route path="/createClass" element={<CreateClass />} />
          {/* List test that User did */}
          <Route path="/testlist" element={<TestList />} />
          {/* Error page */}
          <Route path="/404" element={<Error404 />} />
          <Route path="/not-authorized" element={<NotAuthorizedPage />} />
          <Route path="/Payment" element={<PayOS />} />
          <Route path="/Payment" element={<PayOS />} />
          <Route path="/Paymentresult" element={<PaymentResult />} />
          
          {/* ADMIN */}
          <Route
            path="/admin/app/*"
            element={
              <AdminRoute>
                <AdminApp />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
