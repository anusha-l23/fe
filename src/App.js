
import './App.css';
import React from 'react';
import { BrowserRouter as Router  } from 'react-router-dom';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// import Dashboard from './components/dashboard';
// import EditProfile from './components/EditProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import EmailVerificationPage from './components/EmailVerification';
import RoutesApp from './routes';
function App() {
  return (
    <React.Fragment>
<Router>
<RoutesApp/>
</Router>
    <ToastContainer/>
    </React.Fragment>
  );
}

export default App;
