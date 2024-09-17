import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './component/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import VerifyEmail from './pages/VerifyEmail';
import RequestNewVerificationEmail from './pages/requestNewVerificationEmail';
import RequestPasswordReset from '../src/pages/RequestPasswordReset'
import ResetPassword from './pages/ResetPassword';
import RequestNewPasswordReset from './pages/RequestNewPassword';
function App() {
  return (
    <>
    <Router>
    <div className="App">
      <Header/>
      {/* In router v6 you can't have anything under Routes
      except Route */}
     <Routes>
      <Route path='/' element = {<Dashboard/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path="/register" element={<Register />} />
      <Route path='/verify-email' element={<VerifyEmail/>}/>
      <Route path='/new-verify' element={<RequestNewVerificationEmail/>}/>
      <Route path='/request-reset-password' element={<RequestPasswordReset/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/request-new-password-reset' element={<RequestNewPasswordReset/>}/>
     </Routes>
    </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
