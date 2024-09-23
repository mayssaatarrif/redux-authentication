import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers,deleteUsers } from './userSlice'

const UserList = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, message } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users on component mount
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteUsers());
      dispatch(fetchUsers());
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {message}</div>;
  if (!users || Object.keys(users).length === 0) {
    return <div>No user available</div>;  // Handle the case when no user is present
  }
  return (
    <div>
      <h1>User List</h1>
      <ul>
      <div>
      <h2>{users.firstName}</h2>  
      <p>{users.email}</p>   
    </div>
      </ul>
      <br/>
      <button onClick={() => handleDelete()}
        className='btn btn-block small-button'
        style={{ width: '200px', fontSize: '12px', display: 'block', margin: '0 auto',}} 
        >Delete User</button>
    </div>
  );
};

export default UserList;
