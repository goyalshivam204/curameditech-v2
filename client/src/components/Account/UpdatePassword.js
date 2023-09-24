import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import axios from 'axios';
import "./UpdatePassword.css";

const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        // Validate the passwords

        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match')
            return;
        }

        // Update the password

        // ...
        const postData ={
            currentPassword: e.target.currentPassword.value,
            newPassword: e.target.newPassword.value,
            confirmPassword: e.target.confirmPassword.value
        }
        const response = await axios.put(process.env.REACT_APP_API_URL+"/api/account/update/password", postData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        // Redirect the user to the account details page

        navigate('/account');
    };

    return (
        <div className="update-password">
            <h1>Update Password</h1>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Update Password</button>
            </form>
        </div>
    );
};

export default UpdatePassword;
