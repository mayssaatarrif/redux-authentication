import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../auth/authSlice'; 
import Spinner from '../component/Spinner'; 

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  const handleResetPassword = () => {
    if (email && code && newPassword) {
      dispatch(resetPassword({ email, code, newPassword }));
    } else {
      alert('Please fill in all fields.');
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <br/>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter the reset code"
      />
      <br/>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
      />
      <br/>
      <button onClick={handleResetPassword} disabled={isLoading}>
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </button>
      {isSuccess && <p>{message}</p>}
      {isError && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
