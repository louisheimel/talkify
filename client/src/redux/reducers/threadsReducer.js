import { CHANGE_WORKSPACE, NEW_MESSAGE, CHANGE_CHANNEL } from "../actionTypes";
import newMessageReducer from "./helpers/newMessageReducer";

const defaultStore = {
  workspace: {
    current: "Work",
    options: [
      {
        name: "Fun"
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
  const currentOption = (messages, channel) => {
    channel = channel.split("/")[1];
    const oldOption = state.workspace.options.find(
      option => option.name === state.workspace.current
    );
    const changeChannelContents = () => {
      console.log(Object.keys(oldOption.channels.messages), channel);
      if (Object.keys(oldOption.channels.messages).includes(channel)) {
        return {
          channels: {
            ...oldOption.channels,
            messages: {
              ...oldOption.channels.messages,
              [channel]: messages
            }
          },
          directMessages: oldOption.directMessages
        };
      } else if (
        Object.keys(oldOption.directMessages.messages).includes(channel)
      ) {
        return {
          channels: oldOption.channels,
          directMessages: {
            ...oldOption.directMessages,
            messages: {
              ...oldOption.directMessages.messages,
              [channel]: messages
            }
          }
        };
      } else {
        throw new Error("problem changing channel messages...");
      }
    };
    return {
      ...oldOption,
      ...changeChannelContents()
    };
  };
  const makeNewOptions = (messages, channel) => [
    ...otherOptions(),
    currentOption(messages, channel)
  ];
  switch (type) {
    case CHANGE_WORKSPACE:
      return { ...state, workspace: { ...state.workspace, current: payload } };
    case NEW_MESSAGE:
      const { messages, channel } = payload;
      console.log("hello from threadsReducer line 39", payload);
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
