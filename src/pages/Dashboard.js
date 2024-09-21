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
  className='btn btn-block small-button'>
  Request Password Reset
</button>
  <UserList/>
  <button onClick={() => navigate('/update-user')}>Go To Update User</button>
  <br/>
  <button onClick={() => navigate('/note-page')}>Go To Note Page</button>
    </div>
  );
};

export default Dashboard;
