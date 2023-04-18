import React from "react";
import "./HomePage.css";
import MovingText from "../../components/common/MovingText";
import fw from "@assets/svg/FW200.svg";

const HomePage = () => {
  return (
    <div className="App">
      <div className="image-container">
        <img src={fw} alt="fw" className="logo-pic" />
      </div>
      <MovingText />
    </div>
  );
};

export default HomePage;
