import React, { Component, Fragment } from "react";

import { useSelector } from "react-redux";
import CreatorDashboard from "../creators/pages/CreatorDashboard";
// import CreatorDashboard from "../creator/pages/CreatorDashboard";
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

const Creator = () => {
  return <Fragment>{<CreatorDashboard />}</Fragment>;
};

export default Creator;
