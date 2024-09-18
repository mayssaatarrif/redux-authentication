import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

//Logout user
export const logout = createAsyncThunk('auth/logout',
    async()=>{
        await authService.logout()
    }
)

// Verify email code
export const verifyEmailCode = createAsyncThunk('auth/verifyEmailCode', async ({email,code}, thunkAPI) => {
    try {
      return await authService.verifyEmailCode(email,code);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

//Resend new verification email
export const sendNewVerificationEmail = createAsyncThunk('auth/sendNewVerificationEmail', async (email, thunkAPI) => {
    try {
      return await authService.requestNewVerificationEmail(email);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

//Request password reset
export const requestPasswordReset = createAsyncThunk('auth/requestPasswordReset', async (email, thunkAPI) => {
  try {
    return await authService.requestPasswordReset(email);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Reset password
export const resetPassword = createAsyncThunk('auth/resetPassword', async (email,code,newPassword, thunkAPI) => {
  try {
    return await authService.requestPasswordReset(email,code,newPassword);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Request new password reset
export const requestNewPasswordReset = createAsyncThunk('auth/requestNewPasswordReset', async (email, thunkAPI) => {
  try {
    return await authService.requestNewPasswordReset(email);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get user


// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    updateTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(verifyEmailCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmailCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Email verified';
        state.user = action.payload; 
      })
      .addCase(verifyEmailCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'Failed to verify email';
      })
      .addCase(sendNewVerificationEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendNewVerificationEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload || 'New verification email sent';
      })
      .addCase(sendNewVerificationEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'Failed to send new verification email';
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = typeof action.payload === 'string' ? action.payload : 'Password reset link sent'
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true; 
        state.message = typeof action.payload === 'string' ? action.payload : 'Failed to send request';
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = typeof action.payload === 'string' ? action.payload : 'Password reset '
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true; 
        state.message = typeof action.payload === 'string' ? action.payload : 'Failed to reset password';
      })
      .addCase(requestNewPasswordReset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestNewPasswordReset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = typeof action.payload === 'string' ? action.payload : 'Password reset link sent'
      })
      .addCase(requestNewPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true; 
        state.message = typeof action.payload === 'string' ? action.payload : 'Failed to send new request';
      })
  },
});

export const { reset,updateTokens } = authSlice.actions;
export default authSlice.reducer;
