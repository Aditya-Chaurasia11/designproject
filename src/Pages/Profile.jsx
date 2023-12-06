import React, { useState, useEffect } from "react";
import "./profile.css";
import { useWeb3 } from "../api/contextapi";
import HomeCard from "../Components/HomeCard";

const Profile = () => {
  const [tweetlist, setTweetList] = useState([]);
  

  const { account, setAccount, provider, setProvider, contract, setContract } =
    useWeb3();
  const addresses = [
    "0xfddd2b8d9aaf04fa583ccf604a2de12668200582",
    "0x6851d695456c85409fb52619aec75d6f819b83c2",
    "0x671e5d781154d973b4adca5c0674a13abe2b9f19",
  ];
  const [noFollowers, setFollowers] = useState(0);
  const [noFollowing, setFollowing] = useState(0);


  const getAllfollowing = async () => {
    try {
      const array = await contract?.getAllfollowing();
      const array2 = await contract?.getAllFollowers();
      //   console.log("all followers", array.toString());
      const formattedArray = array.map((value) => ({
        list: value.toString(),
      }));

      const formattedArray2 = array2.map((value) => ({
        list: value.toString(),
      }));

      console.log(formattedArray);
      //   console.log('following',array);
      setFollowers(formattedArray.length);
      setFollowing(formattedArray2.length)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    contract && getAllfollowing();
  }, [account, provider, contract]);

  const latestTweet = async () => {
    try {
      const array = await contract.getLatestofUser(account, 2);
      const arrayToString = array.toString();
      //   console.log(arrayToString);

      const formattedArray = array.map((value, index) => ({
        id: value.toString().split(",")[0],
        from: value.toString().split(",")[1],
        value: value.toString().split(",")[2],
        time: new Date(value.toString().split(",")[3] * 1000).toLocaleString(),
        likes: value.toString().split(",")[4],
      }));

      setTweetList(formattedArray);
      console.log(formattedArray);
      //   console.log(array);
    } catch (error) {
      console.log(error);
    }
  };

  const followHandler = async (id) => {
    try {
      if (id !== "") {
        await contract.follow(id);
      }
    } catch (error) {
      console.log("heke", error.reason);
      alert(error.reason);
    }
  };

  useEffect(() => {
    contract && latestTweet();
  }, [provider, contract]);

  return (
    <div className="profile_container">
      <div className="profile_container_left">
        <div className="profile_container_header">
          <img src={"https://api.multiavatar.com/zoe.svg"}></img>
          <div>
            <p className="profile_name">{account.slice(0, 15)}</p>
            <p>{noFollowers} Following {noFollowing} Followers</p>
          </div>
        </div>
        <div className="profile_container_body">
          <div>
            {tweetlist
              ?.slice()
              .reverse()
              .map((k) => {
                return (
                  <HomeCard
                    from={k.from}
                    // likes={k.likes}
                    value={k.value}
                    time={k.time}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className="home_container_right">
        <input type="text" placeholder="search"></input>
        <div className="subscribe">
          <h2>Subscribe to Premium</h2>
          <p>
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <button className="subscribe_button">Subscribe</button>
        </div>
        <div className="who_to_follow">
          <h2>Who to follow</h2>

          {addresses.map((k) => (
            <div className="who_to_follow_container">
              <img src={"https://api.multiavatar.com/zoe.svg"}></img>
              <div className="who_to_follow_container_container">
                <p>@{k.slice(0, 25)}</p>
                <button
                  onClick={() => {
                    followHandler(k);
                  }}
                >
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
