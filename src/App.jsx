import React from 'react';
import DataTable from './components/DataTable';
// import Test from './pages/TestExam/Test';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import UserDetail from './pages/User/UserDetail';
import ProfileEdit from './pages/User/ProfileEdit';
import ChangePassword from './pages/User/ChangePassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/userdetail" element={<UserDetail />} />
        <Route path="/profileedit" element={<ProfileEdit />} />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;