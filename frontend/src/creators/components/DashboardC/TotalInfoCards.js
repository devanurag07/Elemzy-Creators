import React from "react";
import { Grid, makeStyles, Typography, Paper } from "@material-ui/core";

const TotalInfoCards = () => {
  return (
    <div style={{ display: "flex" }}>
      <InfoCard title={"Total Courses"} info={"5"} color="orange" />
      <InfoCard title={"Total Courses"} info={"5"} color="green" />
      <InfoCard title={"Total Courses"} info={"5"} color="blue" />
    </div>
  );
};

export default TotalInfoCards;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    margin: "1em",
    marginBottom: "0em",
    borderRadius: "0.7em",
  },
  title: {
    textAlign: "center",
    fontSize: "1rem",
    textTransform: "uppercase",
    fontFamily: "Poppins",
    fontWeight: "505",
  },

  info: {
    marginTop: "0.3em",
    textAlign: "center",
    fontSize: "1.5rem",
    fontFamily: "Poppins",
    fontWeight: "505",
  },
}));

const InfoCard = ({ title, info, color }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={2}>
      <Typography
        variant="h6"
        className={classes.title}
        style={{ color: color }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        className={classes.info}
        style={{ color: color }}
      >
        {info}
      </Typography>
    </Paper>
  );
};
