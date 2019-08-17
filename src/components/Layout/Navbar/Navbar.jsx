import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";
import defaultPP from "../../../assets/pp.png";

const Navbar = props => {

  const logout = () => {
        console.log("Logout");
  };

  return (
    <div className="navbar">
      <i className="material-icons" onClick={props.onChange}>
        menu
      </i>
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

export default Navbar;