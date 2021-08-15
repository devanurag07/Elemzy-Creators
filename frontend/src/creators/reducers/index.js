const initialState = {
  myCoursesInfo: {},
};

export default function name(state = initialState, action) {
  switch (action.type) {
    case "LOAD_CREATORS_DATA": {
      const creatorsData = action.payload;
      return { ...state, myCoursesInfo: creatorsData };
    }
    default:
      return state;
  }
}
