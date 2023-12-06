// App.js

import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Messages from "./Pages/Messages";
import Sidebar from "./Components/Sidebar";
import { Web3provider } from "./api/contextapi"; // Import your Web3Provider
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <Web3provider>
      <Router>
        <div className="app-container">
          <div className="main-content">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <div className="gradient__bg">
                      <Sidebar />
                    </div>
                    <Home />
                  </>
                }
              />
              <Route
                exact
                path="/messages"
                element={
                  <>
                    <div className="gradient__bg">
                      <Sidebar />
                    </div>
                    <Messages />
                  </>
                }
              />

              <Route
                exact
                path="/profile"
                element={
                  <>
                    <div className="gradient__bg">
                      <Sidebar />
                    </div>
                    <Profile />
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </Web3provider>
  );
};

export default App;
