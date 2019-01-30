import { CHANGE_WORKSPACE, NEW_MESSAGE, CHANGE_CHANNEL } from "../actionTypes";
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
        messages: []
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
      console.log("new message is: ", payload);
      return newMessageReducer(state, action);
    case CHANGE_CHANNEL:
      const newstate = {
        ...state,
        workspace: {
          ...state.workspace,
          options: [
            ...state.workspace.options.filter(
              option => option.name !== state.workspace.current
            ),
            {
              ...state.workspace.options.find(
                option => option.name === state.workspace.current
              ),
              currentChannel: payload
            }
          ]
        }
      };
      return newstate;
    default:
      return state;
  }
}

export default threadsReducer;
