import React from "react";
import { Link } from "react-router-dom";

import "./Titlebar.scss";
import defaultPP from "../../../assets/pp.png";

function Titlebar() {

  const logout = () => {
        console.log("Logout");
  };

  return (
    <div className="titlebar">
      <div className="brand-logo">
        <Link to="/">
          <h3>GE Horas Extra</h3>
        </Link>
      </div>
      <span className="spacer" />
      <div className="user" onClick={logout}>
        <p> Ricardo Del Rio </p>
        <img src={defaultPP} alt="PP" />
      </div>
    </div>
  );
};

export default Titlebar;