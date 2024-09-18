import React from 'react';
import { useNavigate } from 'react-router-dom';


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
    
    </div>
  );
};

export default Dashboard;
