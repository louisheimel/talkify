import { CHANGE_WORKSPACE, NEW_MESSAGE, CHANGE_CHANNEL } from "../actionTypes";
import newMessageReducer from "./helpers/newMessageReducer";

const defaultStore = {
  workspace: {
    current: "Work",
    options: [
      {
        name: "Fun"
        // channels: {
        //   label: "Channels",
        //   messages: { general: [] }
        // }
      },
      {
        name: "Work",
        channels: {
          label: "Channels",
          messages: { "project channel": [], "just for fun": [] }
        },
        directMessages: {
          label: "Direct Messages",
          messages: { Alice: [], Bob: [] }
        },
        currentChannel: "project channel"
      }
    ]
  }
};

function threadsReducer(state = defaultStore, action) {
  const { type, payload } = action;
  const otherOptions = () =>
    state.workspace.options.filter(
      option => option.name !== state.workspace.current
    );
  const currentOption = () => ({
    ...state.workspace.options.find(
      option => option.name === state.workspace.current
    ),
    messages: payload
  });
  const makeNewOptions = () => [...otherOptions(), currentOption()];
  switch (type) {
    case CHANGE_WORKSPACE:
      return { ...state, workspace: { ...state.workspace, current: payload } };
    case NEW_MESSAGE:
      console.log("hello from threadsReducer line 39", payload);
      return {
        ...state,
        workspace: {
          ...state.workspace,
          options: [...makeNewOptions()]
        }
      };
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
