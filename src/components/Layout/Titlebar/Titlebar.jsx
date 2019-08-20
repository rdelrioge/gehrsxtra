import React from "react";
import firebase from "firebase/app";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./Titlebar.scss";
import defaultPP from "../../../assets/pp.png";

function Titlebar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function openProfileMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function logout() {
    firebase.auth().signOut();
  }

  return (
    <div className="titlebar">
      <div className="brand-logo">
        <div>
          <h3>GE Horas Extra</h3>
        </div>
      </div>
      <span className="spacer" />
      <div className="user" onClick={openProfileMenu}>
        <p> Ricardo Del Rio </p>
        <img src={defaultPP} alt="PP" />
      </div>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose && logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default Titlebar;
