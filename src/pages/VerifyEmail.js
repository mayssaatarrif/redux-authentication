import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { verifyEmailCode } from '../auth/authSlice';
import Spinner from '../component/Spinner';
import { useNavigate } from 'react-router-dom';
import { reset } from '../auth/authSlice';

function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  
    if (isSuccess) {
      // Redirect to email verification page
      navigate('/');
    }
    dispatch(reset())
  }, [ isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault();
   dispatch(verifyEmailCode(verificationCode)); 
  };

  if (isLoading) {
    return <Spinner />;
  }

  

  return (
    <section className='heading'>
      <h1>Verify Your Email</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='verificationCode'
            value={verificationCode}
            placeholder='Enter verification code'
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-block'>Submit</button>
      </form>
      {isError && <p className='error'>{message}</p>}
      {isSuccess && <p className='success'>Email verified successfully!</p>}
    </section>
  );
}

export default VerifyEmail;
