// UserList.js
import React from 'react';
import UserItem from '../UserItem/UserItem';

function UserList({ users,setUsers }) {
    return (
        <div className='UserList'>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <UserItem key={user._id} user={user} setUsers={setUsers} users={users}/>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
