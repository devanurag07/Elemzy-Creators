import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      marginTop: "0.3em",
    },
  },
}));

const ModuleForm = ({ open, setFormOpen, addModule }) => {
  const classes = useStyles();

  const [moduleFormData, setModuleFormData] = useState({
    module_name: "",
    module_desc: "",
  });

  const addBtnHandler = () => {
    const { module_name, module_desc } = moduleFormData;

    addModule(module_name, module_desc);
  };

  const inputChangeHandler = (e) => {
    const inputFieldName = e.target.name;
    const inputFieldValue = e.target.value;
    setModuleFormData({
      ...moduleFormData,
      [inputFieldName]: inputFieldValue,
    });
  };

  return (
    <Dialog open={open} className={classes.root}>
      <DialogTitle>Add Module</DialogTitle>
      <DialogContent>
        <form action="">
          <Grid container>
            <Grid item sm={12}>
              <TextField
                label="Module Name"
                variant="outlined"
                fullWidth
                name="module_name"
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Module Description"
                variant="outlined"
                rows={4}
                multiline
                fullWidth
                name="module_desc"
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => setFormOpen(false)}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={addBtnHandler}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModuleForm;
