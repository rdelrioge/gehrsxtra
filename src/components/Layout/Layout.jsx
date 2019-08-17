import React from "react";
import { Link } from "react-router-dom";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import Titlebar from "./Titlebar/Titlebar";
import LayoutRouter from "./LayoutRouter";
/* Styles */
import "./Layout.scss";

function Layout() {
  const [value, setValue] = React.useState("dashboard");

  function handleChange(event, newValue) {
    console.log(newValue);
    setValue(newValue);
  }

  return (
    <div className="layout">
      <Titlebar />
      <div className="main">
        <LayoutRouter />
      </div>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className="navbar"
      >
        <BottomNavigationAction
          component={Link}
          to="/historial"
          label="Historial"
          value="historial"
          icon={<i className="material-icons">event</i>}
        />
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Dashboard"
          value="dashboard"
          icon={<i className="material-icons">dashboard</i>}
        />
      </BottomNavigation>
    </div>
  );
}

export default Layout;
