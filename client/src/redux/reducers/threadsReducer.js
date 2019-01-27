import {} from "../actionTypes";

const defaultStore = {};

function threadsReducer(state = defaultStore, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}

export default threadsReducer;
