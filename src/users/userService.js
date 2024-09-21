import axiosInstance from '../axiosInstance';
// Get user
export const getUsers = async () => {
  const response = await axiosInstance.get('https://my-notes-app-apis.onrender.com/api/user/get-user');
  console.log(response.data);
  return response.data;
};

// Update user
export const updateUser = async (updatedUserData) => {
  try {
    const response = await axiosInstance.put('/user/update-user', updatedUserData);
    console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
    throw error; 
  }

};

// Delete user
export const deleteUser = async () => {
  try {
    const response = await axiosInstance.delete('/user/delete-user');
    console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error.response ? error.response.data : error.message);
    throw error; 
  }

};

const userService = { getUsers,updateUser,deleteUser };
export default userService;