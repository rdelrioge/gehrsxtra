import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Fab from "@material-ui/core/Fab";

import "./Dashboard.scss";
import AddServicio from "./AddServicio/AddServicio";

function Dashboard() {
  const [state, setState] = React.useState(false);

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <div className="dashboard">
      <h1>Code or Die</h1>
      <Fab
        color="secondary"
        aria-label="add"
        className="addBtn"
        onClick={toggleDrawer(true)}
      >
        <i className="material-icons">add</i>
      </Fab>
      <SwipeableDrawer
        anchor="top"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <AddServicio onClose={toggleDrawer(false)} />
      </SwipeableDrawer>
    </div>
  );
}

export default Dashboard;
