import React, { useState,useRef, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import  "./UserProfile.css";
import CropperDemo from "../CropperDemo/CropperDemo"
import ImageCropper from '../ImageCropper/ImageCropper';
import {format} from "date-fns";

function UserProfile({ user, setUser }) {
    const imageCropperRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [seed,setSeed] = useState(1);
    const formData = new FormData();
    // console.log(user);
    const [userData, setUserData] = useState({
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        photo: null,
        croppedPhoto: null
    });

    
    // const [croppedPhoto,setCroppedPhoto] = useState(null);

    const handleEditToggle = () => {
        setUserData({
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            photo: null,
            croppedPhoto: null
        })
        setIsEditing(!isEditing);
    };
    
    const onChangeHandle = (inputType) => (e) => {

        if (inputType === 'photo' && e.target.files[0].size > 1 * 1024 * 1024) {
            // alert();
            toast.error("File Size should be less then 2MB...");
            e.target.value = "";
            return;
        }

        // Added for preview of image
        // if(inputType === 'photo'){
        //     setUrlPhoto(URL.createObjectURL(e.target.files[0]));
        // }


        // To view file size
        if(inputType === 'photo'){
            console.log(e.target.files[0]);
        }

        const value = inputType === 'photo' ? e.target.files[0] : e.target.value;
        // console.log(value);

        setUserData((oldUserData) => {
            let newObj = {
                ...oldUserData,
                [e.target.name]: value
            }
            // console.log(newObj);
            return newObj;
        })
    } 


     // const onSubmitHandler = async (e) => {
    //     e.preventDefault();
    //     try {
    //         formData.set("email", userData.email);
    //         formData.set("username", userData.username);
    //         formData.set("firstname", userData.firstname);
    //         formData.set("lastname", userData.lastname);
    //         formData.set("role",userData.role);
    
    //         if(userData.photo){
    //             const extension = userData.photo.name.split('.').pop();
    //             await imageCropperRef.current.getCropData();
    //             // formData.set("photo", userData.photo, userData.username + "." + extension);
    //             formData.set("photo", userData.croppedPhoto, userData.username + "." + extension);
    //         }
    //         console.log("On Submit Handler!!!")
    //         console.log(formData);
    //         for(let key of formData.entries()){
    //             console.log(key[0] + ', ' + key[1]);
    //         }
    //         const response = await axios.put(process.env.REACT_APP_API_URL + `/api/account/update/profile`, formData, {
    //             headers: {
    //                 "Authorization": `Bearer ${localStorage.getItem('token')}`,
    //                 "content-type": 'multipart/form-data'
    //                 // "content-type": 'application/json'
    //             }
    //         });
    //         setUser((oldUser)=>{
    //             return response.data.data
    //         });
    //         setIsEditing(false);
    //         toast.success("Updated Successfully!!!");
    //     } catch (err) {
    //         // toast.error(err.response.data.message);
    //         const message = err.response?.data?.message ? err.response.data.message : err.message;
    //         toast.error(message);
    //     }
    // }

    const onSubmitHandlerTriggerByUseEffect = async () => {
        try {
            formData.set("email", userData.email);
            formData.set("username", userData.username);
            formData.set("firstname", userData.firstname);
            formData.set("lastname", userData.lastname);
            formData.set("role", userData.role);

            if (userData.photo) {
                // await imageCropperRef.current.getCropData();
                const extension = userData.photo.name.split('.').pop();
                // formData.set("photo", userData.photo, userData.username + "." + extension);
                // console.log(new Date().getTime());
                const customTimestamp = format(new Date(), 'dd-MM-yy_HH-mm-ss');
                // console.log("current:",customTimestamp);
                formData.set("photo", userData.croppedPhoto, userData.username + "_" +customTimestamp + "_" + "." + extension);
            }
            // for (let key of formData.entries()) {
            //     console.log(key[0] + ', ' + key[1]);
            // }
            const response = await axios.put(process.env.REACT_APP_API_URL + `/api/account/update/profile`, formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "content-type": 'multipart/form-data'
                    // "content-type": 'application/json'
                }
            });
            setUser((oldUser) => {
                return response.data.data
            });
            // window.location.reload();
            
            setIsEditing(false);
            toast.success("Updated Successfully!!!");
        } catch (err) {
            // toast.error(err.response.data.message);
            const message = err.response?.data?.message ? err.response.data.message : err.message;
            toast.error(message);
        }
    }


    const cropSubmitHandler = async () => {
        if (userData.photo) {
            await imageCropperRef.current.getCropData();            
        }else{
            onSubmitHandlerTriggerByUseEffect();
        }
    }

    useEffect(()=>{
        if(userData.croppedPhoto){
            onSubmitHandlerTriggerByUseEffect();
        }
    },[userData.croppedPhoto])
   
    
    
    const handleDelete = async() =>{
        try{
            // console.log(process.env.REACT_APP_API_URL + `/api/users/${user._id}`);
            const response = await axios.delete(process.env.REACT_APP_API_URL + `/api/users/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setIsEditing(false);
         
            toast.success(`User: ${user.username} deleled!!`);
        }catch(err){
            const message = err.response ? err.response.data.message: err.message;
            toast.error(message);
        }
       
        
    }
    

    return (
        <div className="UserProfile">
            <div className="user-info">
                <div>
                    <h2>User Profile</h2>
                </div>
                <div className="profile-image-conta">
                    <img src={`${process.env.REACT_APP_API_URL}/api/image/${user.photo}`} alt="Profile" className="profile-image" />
                </div>
                {isEditing ? (
                    <div className="edit-user-details">
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
                                disabled
                                name="role"
                                id="role"
                                value={userData.role}
                                onChange={onChangeHandle("role")}
                            >
                                <option value="user">User</option>
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
                        {userData.photo?<>
                            <div>
                                <ImageCropper ref={imageCropperRef} userData = {userData}  setUserData={setUserData} />
                            </div>
                        </>:<></>}                       
                    </div>
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
                {/* <button onClick={handleDelete}>Delete</button> */}
                {/* <button onClick={onSubmitHandler} disabled={!isEditing}> */}
                <button onClick={cropSubmitHandler} disabled={!isEditing}>
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default UserProfile;
