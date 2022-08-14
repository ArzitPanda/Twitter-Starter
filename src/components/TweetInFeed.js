import React, { useRef, useState,useEffect } from "react";
import { defaultImgs } from "../defaultimgs";
import './TweetInFeed.css';
import golf from "../images/golf.png";
import canoe from "../images/canoe.png";
import {Icon} from "web3uikit";
import { useMoralis } from "react-moralis";

const TweetInFeed = ({profile}) => {
  
const iconRef=useRef();
const {Moralis,account} =useMoralis();
const user=Moralis.User.current();

const [tweetArr,setTweetArr]=useState([]);

useEffect(() => {
    async function getTweets(){
        try {
          
            const Tweets =Moralis.Object.extend("Tweets");
            const query = new Moralis.Query(Tweets);
              if(profile)
                {
                    query.equalTo("tweetAcc",account)
                }
                const results = await query.find();
                setTweetArr(results);
                console.log(results);


        } catch (error) {
          console.log(error);
        }




    }
    getTweets();
  
}, [profile])



  return (
    <>
      {tweetArr.map((tweet)=>{return(

<div className="feedTweet" style={{backgroundColor: tweet.attributes.blockChain?"#1B1212":""}}>
<img src={tweet.attributes.tweetAvatar?`https://avatars.dicebear.com/api/adventurer/${tweet.attributes.tweetAvatar}.svg`:defaultImgs[0]} className="profilePic"/>
<div className="completeTweet">
  <div className="who">{tweet.attributes.tweetUserName.slice(0,6)}</div>
  <div className="accWhen">
      {`${tweet.attributes.tweetAcc.slice(0,4)}...${tweet.attributes.tweetAcc.slice(38)} . 
          ${tweet.attributes.createdAt.toLocaleString('en-us',{month:'short'})}
          ${tweet.attributes.createdAt.toLocaleString('en-us',{day:'numeric'})}
          


      `}
  </div>

</div>
<div className="tweetContent">
{tweet.attributes.tweetText}

{tweet.attributes.tweetImg && (
<img src={tweet.attributes.tweetImg} className="tweetImg"></img>
)}


</div>
<div className="interactions">
    <div className="interactionNums">
      <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
    </div>
    <div className="interactionNums">
      <Icon fill="#3f3f3f" size={20} svg="star"/>
      12
    </div>
    <div className="interactionNums">
      <Icon fill="#3f3f3f" size={20} svg="matic"/>
    </div>



</div>
</div>


      )}).reverse()}
   
    </>
  );
};

export default TweetInFeed;

