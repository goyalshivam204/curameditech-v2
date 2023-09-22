import axios from 'axios';
import { useEffect, useState,useContext } from 'react';
import {AuthContext, AuthProvider} from "../../App";
import AccountDetails from "./AccountDetails";


const Account = ()=>{
    const {checkToken } = useContext(AuthContext);
    const [userDetails,setUserDetails] = useState(null);

    const getUser = async ()=>{
        const response = await axios.get(process.env.REACT_APP_API_URL + "/api/account/details", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response.data);
        setUserDetails(()=>{
            return {
                ...response.data.data
            }
        })
    }
    useEffect(()=>{
        getUser();
        // checkToken();
    },[]);

   
    return (<>
        {userDetails?<>
            <div>
                <AccountDetails {...userDetails}></AccountDetails>
            </div>
        </>:<>
            <div>
                loading...
            </div>
        </>}
    </>);
}

export default Account;