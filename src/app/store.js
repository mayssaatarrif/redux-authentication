import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import userReducer from '../users/userSlice';
import notesReducer from '../notes/notesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    notes: notesReducer,
  },
});
