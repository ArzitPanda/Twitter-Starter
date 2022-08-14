import React from 'react'
import './Sidebar.css';
import { Icon } from "web3uikit";
import { Link } from "react-router-dom";
import { useMoralis} from "react-moralis";

const Navbar = () => {


    const {Moralis} =useMoralis();

  return (
    <div className="navContainer">
            <div className="details">
        <Icon fill="#ffffff" size={20} svg="twitter"/>
     </div>
     <Link to="/" className="">
     <div className="">
        <Icon fill="#ffffff" size={20} svg="list"/>
       
     </div>
     </Link>
     <Link to="/profile" className="">
     <div className="">
        <Icon fill="#ffffff" size={20} svg="user"/>
      
     </div>
     </Link>
     <Link to="/settings" className="">
     <div className="">
        <Icon fill="#ffffff" size={20} svg="cog"/>
       
     </div>
     </Link>
     <div className="logout" style={{backgroundColor: '#ffffff',padding:5,borderRadius:5,cursor:"pointer"}} onClick={()=>{Moralis.User.logOut().then(()=>{window.location.reload();})}}>Logout</div>

    </div>
  )
}

export default Navbar