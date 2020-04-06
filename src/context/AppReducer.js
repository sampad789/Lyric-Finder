export default (state, action) => {
  switch (action.type) {
    case "GET_SUGGESTIONS":
      return {
        ...state,
        loading: false,
        suggestions: action.payload
      };
    case "GET_LYRICS":
      return {
        ...state,
        loading: false,
        lyrics: action.payload
      };
    default:
      return state;
  }
};
