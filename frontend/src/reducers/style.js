const initialState = {
  mobile: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "MOBILE":
      return {
        ...state,
        mobile: true,
      };
    case "FULL":
      return {
        ...state,
        mobile: false,
      };
    default:
      return state;
  }
}
