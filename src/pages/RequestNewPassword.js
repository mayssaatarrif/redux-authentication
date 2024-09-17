import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { requestNewPasswordReset } from '../auth/authSlice';
import Spinner from '../component/Spinner';

const RequestNewPasswordReset = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  const handleRequestNewPasswordReset = () => {
    if (email) {
      dispatch(requestNewPasswordReset(email));
    } else {
      alert('Please enter your email.');
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
       <div className='form-group'></div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <div/>
      <button onClick={handleRequestNewPasswordReset} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Request New Password Reset'}
      </button>
      {isSuccess && <p>{message}</p>}
      {isError && <p>{message}</p>}
    </div>
  );
};

export default RequestNewPasswordReset;
