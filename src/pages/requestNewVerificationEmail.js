import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendNewVerificationEmail } from '../auth/authSlice';

const RequestNewVerificationEmail = () => {
  const [email, setEmail] = useState(''); // State to store the email input
  const dispatch = useDispatch(); // Hook to access Redux dispatch function
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth); // Access Redux state

  const handleRequestNewEmail = () => {
    if (email) {
      dispatch(sendNewVerificationEmail(email)); // Dispatch action to request new verification email
    } else {
      alert('Please enter your email address.'); 
    }
  };

  return (
    <div>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Enter your email"
      />
      <button onClick={handleRequestNewEmail} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Request New Verification Email'}
      </button>
      {isSuccess && <p>{message}</p>}
      {isError && <p>{message}</p>} 
    </div>
  );
};

export default RequestNewVerificationEmail;
