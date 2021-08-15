import React from "react";
import CourseForm from "../components/AddCoursePageC/CourseForm";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "3em",
  },
}));

const AddCoursePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CourseForm />
    </div>
  );
};

export default AddCoursePage;
