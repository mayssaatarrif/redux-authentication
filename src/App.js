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
import UserList from './users/userList';
import UpdateUserForm from './pages/UpdateUsers';
import NotePage from './pages/NotePage';
import NoteList from './pages/NoteList';
import UpdateNotePage from './pages/UpdateNotes';


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
      <Route path='/userList' element = {<UserList/>}/>
      <Route path='/update-user' element = {<UpdateUserForm/>}/>
      <Route path ='/note-page' element ={<NotePage/>}/>
      <Route path ='/note-list' element ={<NoteList/>}/>
      <Route path ='/update-notes/:noteId' element ={<UpdateNotePage/>}/>
     </Routes>
    </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
