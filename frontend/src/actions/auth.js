import axios from "axios";
import { returnErrors, createMessage } from "./messages";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  // CLEAR_ADMINS,
  // SET_PERMISSIONS,
  // PERMISSIONS_ERROR,
  EMAIL_SENT,
  EMAIL_ERROR,
  PASSWORD_RESET,
  RESET_FAIL,
} from "./types";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  if (getState().auth.token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    config.headers["Authorization"] = `Token ${getState().auth.token}`;
    dispatch({ type: USER_LOADING });
    axios
      .get("http://127.0.0.1:8000/api/auth/user", config)
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        // dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR,
        });
      });
  } else {
    // User Loading
    dispatch({ type: USER_LOADING });
    axios
      .get("http://127.0.0.1:8000/api/auth/user", tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        // dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR,
        });
      });
  }
};

// LOGIN USER
export const login = (email, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ email, password });

  axios
    .post("http://127.0.0.1:8000/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// export const loadPermissions = (id) => (dispatch) => {
//   axios
//     .get("/api/roles/" + id + "/")
//     .then((res) => {
//       dispatch({
//         type: SET_PERMISSIONS,
//         payload: res.data.permissions,
//       });
//     })
//     .catch((err) => {
//       // dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: PERMISSIONS_ERROR,
//       });
//     });
// };

export const sendReset = (email) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ email });

  axios
    .post("http://127.0.0.1:8000/api/password_reset/", body, config)
    .then((res) => {
      dispatch(createMessage({ sendReset: "Email Sent." }));
      dispatch({
        type: EMAIL_SENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: EMAIL_ERROR,
      });
    });
};

export const passwordReset = (token, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ token, password });

  axios
    .post("http://127.0.0.1:8000/api/password_reset/confirm/", body, config)
    .then((res) => {
      dispatch(createMessage({ passwordReset: "Password reset successful." }));
      dispatch({
        type: PASSWORD_RESET,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: RESET_FAIL,
      });
    });
};

// REGISTER USER

export const registerStudent = ({
  firstName,
  lastName,
  email,
  password,
  bdate,
  phone_number,
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  var body = {};
  body["firstname"] = firstName;
  body["lastname"] = lastName;
  body["email"] = email;
  body["password"] = password;
  body["birthdate"] = bdate;
  body["phone_number"] = phone_number;
  body["is_manager"] = false;
  body["is_student"] = true;
  body["is_teacher"] = false;

  body = JSON.stringify(body);
  axios
    .post("http://127.0.0.1:8000/api/auth/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(
        createMessage({
          registerUser: "Registration successful. You have been logged in.",
        })
      );
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// LOGOUT USER

export const registerTeacher = ({
  firstName,
  lastName,
  email,
  password,
  bdate,
  phone_number,
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  var body = {};
  body["firstname"] = firstName;
  body["lastname"] = lastName;
  body["email"] = email;
  body["password"] = password;
  body["birthdate"] = bdate;
  body["phone_number"] = phone_number;
  body["is_manager"] = false;
  body["is_student"] = false;
  body["is_teacher"] = true;

  body = JSON.stringify(body);
  axios
    .post("http://127.0.0.1:8000/api/auth/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(
        createMessage({
          registerUser: "Registration successful. You have been logged in.",
        })
      );
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// LOGOUT USER

export const registerManager = ({
  firstName,
  lastName,
  email,
  password,
  bdate,
  phone_number,
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  var body = {};
  body["firstname"] = firstName;
  body["lastname"] = lastName;
  body["email"] = email;
  body["password"] = password;
  body["birthdate"] = bdate;
  body["phone_number"] = phone_number;
  body["is_manager"] = true;
  body["is_student"] = false;
  body["is_teacher"] = false;

  body = JSON.stringify(body);
  axios
    .post("http://127.0.0.1:8000/api/auth/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(
        createMessage({
          registerUser: "Registration successful. You have been logged in.",
        })
      );
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  if (getState().auth.token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    config.headers["Authorization"] = `Token ${getState().auth.token}`;

    axios
      .post("http://127.0.0.1:8000/api/auth/logout", null, config)
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  } else {
    axios
      .post(
        "http://127.0.0.1:8000/api/auth/logout",
        null,
        tokenConfig(getState)
      )
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  }
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

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
    var localtoken = localStorage.getItem("token");
    if (localtoken) config.headers["Authorization"] = `Token ${localtoken}`;
  }

  return config;
};

// export const permissionDeny = () => (dispatch) => {
//   dispatch(createMessage({ message: "Permission denied" }));
// };
