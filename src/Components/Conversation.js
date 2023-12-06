import React, { useEffect, useState } from "react";
import { useWeb3 } from "../api/contextapi";
import "./conversation.css";

const Conversation = ({ name }) => {
  const [message, setMessage] = useState("");
  const { account, setAccount, provider, setProvider, contract, setContract } =
    useWeb3();

  const [messageArray, setMessageArray] = useState([]);

  const messages = async () => {
    const array = await contract.getAllConversation(name);
    console.log("message ", array);
    const formattedArray = array.map((value, index) => ({
      id: value.toString().split(",")[0],
      value: value.toString().split(",")[1],
      from: value.toString().split(",")[2],
      to: value.toString().split(",")[3],
      time: new Date(value.toString().split(",")[4] * 1000).toLocaleString(),
      likes: value.toString().split(",")[3],
    }));
    console.log(formattedArray);
    setMessageArray(formattedArray);
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      if (message !== "" && name !== "") {
        await contract.sendMessage(message, name);
        alert("message sent");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    contract && messages();
  }, [contract, name]);

  return (
    <div className="coversation">
      <div className="con_name">{name}</div>
      <div className="conversation_container">
        {messageArray.map((k) => (
          <div className={`message ${k.from === account ? "right" : "left"}`}>
            <p className="conversation_container_data">{k.value}</p>
            <p className="conversation_container_time">{k.time}</p>
          </div>
        ))}
      </div>
      <div className="conversation_button">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button onClick={handleMessageSubmit}>Send</button>
      </div>
    </div>
  );
};

export default Conversation;
