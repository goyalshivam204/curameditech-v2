import axios from 'axios';
import { useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext, AuthProvider} from "../../App";
import AccountDetails from "./AccountDetails";
import UserProfile from './UserProfile/UserProfile';
import "./Account.css";

const Account = ()=>{
    const {userDetails,isAdmin, setUserDetails } = useContext(AuthContext);
    const navigate = useNavigate();

   
    return (<div className='account'>
        {userDetails?<>
            <div className='user-profile-container'>
                <UserProfile user = {userDetails}  setUser = {setUserDetails}/>
            </div>
            <div className="account-button">
                <button type="button" onClick={() => navigate('/account/password')}>Go to Update Password</button>
            </div>
            {isAdmin ? <>
                <div className="account-button">
                    <button type="button" onClick={() => navigate('/account/admin')}>Go to Admin Dashboard</button>
                </div>
            </> : <></>}
        </>:<>
            <div>
                loading...
            </div>
        </>}
    </div>);
}

export default Account;