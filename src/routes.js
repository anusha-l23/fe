import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/dashboard';
import EditProfile from './components/EditProfile';
import EmailVerificationPage from './components/EmailVerification';

const RoutesApp = () => (
  <Routes>
    <Route exact path="/" element={<Dashboard/>} />
    <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/forgot-password" element={<ForgotPassword/>} />
      <Route exact path="/reset-password/:code" element={<ResetPassword/>} />
      <Route exact path="/edit-profile" element={<EditProfile/>} />
      <Route exact path="/userVerification" element={<EmailVerificationPage/>} />
  </Routes>
);

export default RoutesApp;