import React, { useState ,useContext} from 'react';
import {AuthContext} from "../../App";
// import "./signUp.css";
import "./SignUp.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {config} from '../../config/axios'
import DoctorImg from "../../assets/doctor.jpg"

const SignUp = () => {
  const navigate = useNavigate();
  const {checkToken} = useContext(AuthContext);
  const formData = new FormData();

  const [userData, setUserData] = useState({
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    photo: ''
  })
  
  const onChangeHandle = (inputType) => (e) =>{
    
    if (inputType === 'photo'  && e.target.files[0].size > 1*1024*1024){
      // console.log(e.target.files[0]);
      // alert();
      toast.error("File Size should be less then 2MB...");
      e.target.value = "";
      return;
    }

    const value = inputType === 'photo' ? e.target.files[0] : e.target.value;
    setUserData((oldUserData)=>{
      return {
        ...oldUserData,
        [e.target.name]: value
      }
    })
  } 

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      formData.set("email",userData.email);
      formData.set("username",userData.username);
      formData.set("firstname",userData.firstname);
      formData.set("lastname",userData.lastname);
      formData.set("password",userData.password);

      // console.log("extension",extension);
      if(userData.photo){
        const extension = userData.photo.name.split('.').pop();
        formData.set("photo", userData.photo, userData.username + "." + extension);
      }
      const response = await axios.post(process.env.REACT_APP_API_URL + "/api/register", formData, {
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "content-type": 'multipart/form-data'
          // "content-type": 'application/json'
        }
      });
      toast.success("Sign Up, SuccessFully!!!");
      localStorage.setItem('token', response.data.token);
      checkToken();
      navigate("/"); 
    }catch(err){
      // toast.error(err.response.data.message);
      const message = err.response.data.message ? err.response.data.message : err.message;
      toast.error(message);
    }


    
    // console.log(response);
  }
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className='signUp'>
      <div className='signUp__boxShadow'>
       
        <form className='signUp__form' onSubmit={(e) => { onSubmitHandler(e) }} >
           <h2 className="signUp__header center">Sign Up</h2>

          <div className="signUp__item">
            < input className='signUp__input' 
              required 
              placeholder='username' 
              type="text" 
              name="username" 
              id="username" 
              onChange={onChangeHandle("username")}
              value = {userData.username}
            />
          </div>
          <div className="signUp__item">
            <input className='signUp__input' 
              required 
              placeholder='email' 
              type="email" 
              name="email" 
              id="email" 
              onChange={onChangeHandle("email")}
              value={userData.email}
            />
          </div>
          <div className="signUp__item">
            <input className='signUp__input' 
              required placeholder='first name' 
              type="text" 
              name="firstname" 
              id="firstname" 
              onChange={onChangeHandle("firstname")}
              value={userData.firstname}
            />
          </div>
          <div className="signUp__item">
            <input className='signUp__input' 
              required 
              placeholder='last name' 
              type="text" 
              name="lastname" 
              id="lastname" 
              onChange={onChangeHandle("lastname")}
              value={userData.lastname}
            />
          </div>
          
          <div className="signUp__item">
            <input className='signUp__input' 
              required type="password" 
              placeholder='password' 
              name="password" 
              id="password" 
              onChange={onChangeHandle("password")}
              value={userData.password}
            />
          </div>
          
          {/* <div className="signUp__item">
            <input className='signUp__input' required placeholder='age' type="number" name="age" id="age" />
          </div>
        */}
          {/* <div className="signUp__item">
            <input className='signUp__input' 
              type="file" 
              name="photo" 
              accept="image/*" 
              id="photo" 
              onChange={onChangeHandle('photo')}
            />
          </div> */}
          <button type='submit' className="signUp__btn" >
            Submit
          </button>
        </form>
       
      </div>
      {/* <ToastContainer position='top-center' autoClose={1000} /> */}
    </div>
  )
}

export default SignUp