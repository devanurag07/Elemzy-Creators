import React, { Component, Fragment } from "react";
import Nav from "../components/Nav";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useAlert } from "react-alert";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";

const fullstyle = {
  padding: "20px",
  marginTop: "40px",
  marginLeft: "200px",
  height: "95vh",
  backgroundColor: "#EEEEEE",
};

const mobilestyle = {
  padding: "20px",
  marginTop: "40px",
  height: "95vh",
  backgroundColor: "#EEEEEE",
};

var mystyle;

// function CheckViewPermissions() {
//   const authstate = useSelector((state) => state);
//   const alert = useAlert();
//   if (authstate.style.mobile) {
//     mystyle = mobilestyle;
//   } else {
//     mystyle = fullstyle;
//   }
//   if (authstate.auth.user) {
//     if (authstate.auth.user.is_superuser) {
//       if (authstate.auth.user.role_id) {
//         if (authstate.auth.permissions) {
//           var check = JSON.parse(authstate.auth.permissions);
//           if (check) {
//             return null;
//           } else {
//             alert.show("Permission denied.");
//             return (
//               <Fragment>
//                 <Redirect to="/admin/dashboard" />
//               </Fragment>
//             );
//           }
//         } else {
//           return <Fragment />;
//         }
//       } else {
//         alert.show("No role assigned. Permission denied.");
//         return (
//           <Fragment>
//             <Redirect to="/" />
//           </Fragment>
//         );
//       }
//     } else {
//       return (
//         <Fragment>
//           <Redirect to="/" />
//         </Fragment>
//       );
//     }
//   } else {
//     return <Fragment />;
//   }
// }

export class Manager extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <div style={mystyle}>
          <h1>Elemzy!</h1>
          <hr />
          <br />
          <h3>Manager dashboard</h3>
          <p>
            Please click on <b>drawer icon</b> to browse.
          </p>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  classes: PropTypes.object.isRequired,
});

export default Manager;
