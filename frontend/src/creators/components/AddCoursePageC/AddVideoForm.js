import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  makeStyles,
} from "@material-ui/core";

const AddVideoForm = ({ open, setFormOpen, module_idx, addVideo }) => {
  const [videoData, setVideoData] = useState({
    title: "",
    video: "",
  });

  const addVideoBtnHandler = () => {
    addVideo(module_idx, videoData);
    setVideoData({
      title: "",
      video: null,
    });
  };

  const onFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length >= 1) {
      const file = files[0];
      setVideoData({ ...videoData, video: file });
    } else {
      setVideoData({ ...videoData, video: null });
    }
  };

  const onInputChange = (e) => {
    setVideoData({ ...videoData, [e.target.name]: e.target.value });
  };
  return (
    <Dialog open={open}>
      <DialogTitle>Add Video</DialogTitle>
      <DialogContent>
        <form action="">
          <Grid container>
            <Grid item sm={12}>
              <TextField
                size="small"
                label="Video Title"
                variant="outlined"
                name="title"
                onChange={onInputChange}
                value={videoData.title}
                fullWidth
              />
            </Grid>
            <Grid item sm={6}>
              <input
                type="file"
                name="video_document"
                onChange={onFileInputChange}
                value={videoData.video ? videoData.video.filename : ""}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={() => setFormOpen(false)}
        >
          Close
        </Button>

        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={addVideoBtnHandler}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddVideoForm;
