import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService'; 

//Get users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
  try {
    return await userService.getUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

//Update users
export const updateUsers = createAsyncThunk('users/updateUsers', async ( updatedUserData, thunkAPI) => {
  try {
    return await userService.updateUser( updatedUserData );
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

//Delete users
export const deleteUsers = createAsyncThunk('users/deleteUsers', async (_, thunkAPI) => {
  try {
    return await userService.deleteUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data.user;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data.user;
        state.status = 'success';
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(deleteUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data.user;
        state.status = 'success';
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
