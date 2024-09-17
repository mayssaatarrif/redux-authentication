import axios from 'axios';
const API_URL = 'https://my-notes-app-apis.onrender.com/api/auth/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'signup', userData);
  return {
    user: response.data.user,
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
  };
};

//Login user
const login= async (userData) => {
  const response = await axios.post(API_URL + 'signin', userData);
  return {
    user: response.data.user,
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
  };
};

//Verify email code 
const verifyEmailCode = async (code,email) => {
  try {
    const response = await axios.post('https://my-notes-app-apis.onrender.com/api/auth/verify-email', { 
      email,
      code });  // Assuming the API expects the code in the body
    return response.data;
  } catch (error) {
    console.error('Verification failed:', error.response?.data || error.message);
    throw error;
  }
};

//Request new verification email
const requestNewVerificationEmail = async (email) => {
  try {
    const response = await axios.post(API_URL + 'request-new-verification-email', { email });
    return response.data;
  } catch (error) {
    console.error('Request for new verification email failed:', error.response?.data || error.message);
    throw error;
  }
};

//Request password reset
const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(API_URL + 'request-password-reset', { email });
    return response.data;
  } catch (error) {
    console.error('Request for new password failed:', error.response?.data || error.message);
    throw error;
  }
};

//Reset Password
const resetPassword = async (email,code,newPassword) => {
  try {
    const response = await axios.post(API_URL + 'password-reset', { 
      email,
      code,
     newPassword
    });
    return response.data;
  } catch (error) {
    console.error('new password reset failed:', error.response?.data || error.message);
    throw error;
  }
};

//Request new password rest
const requestNewPasswordReset = async (email) => {
  try {
    const response = await axios.post(API_URL + 'request-new-password-reset', {email});
    return response.data;
  } catch (error) {
    console.error('Request for new password failed:', error.response?.data || error.message);
    throw error;
  }
};

//Logout user
const logout = async (accessToken) => {
  // Assuming the backend API has a logout endpoint to invalidate the token
  await axios.post(API_URL + 'signout', {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Sending the token to be invalidated
    },
  });
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(API_URL + 'refresh-token', { refreshToken });
    return response.data;
  } catch (error) {
    console.error('Failed to refresh access token:', error.response?.data || error.message);
    throw error;
  }
};



const authService = { register, logout, login, 
  verifyEmailCode,requestNewVerificationEmail, requestPasswordReset,
  resetPassword,requestNewPasswordReset
  ,refreshAccessToken
};
export default authService;
