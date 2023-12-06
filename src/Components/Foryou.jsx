import React, { useState, useEffect } from "react";
import HomeCard from "./HomeCard";
import { useWeb3 } from "../api/contextapi";

const Foryou = () => {
  const [tweetlist, setTweetList] = useState([]);

  const { account, setAccount, provider, setProvider, contract, setContract } =
    useWeb3();

  const latestTweet = async () => {
    try {
      const array = await contract.getAllTweets();
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

  useEffect(() => {
    contract && latestTweet();
  }, [provider, contract]);

  return (
    <div>
      {/* <HomeCard />
      <HomeCard />
      <HomeCard />
      <HomeCard />
      <HomeCard /> */}
      {tweetlist?.slice().reverse().map((k) => {
        return (
          <HomeCard
            from={k.from}
            likes={k.likes}
            value={k.value}
            time={k.time}
          />
        );
      })}
    </div>
  );
};

export default Foryou;
