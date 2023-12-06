import React from "react";
import logo from "../images/logo-removebg-preview.png";
import "./homecard.css";

const HomeCard = ({ from, likes, value, time }) => {
  return (
    <div className="home_card">
      <div className="home_card_header">
        <img src={"https://api.multiavatar.com/zoe.svg"}></img>
        <p>@{from ? from.slice(0, 18) : ""}</p>
        <p>{time}</p>
      </div>
      <div className="home_card_body">
        {value?.startsWith("https") ? <img src={value} /> : value}
      </div>
      <div className="home_card_footer">
        <p>{likes}</p>
      </div>
    </div>
  );
};

export default HomeCard;
