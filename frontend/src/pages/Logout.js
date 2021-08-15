import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { logout } from "../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Nav from "../components/Nav";

const mystyle = {
  padding: "20px",
  marginTop: "40px",
  height: "95vh",
  backgroundColor: "#EEEEEE",
  textAlign: "center",
};

export default function Logout() {
  const dispatch = useDispatch();
  const authstate = useSelector((state) => state);

  if (!authstate.auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  function getout() {
    dispatch(logout());
    return null;
  }

  return (
    <Fragment>
      <Nav />
      <div style={mystyle}>
        <h1>Do you want to Log out?</h1>
        <Button
          type="button"
          onClick={() => getout()}
          variant="contained"
          color="primary"
        >
          Logout
        </Button>
      </div>
    </Fragment>
  );
}
