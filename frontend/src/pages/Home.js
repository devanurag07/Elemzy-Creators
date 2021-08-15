import Nav from "../components/Nav";
import React, { Component, Fragment } from "react";

const mystyle = {
  padding: "100px",
  marginTop: "60px",
  height: "95vh",
  backgroundColor: "#EEEEEE",
  textAlign: "center",
};

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <div style={mystyle}>
          <h1>Reon registration portal</h1>
          <hr />
          <br />
          <h3>Home page</h3>
          <p>
            Please click on <b>drawer icon</b> to browse.
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Home;
