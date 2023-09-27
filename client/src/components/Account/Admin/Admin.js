// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import "./Admin.css";

function Admin() {
  const [users, setUsers] = useState(null);

  const getAllUsers = async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL + '/api/users',{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setUsers(response.data.data);
    // console.log(response.data.data);
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className='Admin'>
      <h1 >Admin Dashboard</h1>
      {users?<>
        <UserList users={users} setUsers = {setUsers}/>
      </>:<></>}
      
    </div>
  );
}

export default Admin;
