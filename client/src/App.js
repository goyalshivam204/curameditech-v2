import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import {useState,useEffect,createContext} from "react";
import axios from "axios";
// import {config} from "./config/axios"


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

import LoadImage from "./assets/spinner3.gif"

export const AuthContext = createContext();

function App() {

  const [loading,setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);

  const checkToken = async () => {
    const  response = await axios.get(process.env.REACT_APP_API_URL + "/api/auth/isAuthenticated", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    // axios only pass status code 200
    // so i am changing my node server for not authorized case.
    // console.log(response);
    const success = response.data.success;
    if (success) {
      setIsLoggedIn(true);
      // console.log("logged");
    } else{
      setIsLoggedIn(false);
      // console.log("not logged");
    }
  }

  const checkAdmin = async () => {
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
      setIsLoggedIn(true);
      // console.log("logged");
    } else {
      setIsLoggedIn(false);
      // console.log("not logged");
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    
  }, [isLoggedIn]);


  return (
    <AuthContext.Provider
      value = {{
        isLoggedIn,
        setIsLoggedIn,
        loading,
        setLoading,
        isAdmin,
        setIsAdmin,
        checkToken,
        checkAdmin
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
          <Route path="/update" element={<UpdatePassword />} />
        </Routes>
        <Footer/>
      </BrowserRouter> 
    </AuthContext.Provider>
  );
}

export default App;
