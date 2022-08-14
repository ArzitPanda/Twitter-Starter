import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Settings.css';
import {Input} from "web3uikit"
import pfp1 from "../images/pfp1.png"
import pfp2 from "../images/pfp2.png"
import pfp3 from "../images/pfp3.png"
import pfp4 from "../images/pfp4.png"
import pfp5 from "../images/pfp5.png"
import { useRef } from "react";
import { defaultImgs } from "../defaultimgs";
import { useMoralis } from "react-moralis";
const Settings = () => {
  
  const {isAuthenticated,Moralis} =useMoralis();
const pfps=[,pfp1,pfp2,pfp3, pfp4,pfp5]
const [selectedPFP,setSelectedPFP]=useState();
const inputFile=useRef();
const [selectedFile,setSelectedFile] = useState(defaultImgs[1]);
const [thisFile,setThisFile] = useState();
const[userName,setUserName] = useState();
const[img,setImg] = useState();
const [bio,setBio]=useState();
const onBannerClick=()=>{
  inputFile.current.click();
}
const changeHandler=(e)=>{


  const img =e.target.files[0];
  setThisFile(img);
  setSelectedFile(URL.createObjectURL(img));
  console.log(selectedFile);
}

const saveEdits = async ()=>{
  const User= Moralis.Object.extend("_User");
  const query= new Moralis.Query(User);
  const myDetails =await query.first();

    if(bio)
    {
      myDetails.set("bio",bio);
    }
    if(userName)
    {
      myDetails.set("username",userName);

    }
    if(thisFile)
    {
      const data =thisFile;
      const file= new Moralis.File(data.name,data);
      await file.saveIPFS();
      myDetails.set("banner",file.ipfs())
    }
    await myDetails.save();
    window.location.reload();


}


  return (
    <>
    <div className="pageIdentify">Settings</div>
    <div className="settingsPage">
        <Input
            type="text"
            name="NameChange"
            label="Name"
            width="100%"
            labelBgColor="#141d26"
            onChange={(e)=>setUserName(e.target.value)}
        
        />
        <Input
            type="text"
            name="bioChange"
            label="Bio"
            width="100%"
            labelBgColor="#141d26"
            onChange={(e)=>setBio(e.target.value)}
        
        />

      <div className="pfp">
        Profile Image (Your NFTs)

        <div className="pfpOptions">
          
          <img src={`https://avatars.dicebear.com/api/adventurer/${userName+bio}.svg`} className="pfpOption"/>
          
          
          
        

        </div>


      </div>
      <div className="pfp">
        Profile Banner

        <div className="pfpOptions">
         <img src={selectedFile} onClick={onBannerClick}
         className="banner"/>
          <input type="file" name="file" ref={inputFile} onChange={changeHandler} style={{display: 'none'}}/>
        </div>


      </div>
          <div className="save" onClick={()=>saveEdits()}>
            Save
          </div>

    </div>
    </>
  );
};

export default Settings;

