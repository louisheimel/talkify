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
  const currentOption = messages => ({
    ...state.workspace.options.find(
      option => option.name === state.workspace.current
    ),
    messages
  });
  const makeNewOptions = (messages, payload) => [
    ...otherOptions(),
    currentOption(messages)
  ];
  switch (type) {
    case CHANGE_WORKSPACE:
      return { ...state, workspace: { ...state.workspace, current: payload } };
    case NEW_MESSAGE:
      const { messages, channel } = payload;
      console.log("hello from threadsReducer line 39", messages);
      return {
        ...state,
        workspace: {
          ...state.workspace,
          options: [...makeNewOptions(messages, channel)]
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
