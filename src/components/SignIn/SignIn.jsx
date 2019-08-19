import React, { useState } from "react";
import firebase from "firebase/app";
import {
  Card,
  FormControl,
  InputLabel,
  Input,
  Button,
  CardHeader
} from "@material-ui/core";

import "./SignIn.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(null);

  const handleSubmit = ev => {
    ev.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setAuthError(null);
      })
      .catch(err => {
        setAuthError(err.message);
      });
  };

  return (
    <div className="signin">
      <h1>GE Horas Extra</h1>
      <Card className="card">
        <CardHeader title="Sign In" className="cardheader" />
        <form onSubmit={handleSubmit}>
          <FormControl
            className="emailinput"
            margin="normal"
            required
            fullWidth
          >
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl
            className="passwordInput"
            margin="normal"
            required
            fullWidth
          >
            <InputLabel className="passLabel" htmlFor="password">
              Password
            </InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          {authError ? <p className="errormsg">{authError}</p> : null}
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign in
          </Button>
        </form>
      </Card>
      <p>
        <strong>Developed by RDRP</strong>
      </p>
    </div>
  );
};

export default SignIn;
