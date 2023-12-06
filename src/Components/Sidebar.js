import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";
import logo from "../images/logo-removebg-preview.png";
import { useWeb3 } from "../api/contextapi";
import * as toxicity from "@tensorflow-models/toxicity";

const Sidebar = () => {
  const threshold = 0.9;

  const handlePrediction = (text) => {
    // Load the toxicity model
    // toxicity
    //   .load(threshold)
    //   .then((model) => {
    //     const sentences = text;
    //     model
    //       .classify(sentences)
    //       .then((predictions) => {
    //         console.log(predictions);
    //         const overallToxicity = predictions.some(
    //           (prediction) => prediction.results[0].match
    //         );
    //         console.log(overallToxicity);
    //         return overallToxicity;
    //       })
    //       .catch((err) => {
    //         console.error("Prediction error:", err);
    //       });
    //   })
    //   .catch((err) => {
    //     console.error("Model loading error:", err);
    //   });
  };

  const { account, setAccount, provider, setProvider, contract, setContract } =
    useWeb3();

  const [showModal, setShowModal] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    // setFileName(e.target.files[0].name);
    // console.log();
    e.preventDefault();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tweet !== "") {
      toxicity
        .load(threshold)
        .then((model) => {
          const sentences = tweet;

          model
            .classify(sentences)
            .then(async (predictions) => {
              console.log(predictions);
              const overallToxicity = predictions.some(
                (prediction) => prediction.results[0].match
              );
              if (!overallToxicity) {
                const txn = await contract.tweet(tweet);
                await txn.wait();
                alert("successfull tweet");
              } else {
                alert("this tweet harmful");
              }
              setShowModal(false);
            })
            .catch((err) => {
              console.error("Prediction error:", err);
            });
        })
        .catch((err) => {
          console.error("Model loading error:", err);
        });

      // setTransactionStatus("Pending");
      // const txn = await contract.tweet(tweet);
      // await txn.wait();
      // alert("successfull tweet");
      // setTransactionStatus("");
    } else if (file) {
      // setTransactionStatus("Pending");
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `a6af8df80fd5fed0f834`,
            pinata_secret_api_key: `b81259813613122b630b2dec8ae769371d807941aa69dd59fc2f50aa16ec892b`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        setShowModal(false);

        await contract.tweet(ImgHash);
        alert("successfully img uploaded");
        // setFileName("no image selected");

        // setFile(null);
      } catch (error) {
        alert("unable to upload");
        console.log(error);
      }
      // setTransactionStatus("");
    } else {
      alert("input is empty");
    }
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
  }, [showModal]);

  return (
    <div className="sidebar">
      <Link to="/">
        <div className="logo">
          <img src={logo}></img>
        </div>
      </Link>
      <ul>
        <li>
          <Link to="/" className="link" activeClassName="active">
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" className="link" activeClassName="active">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/notifications" className="link" activeClassName="active">
            Notifications
          </Link>
        </li>
        <li>
          <Link to="/messages" className="link" activeClassName="active">
            Messages
          </Link>
        </li>
        <li>
          <button className="post_button" onClick={handleOpenModal}>
            Post
          </button>

          {showModal && (
            <div className="modal" style={{ display: "block" }}>
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
                style={{ marginTop: "1%" }}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Post a tweet</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleCloseModal}
                      style={{ color: "#fff", fontSize: "1.5rem" }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      onChange={(e) => setTweet(e.target.value)}
                    />
                    <h4>or</h4>
                    <input
                      disabled={!account}
                      type="file"
                      onChange={retrieveFile}
                      name="data"
                    ></input>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </li>
      </ul>
      <div className="profile">
        <img src={"https://api.multiavatar.com/zoe.svg"}></img>
        <p>{account.slice(0, 15)}</p>
      </div>
    </div>
  );
};

export default Sidebar;
