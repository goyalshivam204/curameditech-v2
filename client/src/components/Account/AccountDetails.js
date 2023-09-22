import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../App';
import { Link,useNavigate } from 'react-router-dom';
import './AccountDetails.css';

const AccountDetails = ({ username,email,firstname,lastname }) => {
    const navigate  = useNavigate();
    const {checkAdmin,isAdmin} = useContext(AuthContext);

    useEffect(()=>{
        checkAdmin();
    },[]);
    return (
        <div className="account-details">
            <h1>Account Details</h1>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    readOnly
                />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    readOnly
                />
            </div>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstname}
                    readOnly
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastname}
                    readOnly
                />
            </div>
            {/* <div className="account-details-button">
                <Link to="/account/update">Update Password</Link>
            </div> */}
            <div className="account-details-button">
                <button type="button" onClick={() => navigate('/update')}>Go to Update Password</button>
            </div>
            {isAdmin?<>
                <div className="account-details-button">
                    <button type="button" onClick={() => navigate('/admin')}>Go to Admin Dashboard</button>
                </div>
            </>:<></>}
            
        </div>
    );
};

export default AccountDetails;
