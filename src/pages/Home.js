import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import {defaultImgs} from "../defaultimgs";
import TweetInFeed from "../components/TweetInFeed"
import {TextArea,Icon} from "web3uikit";
import {useState,useRef} from "react";
import { useMoralis,useWeb3ExecuteFunction } from "react-moralis";

const Home = () => {

    const inputFile= useRef(null);
    const [selectedFile,setSelectedFile] = useState();
    const[theFile,setTheFile]=useState();
    const [tweet,setTweet]=useState();
    const[nft,setNft]=useState(false);

    const {Moralis} =useMoralis();
const contractProcessor = useWeb3ExecuteFunction();
      const onImageClick=()=>{
        inputFile.current.click();
      }
const changeHandler=async (e)=>{


  const img =e.target.files[0];
  setTheFile(img)
  setSelectedFile(URL.createObjectURL(img));
  // console.log(selectedFile);
 
}
// const user =Moralis.User.current();
const user =Moralis.User.current();

    async function saveTweet(value)
    {
        if(!tweet)
        {
          return;
        }
       

        const Tweets =Moralis.Object.extend("Tweets");
        const newTweets = new Tweets(); 

          newTweets.set("tweetText",tweet);
          newTweets.set("tweetAvatar",user.attributes.username+user.attributes.bio);
          newTweets.set("tweetAcc",user.attributes.ethAddress);
          newTweets.set("tweetUserName",user.attributes.username);
          newTweets.set("blockChain",value);
          if(theFile)
          { const data=theFile;
            const file = new Moralis.File(data.name,data);
            await file.saveIPFS();
            newTweets.set("tweetImg",file.ipfs());

          }
          await newTweets.save();
          setNft(false);
          window.location.reload();

    }

async function ethTweet()
{
  if(!tweet) return;

  setNft(true);
  let img;
          if(theFile)
          { const data=theFile;
            const file = new Moralis.File(data.name,data);
            await file.saveIPFS();
            img =file.ipfs();

          }
          else
          {
            img="no img";
          }

let options ={
  contractAddress:"0xccb3d95f717706963db17b5082f81c5b387277cd",
  functionName:"addTweet",
  abi:[{
		"inputs": [
			{
				"internalType": "string",
				"name": "tweetTxt",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tweetImg",
				"type": "string"
			}
		],
		"name": "addTweet",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}],
  params:{
    tweetTxt:tweet,
    tweetImg:img,
  },
  msgValue:Moralis.Units.ETH(".0000001")
}

await contractProcessor.fetch({
params:options,
onSuccess:()=>{saveTweet(true)},
onError:(error)=>console.log(error.data.message)


});





}


  return (
    <>
    <div className="pageIdentify">Home</div>
     <div className="mainContent">
        <div className="profileTweet">
          <img src={user.attributes.username?`https://avatars.dicebear.com/api/adventurer/${user.attributes.username+user.attributes.bio}.svg`:defaultImgs[0]} className="profilePic" ></img>
          <div className="tweetBox">
            <TextArea
            label=""
            name="tweetextarea"
            value="hello arz"
            type="text"
            width="95%"
              onChange={(e)=>setTweet(e.target.value)}
            
            />
            {selectedFile && (<img src={selectedFile} className="tweetImg"/>)}
          <div className="imgOrTweet">

            <div className="imgDiv" onClick={onImageClick}>
              <input
              type="file"
              name="file"
              ref={inputFile}
              onChange={changeHandler}
              style={{display: 'none'}}/>
              <Icon fill="#1DA1F2" size={20} svg="image"></Icon>


            </div>
            <div className="tweetOptions">
                <div className="tweet" onClick={()=>saveTweet(false)}>Tweet</div>
                <div className="tweet" style={{backgroundColor:"#8247e5"}}  onClick={ethTweet}>
                  <Icon fill="#ffffff" size={20} svg="eth"/>

                </div>
            </div>


          </div>

          </div>
        </div>


      <TweetInFeed profile={false}/>
     </div>
    </>
  );
};

export default Home;
