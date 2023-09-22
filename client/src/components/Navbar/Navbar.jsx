import {useContext} from 'react';
import { Link ,NavLink } from 'react-router-dom';
import {GiHamburgerMenu} from "react-icons/gi";

import { AuthContext } from '../../App';

import "./navbar.css"
import logoImg from "../../assets/logo4.png"
const Navbar = () => {
    const {isLoggedIn,checkToken} = useContext(AuthContext);

    const signoutHandler = async () => {
        localStorage.setItem('token',null);
        await checkToken();
    }
    const navToggler = () =>{
        const toggleItem = document.querySelector(".toggling-item");
        toggleItem.classList.toggle("display__none");
    }
    return (
        <nav className='nav'>
            <div className="nav__left">
                <Link to="/" className="nav__logo__container">
                    <img className='nav__logo' src={logoImg} alt="" />
                </Link>
                <div className="nav__toggle" onClick={navToggler}>
                    <GiHamburgerMenu fontSize={28}  />    
                </div>
            </div>
            <div className="nav__right toggling-item display__none">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav__link__active" : "nav__link"}>
                    Home
                </NavLink>
                <NavLink to="/disease_prediction" className={({ isActive }) => isActive ? "nav__link__active" : "nav__link"}>
                    Predictor
                </NavLink>
                <NavLink to="/diabetes_prediction" className={({ isActive }) => isActive ? "nav__link__active" : "nav__link"}>
                    Diabetes
                </NavLink>
                <NavLink to="/heart_prediction" className={({ isActive }) => isActive ? "nav__link__active" : "nav__link"}>
                    Heart
                </NavLink>
                {!isLoggedIn?<>
                    <NavLink to="/sign_up" className={({ isActive }) => isActive ? "nav__link__active" : "nav__link"}>
                        Sign Up
                    </NavLink>
                    <NavLink to="/sign_in" className={({ isActive }) => isActive ? "nav__link__active" : "nav__link"}>
                        Sign In
                    </NavLink>   
                </>:<>
                    <NavLink onClick={signoutHandler} to="/" className="nav__link">
                        Sign Out
                    </NavLink>   
                </>}
                                      
            </div>
        </nav>
    )
}

export default Navbar