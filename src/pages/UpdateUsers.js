import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsers,fetchUsers } from '../users/userSlice';
const UpdateUserForm = () => {
    const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [updatedUserData, setUpdatedUserData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData, 
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users on component mount
  }, [dispatch]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        await dispatch(updateUsers(updatedUserData)).unwrap();
        dispatch(fetchUsers()); // Refresh the user list after update
      } catch (error) {
        console.error('Failed to update user:', error);
      }
  };

  

  return (
    <div>
      {response && (
      <div>
        <p>Success: {response.success.toString()}</p>
        <p>Message: {response.message}</p>
      </div>
    )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={updatedUserData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={updatedUserData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={updatedUserData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
