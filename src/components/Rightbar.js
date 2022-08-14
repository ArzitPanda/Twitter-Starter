import React from "react";
import './Rightbar.css';
import spaceshooter from "../images/spaceshooter.jpeg";
import netflix from "../images/netflix.jpeg";
import academy from "../images/academy.png";
import youtube from "../images/youtube.png";
import js from "../images/js.png";
import {Input} from "web3uikit";
import { useEffect } from "react";
import { useState } from "react";


const Rightbar = () => {
const[search,setSearch] =useState("twitter");
const[searcharr,setSearchArr] =useState([]);

useEffect(() => {
 const newsFetch =async ()=>{

  const data= await fetch(`https://newsapi.org/v2/everything?q=${search}&sortBy=popularity&apiKey=7c17fbb17b284775beb5c74048b9a6cf`)
      data.json().then(res=>{console.table(res.articles.slice(0,5));setSearchArr(res.articles.slice(0,3))});

 }
 newsFetch();

 
}, [search])


  const trends = [
    {
      img: spaceshooter,
      text: "Learn how to build a Web3 FPS game using unity...",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-space-fps-game/",
    },
    {
      img: netflix,
      text: "The fisrt Moralis Project! Let's Netflix and chill...",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-netflix-clone/",
    },
    {
      img: academy,
      text: "Master DeFi in 2022. Start  at the Moralis Academy...",
      link: "https://academy.moralis.io/courses/defi-101",
    },
    {
      img: js,
      text: "Become a Web3 Developer with just simple JS...",
      link: "https://academy.moralis.io/all-courses",
    },
    {
      img: youtube,
      text: "Best youtube channel to learn about Web3...",
      link: "https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw",
    },
  ];

  return (
    <>
    <div className="rightbarContent">
      <Input
          label="search"
          name="search Twitter"
          prefixIcon="search"
          labelBgColor="#141d26"
          onChange={(e)=>setSearch(e.target.value)}

      ></Input>
        <div className="trends">
          News For you
          {searcharr.map((ele,key)=>{
            return(
            
            
            < >
              <div className="trend" onClick={()=>window.open(ele.url)
              }>
                <img src={ele.urlToImage} className="trendImg"/>
                <div className="trendText">{ele.title}</div>

              </div>
          
          
          </>
          
          
          )})}
        </div>
    </div>
    </>
  );
};

export default Rightbar;

