import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from '../users/userList';


const Dashboard = () => {
  const navigate = useNavigate();

  const handlePasswordResetClick = () => {
    navigate('/request-reset-password'); 
 };

  return (
    <div>
      <h1>Dashboard</h1>
      <button 
  onClick={handlePasswordResetClick} 
  className='btn btn-block small-button'
  style={{ width: '200px', fontSize: '12px', display: 'block', margin: '0 auto',}} >
  Request Password Reset
</button>
<br/>
  <UserList/>
  <br/>
  <div className='form-group'>      
  <button onClick={() => navigate('/update-user')} className='btn btn-block small-button'
    style={{ width: '200px', fontSize: '12px', display: 'block', margin: '0 auto',}} 
  >Go To Update User</button>
  <br/>
  <button onClick={() => navigate('/note-page')} className='btn btn-block small-button'
    style={{ width: '200px', fontSize: '12px', display: 'block', margin: '0 auto',}} >
      Go To Note Page</button>
          </div>
    </div>
  );
};

export default Dashboard;
