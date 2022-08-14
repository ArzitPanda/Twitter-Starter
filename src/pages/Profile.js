import React from "react";
import { Link, NavLink } from "react-router-dom";
import TweetInFeed from "../components/TweetInFeed";
import { defaultImgs } from "../defaultimgs";
import './Profile.css';
import { useMoralis } from "react-moralis";

const Profile = () => {
  
  const {isAuthenticated,Moralis} =useMoralis();
  const user =Moralis.User.current();
  return (
    <>
    <div className="pageIdentify">Profile</div>
    <img src={user.attributes.banner?user.attributes.banner:defaultImgs[1]} className="profileBanner"/>
    <div className="pfpContainer">
      <img className="profilePFP" src={user.attributes.username?`https://avatars.dicebear.com/api/adventurer/${user.attributes.username+user.attributes.bio}.svg?background=%23${Math.floor(Math.random()*16777215).toString(16)}`:defaultImgs[0]}/>
      <div className="profileName">{user.attributes.username.slice(0,6)}</div>
      <div className="profileWallet">{`${user.attributes.ethAddress.slice(0,4)}...${user.attributes.ethAddress.slice(38)}`}</div>
      <Link to="/settings">
        <div className="profileEdit">Edit profile</div>
      </Link>
      <div className="profileBio">
            jiwan andhar
      </div>
      <div className="profileTabs">
          <div className="profileTab">
              Your Tweets

          </div>

      </div>
    </div>
    <TweetInFeed profile={true}/>
    </>
  );
};

export default Profile;

