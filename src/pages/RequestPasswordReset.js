import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset } from '../auth/authSlice';
import Spinner from '../component/Spinner'
import {Link} from 'react-router-dom'; 
const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  const handlePasswordReset = () => {
    if (email) {
      dispatch(requestPasswordReset(email));
    } else {
      alert('Please enter your email.');
    }
  };
  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <br/>
      <button onClick={handlePasswordReset} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Request Password Reset'}
      </button>
      {isSuccess && <p>{message}</p>}
      {isError && <p>{message}</p>}
      <br/>
      <Link to="/reset-password">
        <button>
          Go to Reset Password
        </button>
      </Link>
      <br/>
      <Link to="/request-new-password-reset">
        <button>
        Request New Password Reset
        </button>
      </Link>
    </div>
  );
};

export default RequestPasswordReset;
