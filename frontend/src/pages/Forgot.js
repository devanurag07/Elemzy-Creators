import React, { useState } from "react";
import Nav from "../components/Nav";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { sendReset, passwordReset } from "../actions/auth";
import { useDispatch } from "react-redux";
import { createMessage } from "../actions/messages";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Reon{" "}
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Forgot() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (password !== password2) {
      dispatch(createMessage({ passwordNotMatch: "Passwords do not match." }));
    } else {
      dispatch(passwordReset(token, password));
    }
  }

  function onClick() {
    dispatch(sendReset(email));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Nav />
      <div className={classes.paper}>
        <h1 style={{ textAlign: "center" }}>Password Reset</h1>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="id_email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => onClick()}
          className={classes.submit}
        >
          Send email
        </Button>
        <p>
          Paste the <b>reset key</b> recieved in the provided email.
        </p>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="id_token"
            label="Reset Key"
            name="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="id_password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm Password"
            type="password"
            id="id_password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset password
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
