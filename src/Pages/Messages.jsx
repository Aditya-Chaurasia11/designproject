import React, { useState, useEffect } from "react";
import "./messages.css";
import Conversation from "../Components/Conversation";
import { useWeb3 } from "../api/contextapi";

const Messages = () => {
  const { account, setAccount, provider, setProvider, contract, setContract } =
    useWeb3();

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [followingList, setFollowingList] = useState([]);

  const getAllfollowing = async () => {
    try {
      const array = await contract?.getAllfollowing();
      //   console.log("all followers", array.toString());
      const formattedArray = array.map((value) => ({
        list: value.toString(),
      }));
      console.log(formattedArray);
      //   console.log('following',array);
      setSelectedPerson(formattedArray?.list);
      setFollowingList(formattedArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    contract && getAllfollowing();
  }, [contract]);

  return (
    <div className="messages_container">
      <div>
        <span>Messages</span>
      </div>
      <div className="messages_container_container">
        <div className="messages_container_left">
          {followingList?.map((k) => (
            <div
              className="messages_container_left_person"
              onClick={() => handlePersonClick(`${k.list}`)}
            >
              <img src={"https://api.multiavatar.com/zoe.svg"}></img>

              <p key={k.list}>{k.list.slice(0, 15)}</p>
            </div>
          ))}

          {/* <p onClick={() => handlePersonClick("a")}>Alice</p>
          <p onClick={() => handlePersonClick("b")}>Bob</p>
          <p onClick={() => handlePersonClick("c")}>Alice</p>
          <p onClick={() => handlePersonClick("d")}>Bob</p>
          <p onClick={() => handlePersonClick("e")}>Alice</p>
          <p onClick={() => handlePersonClick("f")}>Bob</p> */}
        </div>
        <div className="messages_container_right">
          {selectedPerson && <Conversation name={selectedPerson} />}
        </div>
      </div>
    </div>
  );
};

export default Messages;
