import store from "../../store";
import axios from "axios";
import { API_URL } from "./types";

const dispatch = store.dispatch;

export const getTokenConfig = () => {
  const authState = store.getState().auth;

  const token = authState.token;
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  } else {
    let localtoken = localStorage.getItem("token");
    if (localtoken) config.headers["Authorization"] = `Token ${localtoken}`;
  }

  return config;
};

export const createCourse = async (course_data, setFormErrors) => {
  const config = getTokenConfig();

  try {
    const resp = await axios.post(
      `${API_URL}/apic/creator/course/`,
      course_data,
      config
    );

    const createdCourse = resp.data;
    return createdCourse;
  } catch (err) {
    console.log(err.response.data);
    if (err.response.status == 400) {
      if (err.response.data) {
        if (err.response.data.errors) {
          const errors = err.response.data.errors;
          setFormErrors(errors);
        }
      }
    }
    return null;
  }
};

export const createModule = async (module_data) => {
  const config = getTokenConfig();

  try {
    const resp = await axios.post(
      `${API_URL}/apic/creator/course/module/`,
      module_data,
      config
    );

    const createdModule = resp.data;
    return createdModule;
  } catch (err) {
    if (err.response.data) {
      if (err.response.data.errors) {
        return null;
      }
    }

    return null;
  }
};

export const createVideo = (
  videoData,
  setVideoData,
  setReqStatus,
  setFormErrors
) => {
  const config = getTokenConfig();

  axios
    .post(`${API_URL}/apic/creator/course/video/`, videoData, config)
    .then((resp) => {
      if (resp.status == 201) {
        const addedVideo = resp.data;
        setVideoData(addedVideo);
        setReqStatus(201);
      }
    })
    .catch((err) => {
      if (err.response.data) {
        if (err.response.data.errors) {
          const errors = err.response.data.errors;
          setFormErrors(errors);
        }
      }
    });
};

export const loadCreatorsData = () => {
  const config = getTokenConfig();

  axios.post("");
};
