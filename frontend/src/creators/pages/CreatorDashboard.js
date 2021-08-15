import React from "react";
import Sidebar from "../components/Sidebar";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import AddCoursePage from "./AddCoursePage";
import Home from "./Home";

const useStyles = makeStyles((theme) => ({
  root: {},
  mainContent: {
    marginLeft: "150px",
    boxShadow: "1px 0px 6px 0px grey",
    minHeight: "100vh",
  },
}));

const CreatorDashboard = () => {
  const classes = useStyles();
  return (
    <div>
      <div className="dashboard">
        <Sidebar />

        <div className={classes.mainContent}>
          <Switch>
            <Route path="/creator/dashboard">{<Home />}</Route>

            <Route path="/creator/courses">Courses</Route>

            <Route path="/creator/addcourse">
              <AddCoursePage />
            </Route>

            <Route path="/creator/settings">Settings</Route>

            <Route path="/creator/support">Support</Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
