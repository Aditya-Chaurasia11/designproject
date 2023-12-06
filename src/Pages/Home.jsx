import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./home.css";
import Foryou from "../Components/Foryou";
import Following from "../Components/Following";
import { useWeb3 } from "../api/contextapi";
import TwitterContract from "../abi.json";

const Home = () => {
  

  const { account, setAccount, provider, setProvider, contract, setContract } =
    useWeb3();

  const addresses = [
    "0xfddd2b8d9aaf04fa583ccf604a2de12668200582",
    "0x6851d695456c85409fb52619aec75d6f819b83c2",
    "0x671e5d781154d973b4adca5c0674a13abe2b9f19",
  ];

  useEffect(() => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const loadProvider = async () => {
        if (provider) {
          window.ethereum.on("chainChanged", () => {
            // Chain has changed, so reload the page
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            // Accounts have changed, so reload the page
            window.location.reload();
          });

          await provider.send("eth_requestAccounts");
          const signer = await provider.getSigner();
          const address = await signer.getAddress();

          setAccount(address);
          let contractAddress = "0xD5EE9Dc3Fe7E2BfEbfa5c79A9467270d2873a9A1";
          // let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

          const contract = new ethers.Contract(
            contractAddress,
            TwitterContract.abi,
            signer
          );

          console.log(contract);
          setContract(contract);
          setProvider(provider);
        } else {
          alert("Metamask not installed");
        }
      };
      provider && loadProvider();
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  const address = "0xD5EE9Dc3Fe7E2BfEbfa5c79A9467270d2873a9A1";

  const [activeComponent, setActiveComponent] = useState("component1");

  const showComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="home">
      <div className="home_container">
        <div  className="home_container_left">
          <div id="nav1" className="home_nav_div_container">
            <p
              onClick={() => showComponent("component1")}
              className={activeComponent === "component1" ? "active" : ""}
            >
              For you
            </p>
            <p
              onClick={() => showComponent("component2")}
              className={activeComponent === "component2" ? "active" : ""}
            >
              Following
            </p>
          </div>

          <div
            id="component1"
            style={{
              display: activeComponent === "component1" ? "block" : "none",
            }}
          >
            <Foryou />
          </div>

          <div
            id="component2"
            style={{
              display: activeComponent === "component2" ? "block" : "none",
            }}
          >
            <Following />
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

          {/* <div className="who_to_follow_container">
            <img src={"https://api.multiavatar.com/zoe.svg"}></img>
            <div className="who_to_follow_container_container">
              <p>@{address.slice(0, 25)}</p>
              <button>Follow</button>
            </div>
          </div>

          <div className="who_to_follow_container">
            <img src={"https://api.multiavatar.com/zoe.svg"}></img>
            <div className="who_to_follow_container_container">
              <p>@{address.slice(0, 25)}</p>
              <button>Follow</button>
            </div>
          </div>

          <div className="who_to_follow_container">
            <img src={"https://api.multiavatar.com/zoe.svg"}></img>
            <div className="who_to_follow_container_container">
              <p>@{address.slice(0, 25)}</p>
              <button>Follow</button>
            </div>
          </div>

          <div className="who_to_follow_container">
            <img src={"https://api.multiavatar.com/zoe.svg"}></img>
            <div className="who_to_follow_container_container">
              <p>@{address.slice(0, 25)}</p>
              <button>Follow</button>
            </div>
          </div>

          <div className="who_to_follow_container">
            <img src={"https://api.multiavatar.com/zoe.svg"}></img>
            <div className="who_to_follow_container_container">
              <p>@{address.slice(0, 25)}</p>
              <button>Follow</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
