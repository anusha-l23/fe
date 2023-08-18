import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes,Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <React.Fragment>
    <BrowserRouter>
<Routes>
      <Route exact path="/" element={<Signup />} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/forgot-password" element={<ForgotPassword/>} />
      <Route exact path="/reset-password" element={<ResetPassword/>} />
      <Route exact path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </React.Fragment>
  );
}

export default App;
