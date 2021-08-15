import React, { useState, useEffect, Fragment, Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createMessage } from "../actions/messages";
import { registerManager } from "../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";

import Nav from "../components/Nav";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Reon
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
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
  formControl: {
    margin: theme.spacing(0),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

// var userCountry;

// export class Dropdown extends Component {
//   state = {
//     loadingCountries: true,
//     dataCountries: null,
//   };

//   async componentDidMount() {
//     console.log("register");
//     const response2 = await fetch("/api/countries/");
//     const res_json2 = await response2.json();
//     this.setState({ dataCountries: res_json2, loadingCountries: false });
//   }

//   render() {
//     if (this.state.loadingCountries) {
//       return <p>Loading...</p>;
//     } else {
//       const { country = null } = this.state;
//       return (
//         <Grid item xs={12}>
//           <Autocomplete
//             fullWidth
//             name="country"
//             id="id_country_update"
//             options={this.state.dataCountries}
//             getOptionLabel={(option) =>
//               option.country_name ? option.country_name : option
//             }
//             value={country}
//             onChange={(e, v) => this.setCountry(e, v)}
//             renderInput={(params) => (
//               <TextField {...params} label="Country" variant="outlined" />
//             )}
//           />
//         </Grid>
//       );
//     }
//   }
// }

export default function RegisterManager() {
  const dispatch = useDispatch();
  const authstate = useSelector((state) => state);
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone_number, setphone_number] = useState("");
  const classes = useStyles();
  const [birthdate, handleDateChange] = useState(new Date());

  function onSubmit(e) {
    e.preventDefault();
    var bdate =
      "" +
      birthdate.getFullYear().toString() +
      "-" +
      birthdate.getMonth().toString() +
      "-" +
      birthdate.getDate().toString();

    if (password !== password2) {
      dispatch(createMessage({ passwordNotMatch: "Passwords do not match" }));
    } else {
      const newUser = {
        title,
        firstName,
        lastName,
        email,
        password,
        bdate,
        phone_number,
      };
      dispatch(registerManager(newUser));
    }
  }

  if (authstate.auth.isAuthenticated) {
    dispatch(logout());

    return (
      <Fragment>
        <Redirect to="/login" />
      </Fragment>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Nav />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="id_firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="id_lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="id_email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="id_password2"
                autoComplete="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} container justify="center">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Birthdate"
                  format="MM/dd/yyyy"
                  value={birthdate}
                  name="birthdate"
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => {
                    handleDateChange(date);
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="id_phone_number"
                label="Phone Number"
                name="phone_number"
                type="number"
                autoComplete="phone"
                value={phone_number}
                onChange={(e) => setphone_number(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <Dropdown />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register Manager
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
