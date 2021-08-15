import { makeStyles } from "@material-ui/core";
import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { Link } from "react-router-dom";
import { MAIN_COLOR, SECONDARY_COLOR } from "../useFulFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    padding: "1em",
    position: "fixed",
    top: "0",

    "& .MuiListItem-button": {
      paddingLeft: "0px",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "35px",
    },
    "& .MuiList-root": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },

    "& a": {
      color: "gray",
      textDecoration: "none",

      "&:hover": {
        textDecoration: "none",
      },
    },
  },
  mainLogo: {
    color: MAIN_COLOR,
    boxShadow: "none",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  mainLogoSubheading: {
    color: SECONDARY_COLOR,
  },
}));

// Hello
function Sidebar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item sm={10}>
          <Paper className={classes.mainLogo}>
            <Typography variant="h5">Elemzy</Typography>
            <Typography variant="p" className={classes.mainLogoSubheading}>
              Creator
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container style={{ minHeight: "90vh" }}>
        <List component="nav" aria-label="main mailbox folders">
          <div className="top-links">
            <Link to="/creator/dashboard" path>
              <SideBarItem itemText="Dasboard" itemIcon={<InboxIcon />} />
            </Link>

            <Link to="/creator/courses">
              <SideBarItem itemText="Courses" itemIcon={<InboxIcon />} />
            </Link>

            <Link to="/creator/addcourse">
              <SideBarItem itemText="Add Course" itemIcon={<InboxIcon />} />
            </Link>

            <Link to="/creator/support">
              <SideBarItem itemText="Support" itemIcon={<InboxIcon />} />
            </Link>

            <Link to="/creator/settings">
              <SideBarItem itemText="Settings" itemIcon={<InboxIcon />} />
            </Link>
          </div>
          <div className="last-link">
            <Link to="/logout">
              <SideBarItem itemText="Logout" itemIcon={<InboxIcon />} />
            </Link>
          </div>
        </List>
      </Grid>
    </div>
  );
}

export default Sidebar;

const SideBarItem = ({ itemText, itemIcon }) => {
  return (
    <>
      <ListItem button>
        <ListItemIcon>{itemIcon}</ListItemIcon>
        <ListItemText primary={itemText} />
      </ListItem>
    </>
  );
};
