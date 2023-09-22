import React, { useState } from 'react';
import "./signUp.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {config} from '../../config/axios'
import DoctorImg from "../../assets/doctor.jpg"
const SignUp = () => {
  // const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    // navigate("/")
    e.preventDefault();
    // alert("submit")
    console.log(e.target);
    const userData = {
      email: e.target.email.value,
      username: e.target.username.value,
      firstname: e.target.firstname.value, 
      lastname: e.target.lastname.value,
      password: e.target.password.value,
      age: e.target.age.value
    }
    console.log(userData);
    const response = await axios.post(process.env.REACT_APP_API_URL + "/api/register",userData,config);
    console.log(response);
  }
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className='signUp'>
      <div className='signUp__boxShadow'>
       
        <form className='signUp__form' onSubmit={(e) => { onSubmitHandler(e) }} >
           <h2 className="signUp__header center">Sign Up</h2>
          <div className="signUp__item">
            <input className='signIn__input' required placeholder='username' type="text" name="username" id="username" />
          </div>
          <div className="signUp__item">
            <input className='signIn__input' required placeholder='email' type="email" name="email" id="email" />
          </div>
          <div className="signUp__item">
              <input className='signIn__input' required type="password" placeholder='password' name="password" id="password" />
          </div>
          <div className="signUp__item">
            <input className='signIn__input' required placeholder='first name' type="text" name="firstname" id="firstname" />
          </div>
          <div className="signUp__item">
            <input className='signIn__input' required placeholder='last name' type="text" name="lastname" id="lastname" />
          </div>
          <div className="signUp__item">
            <input className='signIn__input' required placeholder='age' type="number" name="age" id="age" />
          </div>
       
          <button type='submit' className="signUp__btn" >
            Submit
          </button>
        </form>
       
      </div>
    </div>
  )
}

export default SignUp