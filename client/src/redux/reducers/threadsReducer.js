import { CHANGE_WORKSPACE, NEW_MESSAGE } from "../actionTypes";
import newMessageReducer from "./helpers/newMessageReducer";

const defaultStore = {
  workspace: {
    current: "Work",
    options: [
      { name: "Fun" },
      {
        name: "Work",
        channels: {
          label: "Channels",
          options: ["project channel", "just for fun"]
        },
        directMessages: {
          label: "Direct Messages",
          options: ["Alice", "Bob"]
        },
        currentChannel: "project channel",
        messages: {}
      }
    ]
  }
};

function threadsReducer(state = defaultStore, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_WORKSPACE:
      console.log("workspace payload: ", payload);
      return { ...state, workspace: { ...state.workspace, current: payload } };
    case NEW_MESSAGE:
      return newMessageReducer(state, action);
    default:
      return state;
  }
}

export default threadsReducer;
