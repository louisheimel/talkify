import { CHANGE_WORKSPACE } from "../actionTypes";

const defaultStore = {
  workspace: {
    current: "Work",
    options: ["Fun", "Work"]
  },
  channels: {
    label: "Channels",
    current: "project channel",
    options: ["project channel", "just for fun"]
  },
  directMessages: {
    label: "Direct Messages",
    current: null,
    options: ["Alice", "Bob"]
  }
};

function threadsReducer(state = defaultStore, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_WORKSPACE:
      return { ...state, workspace: { ...state.workspace, current: payload } };
    default:
      return state;
  }
}

export default threadsReducer;
