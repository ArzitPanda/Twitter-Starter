import React from 'react'
import './Sidebar.css';
import { Icon } from "web3uikit";
import { Link } from "react-router-dom";
import { useMoralis} from "react-moralis";

const Navbar = () => {


    const {Moralis} =useMoralis();

  return (
    <div className="navContainer">
           
        <Icon fill="#ffffff" size={33} svg="twitter"/>
         <div className="container_nav">
       <Link to="/" className="">
     <div className="">
        <Icon fill="#ffffff" size={23} svg="list"/>
       
     </div>
     </Link>
     <Link to="/profile" className="">
     <div className="">
        <Icon fill="#ffffff" size={23} svg="user"/>
      
     </div>
     </Link>
     <Link to="/settings" className="">
     <div className="">
        <Icon fill="#ffffff" size={23} svg="cog"/>
       
     </div>
     </Link>
         </div>
    
     <div className="logout"  onClick={()=>{Moralis.User.logOut().then(()=>{window.location.reload();})}}>Logout</div>

    </div>
  )
}

export default Navbar