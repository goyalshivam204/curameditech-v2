import React, { useState,useContext } from 'react';
// import Cookies from "js-cookie";
import {config} from "../../config/axios"
import "./signIn.css";
import "./SignIn.css";
import { useNavigate } from 'react-router-dom';
// import {LazyLoadImage} from "react-lazy-load-image-component";
import axios from 'axios';
// import DoctorImg from "../../assets/doctor.jpg"
import { AuthContext } from '../../App';
import { toast } from 'react-toastify';
const SignIn = () => {
  const navigate = useNavigate();
  const {checkToken,DoctorImg} = useContext(AuthContext);

  const onSubmitHandler = async (e) => {
   
    e.preventDefault();
    // alert("submit")
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    try{
      const response = await axios.post(process.env.REACT_APP_API_URL + "/api/auth/login", userData, config);
      localStorage.setItem('token', response.data.token);
      checkToken();
      toast.success("Login, Successfully!!");
      navigate("/");
    }catch(err){
      const message = err.response.data.message ? err.response.data.message: err.message;
      toast.error(message);
    }
   
    

  }
  return (
    <div className='signIn'>
      <div className='signIn__boxShadow'>
        <form onSubmit={onSubmitHandler} className='signIn__form'>
          <div className="signIn__item">
            <h2 className="signIn__header">Sign In</h2>
          </div>
          <div className="signIn__item">
            {/* <label className='signIn__label' htmlFor='email' >Email: </label> */}
            <input className='signIn__input' required placeholder='email' type="email" name="email" id="email" />
          </div>
          <div className="signIn__item">
            {/* <label className='signIn__label ' htmlFor='password' ></label> */}
            <input className='signIn__input' required type="password" placeholder='password' name="password" id="password" />
          </div>
          <button className='signIn__btn' type='submit'> Submit </button>
        </form>
        <div className='signIn__orOption'>
          <div>
          </div>
          <div>
            OR
          </div>
          <div>

          </div>
        </div>
        <div className='signIn__redirect' onClick={() => { navigate("/sign_up") }}>
          Don't have an account?  Sign Up
        </div>
      </div>
    </div>
  )
}

export default SignIn