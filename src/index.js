import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

// Firebase
import firebase from "firebase/app";
import fbconfig from "./fbconfig";
import "firebase/auth";
import "firebase/firestore";

import "./index.scss";
import App from "./App";
import NoSigned from "./NoSigned";

export const fb = firebase.initializeApp(fbconfig);
export const db = fb.firestore();

fb.auth().onAuthStateChanged(user => {
  if (user) {
    ReactDOM.render(<App />, document.getElementById("root"));
    serviceWorker.register();
  } else {
    ReactDOM.render(<NoSigned />, document.getElementById("root"));
    serviceWorker.register();
  }
});
