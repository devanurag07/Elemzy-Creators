import React from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";

const TopSelling = () => {
  return (
    <div>
      <Grid container>
        <Grid item sm={4}>
          <CourseCard />
        </Grid>
        <Grid></Grid>
      </Grid>
    </div>
  );
};

export default TopSelling;
const useStyles2 = makeStyles((theme) => ({
  root: {
    padding: "1em",
    margin: "1em",
    width: "270px",

    "& .cover img": {
      width: "100%",
      height: "250px",
    },
    "& .progress-bg": {
      height: "5px",
      background: "#d2d2d2",
      borderRadius: "10px",
      marginTop: "0.3em",
    },

    "& .progress-bar": {
      height: "5px",
      background: "#19d040",
      borderRadius: "10px",
      width: "75%",
    },
  },
  courseTitle: {
    fontFamily: "Poppins",
    fontWeight: "405",
    fontSize: "1.2rem",
  },

  footer: {
    marginTop: "1em",
  },
  progressNum: {
    fontWeight: "505",
    fontFamily: "Poppins",
  },

  salesCount: {
    fontWeight: "505",
    fontFamily: "Poppins",
  },
}));

const CourseCard = ({ course }) => {
  const classes = useStyles2();

  return (
    <Paper className={classes.root} elevation={2}>
      <div className="cover">
        <img
          src="https://miro.medium.com/max/1400/1*5eV1xmJs2-sJ4DdejfdnQA.png"
          alt=""
        />
      </div>
      <div className={classes.courseTitle}>Javascript Course</div>
      <div className="progress-bg">
        <div className="progress-bar"></div>
      </div>
      <div className={classes.footer}>
        <Grid container>
          <Grid item sm>
            <div className={classes.progressNum}>Progress : 75%</div>
          </Grid>
          {/* <Grid item sm></Grid> */}
          <Grid item sm={1}>
            <div className={classes.salesCount}>150</div>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};
