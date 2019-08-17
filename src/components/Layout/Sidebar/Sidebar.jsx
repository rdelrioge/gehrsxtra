import React from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.scss";
import variables from "../../../index.scss";

const Sidebar = () => {
  const logout = () => {
    console.log("Logout");
};

  return (
    <ul>
      <NavLink
        className="li"
        exact
        to="/"
        activeStyle={{ color: variables.primary }}
      >
        <i className="material-icons">event</i>
        <span>Uno</span>
      </NavLink>
      <NavLink
        className="li"
        to="/"
        activeStyle={{ color: variables.primary }}
      >
        <i className="material-icons">people</i>
        <span>Dos</span>
      </NavLink>
      <span className="spacer" />
      <div className="li" onClick={logout}>
        <i className="material-icons">exit_to_app</i>
        <span>Logout</span>
      </div>
    </ul>
  );
};

export default Sidebar;