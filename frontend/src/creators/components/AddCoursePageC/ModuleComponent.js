import React, { useState } from "react";
import { Grid, Button, makeStyles } from "@material-ui/core";
import AddVideoForm from "./AddVideoForm";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0.2em",
    border: "1px solid gray",
    padding: "0.2em 1em",

    "& *": {
      fontFamily: "Poppins",
    },
  },
  moduleHeader: {
    // backround,
  },
  moduleName: {
    fontSize: "0.9em",
    fontWeight: "505",
    fontFamily: "Poppins",
  },
  videoCard: {
    marginTop: "0.3em",
    padding: "0.1em 1em",
    color: "blue",
  },
}));

const ModuleComponent = ({ module, addVideo }) => {
  const classes = useStyles();
  const [open, setFormOpen] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.moduleHeader}>
        <Grid container>
          <Grid item sm={7} style={{ display: "flex", alignItems: "center" }}>
            <div className={classes.moduleName}>{module.name}</div>
          </Grid>
          <Grid item sm></Grid>
          <Grid item sm={4}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setFormOpen(true)}
              size="small"
            >
              Add Content
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className="video-list">
        <div className="video-heading">Videoes</div>
        {module.videos.map((video) => {
          return <div className={classes.videoCard}>{video.title}</div>;
        })}
      </div>
      <AddVideoForm
        open={open}
        setFormOpen={setFormOpen}
        module_idx={module.idx}
        addVideo={addVideo}
      />
    </div>
  );
};

export default ModuleComponent;
