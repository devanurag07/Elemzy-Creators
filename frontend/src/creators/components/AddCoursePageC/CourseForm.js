import React, { useRef, useState } from "react";
import {
  TextField,
  Typography,
  makeStyles,
  FormControl,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import ModuleForm from "./ModuleForm";
import { produce } from "immer";
import ModuleComponent from "./ModuleComponent";
import { createCourse, createModule } from "../../actions/creatorActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    // margin: "1em",
    // background: "lightblue",

    "& .MuiInputBase-input ": {},
    "& .MuiFormControl-root ": {
      marginBottom: "0.7em",
      width: "100%",
      borderRadius: "0.3em",
      background: "white",
    },
  },

  uploadCourseCover: {
    padding: "0.5em",
    background: "blue",
    color: "white",
    fontFamily: "Poppins",
    borderRadius: ".3em",
  },

  submitBtn: {
    marginTop: "1em",
  },
  moduleContainer: {
    marginTop: "1em",
  },
}));

const CourseForm = () => {
  const classes = useStyles();
  const inputRef = useRef(null);

  const [moduleFormOpen, setModuleFormOpen] = useState(false);

  const courseInitData = {
    name: "",
    description: "",
    price: "",
    learning_points: "",
    modules: [
      {
        name: "Module Name",
        description: "Description",
        videos: [],
      },
    ],
  };

  const [courseData, setCourseData] = useState(courseInitData);

  const addModule = (module_name, module_desc) => {
    const newModule = {
      idx: courseData.modules.length + 1,
      name: module_name,
      description: module_desc,
      videos: [],
    };

    setCourseData({
      ...courseData,
      modules: [...courseData.modules, newModule],
    });
  };

  const addVideo = (module_idx, video_obj) => {
    const newState = produce(courseData, (draft) => {
      for (let module_ of draft.modules) {
        if (module_.idx == module_idx) {
          module_.videos.push(video_obj);
        }
      }
    });

    // New State --with-- Added Video
    setCourseData(newState);
  };

  const uploadCoverClickHandler = () => {
    inputRef.current.click();
  };

  const handleInputChange = (e) => {
    const inputFieldName = e.target.name;
    const inputFieldValue = e.target.value;

    setCourseData({ ...courseData, [inputFieldName]: inputFieldValue });
  };

  const [createCourseData, setCreatedCourseData] = useState(null);
  const [courseReqStatus, setCourseReqStatus] = useState(null);
  const [courseFormErrors, setCourseFormErrors] = useState({});

  const [courseStatusData, setCourseStatus] = useState({ modules: [] });

  const onSubmit = async () => {
    const courseJson = {
      title: courseData.name,
      description: courseData.description,
      price: courseData.price,
      learning_points: courseData.learning_points,
    };

    setCourseStatus({
      ...courseStatusData,
      courseName: "",
    });
    const createdCourse = await createCourse(courseJson, setCourseFormErrors);
    if (createdCourse !== null) {
      const modules = courseData.modules;

      for (let module of modules) {
        const moduleJson = {
          title: module.title,
          description: module.description,
          course: createdCourse.pk,
        };

        const createdModule = await createModule(moduleJson);

        // const
      }

      // addModule();
    }
    // console.log(createdCourse);
  };

  return (
    <div className={classes.root}>
      <Grid container style={{ background: "lightblue", padding: "1em" }}>
        <Grid sm={8}>
          <TextField
            placeholder="Enter Course name"
            name="name"
            label="Course Name"
            variant="outlined"
            size="small"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid sm={8}>
          <TextField
            placeholder="Enter Course Description"
            name="description"
            label="Course Description"
            variant="outlined"
            size="small"
            multiline
            rows={4}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid sm={8}>
          <Grid sm={4}>
            <div
              className={classes.uploadCourseCover}
              onClick={uploadCoverClickHandler}
            >
              Cover Picture
            </div>
            <input type="file" style={{ display: "none" }} ref={inputRef} />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        style={{ marginTop: "1em", background: "lightblue", padding: "1em" }}
      >
        <Grid item sm={6}>
          <TextField
            multiline
            rows={4}
            placeholder="Bullet points of course contents 5-7 ..."
            variant="outlined"
            onChange={handleInputChange}
            name="learning_points"
          />
        </Grid>

        <Grid item sm></Grid>
        <Grid item sm={5}>
          <Grid item sm={8}>
            <div className="prices">
              <label htmlFor="price_input">Price</label>

              <TextField
                id="price_input"
                variant="outlined"
                size="small"
                onChange={handleInputChange}
                name="price"
              />
            </div>
          </Grid>

          <Grid container>
            <Grid item sm={5}>
              <div className="modules-sec">
                <div className="nOfModulesHeading">Modules</div>
                <div className="no_of_modules">4</div>
              </div>
            </Grid>

            <Grid item sm={5}>
              <div className="add-module">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setModuleFormOpen(true)}
                >
                  Add
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container className={classes.moduleContainer}>
        {courseData.modules.map((module) => {
          return (
            <Grid item sm={12} style={{ marginTop: "0.3em" }}>
              <ModuleComponent module={module} addVideo={addVideo} />
            </Grid>
          );
        })}
      </Grid>

      <ModuleForm
        open={moduleFormOpen}
        setFormOpen={setModuleFormOpen}
        addModule={addModule}
      />

      <Button
        color="primary"
        variant="contained"
        className={classes.submitBtn}
        onClick={onSubmit}
      >
        Submit
      </Button>

      {/* Course Creation Status Board */}
      <Dialog open={true} maxWidth="md">
        <DialogContent>
          <div
            className={courseStatusData.status ? courseStatusData.status : ""}
          >
            {courseStatusData.courseName
              ? courseStatusData.courseName
              : "No course creating"}
          </div>
          <ul>
            {courseStatusData.modules.map((module_) => {
              const videoes = module_.videoes ? module_.videoes : [];

              return (
                <li>
                  <div className={module_.status ? module_.status : ""}>
                    {module_.moduleName
                      ? module_.moduleName
                      : "No module selected"}
                    <ul>
                      {videoes.map((video) => {
                        return (
                          <li>
                            <div className={video.status}>
                              {video.videoName
                                ? video.videoName
                                : "No video selected"}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseForm;
