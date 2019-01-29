import { CHANGE_WORKSPACE, NEW_MESSAGE } from "../actionTypes";

const defaultStore = {
  workspace: {
    current: "Work",
    options: ["Fun", "Work"]
  },
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
};

function newMessageReducer(state, action) {
  const { type, payload } = action;
  console.log(payload, " is payload");
  console.log(
    "state.messages.currentChannel is: ",
    state.messages.currentChannel
  );
  const newstate = {
    ...state,
    messages: {
      ...state.messages,
      [state.workspace.current]: {
        [state.currentChannel]: [
          ...((state.messages[state.workspace.current] &&
            state.messages[state.workspace.current][state.currentChannel]) ||
            []),
          payload
        ]
      }
    }
  };
  console.log(newstate);
  return newstate;
}

function threadsReducer(state = defaultStore, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_WORKSPACE:
      return { ...state, workspace: { ...state.workspace, current: payload } };
    case NEW_MESSAGE:
      return newMessageReducer(state, action);
    default:
      return state;
  }
}

export default threadsReducer;
