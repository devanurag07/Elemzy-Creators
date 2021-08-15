import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { login } from "../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Nav from "../components/Nav";

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
    marginTop: theme.spacing(12),
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

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authstate = useSelector((state) => state);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    dispatch(login(email, password));
  }

  const alert = useAlert();
  if (authstate.auth.isAuthenticated) {
    if (authstate.auth.user.is_student) {
      if (authstate.auth.user.firstname) {
        alert.show("Logged in as " + authstate.auth.user.firstname);
      }
      return (
        <Fragment>
          <Redirect to="/student" />
        </Fragment>
      );
    } else if (authstate.auth.user.is_creator) {
      if (authstate.auth.user.firstname) {
        alert.show(
          "Logged in as " + authstate.auth.user.firstname + " Creator"
        );
      }
      return (
        <Fragment>
          <Redirect to="/creator" />
        </Fragment>
      );
    } else if (authstate.auth.user.is_manager) {
      if (authstate.auth.user.firstname) {
        alert.show("Logged in as " + authstate.auth.user.firstname);
      }
      return (
        <Fragment>
          <Redirect to="/manager" />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Redirect to="/" />
        </Fragment>
      );
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Nav />
      <div className={classes.paper}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <form className={classes.form} onSubmit={onSubmit}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
