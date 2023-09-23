import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import  "./UserItem.css";

function UserItem({ user, setUsers }) {
    const [isEditing, setIsEditing] = useState(false);
    const formData = new FormData();

    const [userData, setUserData] = useState({
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        photo: null
    });


    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };
    
    const onChangeHandle = (inputType) => (e) => {

        if (inputType === 'photo' && e.target.files[0].size > 1 * 1024 * 1024) {
            console.log(e.target.files[0]);
            // alert();
            toast.error("File Size should be less then 2MB...");
            e.target.value = "";
            return;
        }

        const value = inputType === 'photo' ? e.target.files[0] : e.target.value;
        console.log(value);
        setUserData((oldUserData) => {
            let newObj = {
                ...oldUserData,
                [e.target.name]: value
            }
            // console.log(newObj);
            return newObj;
        })
    } 


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            formData.set("email", userData.email);
            formData.set("username", userData.username);
            formData.set("firstname", userData.firstname);
            formData.set("lastname", userData.lastname);
            formData.set("role",userData.role);
            if(userData.photo){
                const extension = userData.photo.name.split('.').pop();
                formData.set("photo", userData.photo, userData.username + "." + extension);
            }
            console.log(formData);
            for(let key of formData.entries()){
                console.log(key[0] + ', ' + key[1]);
            }
            const response = await axios.put(process.env.REACT_APP_API_URL + `/api/users/${user._id}`, formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "content-type": 'multipart/form-data'
                    // "content-type": 'application/json'
                }
            });
            setUsers((oldUsers) => {
                let newUsers = oldUsers.map((oldUser) => { 
                    if(oldUser._id !== user._id){
                        return oldUser;
                    }else{
                        return response.data.data;
                    }
                })
                console.log(newUsers);
                return newUsers;
            });
            setIsEditing(false);
            toast.success("Updated Successfully!!!");
        } catch (err) {
            // toast.error(err.response.data.message);
            const message = err.response.data.message ? err.response.data.message : err.message;
            toast.error(message);
        }
    }
    
    
    const handleDelete = async() =>{
        try{
            // console.log(process.env.REACT_APP_API_URL + `/api/users/${user._id}`);
            const response = await axios.delete(process.env.REACT_APP_API_URL + `/api/users/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setIsEditing(false);
            setUsers((oldUsers)=>{
                return oldUsers.filter((oldUser)=>{return oldUser._id !== user._id})
            });
            toast.success(`User: ${user.username} deleled!!`);
        }catch(err){
            const message = err.response ? err.response.data.message: err.message;
            toast.error(message);
        }
       
        
    }


    return (
        <li className="UserItem">
            <div className="user-info">
                <img src={`${process.env.REACT_APP_API_URL}/api/image/${user._id}`} alt="Profile" className="profile-image" />
                {isEditing ? (
                    <form className="edit-user-details">
                        <label>
                            Username:
                            <input
                                disabled
                                type="text"
                                name="username"
                                id="username"
                                value={userData.username}
                                onChange={onChangeHandle("username")}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                disabled
                                type="text"
                                name="email"
                                id="email"
                                value={userData.email}
                                onChange={onChangeHandle("email")}
                            />
                        </label>
                        <label>
                            Role:
                            <select
                                name="role"
                                id="role"
                                value={userData.role}
                                onChange={onChangeHandle("role")}
                            >
                                <option value="patient">Patient</option>
                                <option value="admin">Admin</option>
                            </select>
                        </label>
                        <label>
                            First Name:
                            <input
                                required
                                type="text"
                                name="firstname"
                                id="firstname"
                                value={userData.firstname}
                                onChange={onChangeHandle("firstname")}
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                required
                                type="text"
                                name="lastname"
                                id="lastname"
                                value={userData.lastname}
                                onChange={onChangeHandle("lastname")}
                            />
                        </label>
                        <label>
                            Profile Photo:
                            <input
                                type="file"
                                name="photo"
                                id="photo"
                                accept="image/*"
                                onChange={onChangeHandle("photo")}
                            />
                        </label>
                        {/* <button onClick={onSubmitHandler}>Update</button> */}
                    </form>
                ) : (
                    <div className="user-details">
                        <strong>{user.username}</strong> - {user.firstname} {user.lastname} ({user.email})
                    </div>
                )}
            </div>
            <div className="user-actions">
                <button onClick={handleEditToggle}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={onSubmitHandler} disabled={!isEditing}>
                    Save Changes
                </button>
            </div>
        </li>
    );
}

export default UserItem;