import React, { Fragment } from "react";
import Sidebar from "../dashboard/components/Sidebar/Sidebar";
import appRoutes from "../dashboard/routes";
import image from "../dashboard/assets/img/sidebarbg.jpg";
import logo from "../dashboard/assets/img/reactlogo.png";
import store from "../store";
import { loadUser } from "../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useAlert } from "react-alert";

const useStyles = makeStyles(styles);

export default function Admin() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const authstate = useSelector((state) => state);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const alert = useAlert();

  import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

  const classes = useStyles();

  // function componentDidMount() {
  //   store.dispatch(loadUser());
  // }

  // componentDidMount();
  if (authstate.auth.user) {
    if (authstate.auth.user.is_superuser) {
      return (
        <div className={classes.wrapper}>
          <Sidebar
            width="20%"
            routes={appRoutes}
            logo={logo}
            image={image}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color="blue"
          />
        </div>
      );
    } else {
      alert.show("Permission denied.");
      return (
        <Fragment>
          <Redirect to="/" />
        </Fragment>
      );
    }
  } else {
    alert.show("Permission denied.");
    return (
      <Fragment>
        <Redirect to="/" />
      </Fragment>
    );
  }
}
