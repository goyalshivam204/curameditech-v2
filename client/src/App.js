import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import {useState,useEffect,createContext} from "react";
import axios from "axios";
// import {config} from "./config/axios"
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Disease from "./components/Disease/Disease";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Footer from "./components/Footer/Footer";
import Diabetes from "./components/Diabetes/Diabetes";
import Heart from "./components/Heart/Heart";
import Account from "./components/Account/Account";
import UpdatePassword from "./components/Account/UpdatePassword";
import Admin from "./components/Account/Admin/Admin";


import LoadImage from "./assets/spinner4.gif"
import DoctorImg from "./assets/doctor.jpg"


export const AuthContext = createContext();

function App() {

  const [loading,setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const checkToken = async () => {

    try{
      const response = await axios.get(process.env.REACT_APP_API_URL + "/api/auth/isAuthenticated", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      // axios only pass status code 200
      // so i am changing my node server for not authorized case.
      // console.log(response);
      const success = response.data.success;
      if(success){
        setIsLoggedIn(true);
      }
    }catch(err){
      setIsLoggedIn(false);
      const message = err.response.data.message ? err.response.data.message : err.message;
      toast.error(message)
    }
    
  }

  const checkAdmin = async () => {
    try{
      const response = await axios.get(process.env.REACT_APP_API_URL + "/api/auth/isAuthorized", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      // axios only pass status code 200
      // so i am changing my node server for not authorized case.
      // console.log(response);
      const success = response.data.success;
      if (success) {
        setIsAdmin(true);
        // console.log("logged");
      } 
    }catch(err){
      const message = err.response.data.message ? err.response.data.message : err.message;
      // toast.error(message);
      setIsAdmin(false);
    }
  }


  const getUser = async ()=>{

      try{
        const response = await axios.get(process.env.REACT_APP_API_URL + "/api/account/details", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response.data);
        setUserDetails(() => {
          return {
            ...response.data.data
          }
        })
      }catch(err){
        const message = err.response.data.message ? err.response.data.message : err.message;
        // toast.error(message)
      }
     
  }
 
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(()=>{
    if(isLoggedIn){
      checkAdmin();
    }else{
      setIsAdmin(false);
    }
  },[isLoggedIn]);


  useEffect(() => {
    if(isLoggedIn){
      getUser();
    }else{
      setUserDetails(null);
    }
  }, [isLoggedIn]);


  return (
    <AuthContext.Provider
      value = {{
        isLoggedIn,
        setIsLoggedIn,
        // loading,
        // setLoading,
        isAdmin,
        setIsAdmin,
        userDetails,
        setUserDetails,
        checkToken,
        checkAdmin,
        DoctorImg
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path = "/diabetes_prediction" element={<Diabetes/>} />
          <Route path = "/heart_prediction" element={<Heart/>} />
          <Route path ="/disease_prediction" element={<Disease/>} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/password" element={<UpdatePassword />}/>
          <Route path="/account/admin" element={<Admin />}/>
          
        </Routes>
        <Footer/>
        <ToastContainer position='top-center' autoClose={1000} />
      </BrowserRouter> 
    </AuthContext.Provider>
  );
}

export default App;
