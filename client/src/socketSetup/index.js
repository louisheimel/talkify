import io from "socket.io-client";
import store from "../redux/store";
// const talkifyChannels = ["Work/project channel"];
const state = store.getState();
const workspaces = state.threads.workspace.options.map(
  workspace => workspace.name
);
const talkifyChannels = workspaces
  .map(workspaceName => {
    const currentWorkspace = state.threads.workspace.options.find(
      option => option.name === workspaceName
    );
    console.log("current workspace is: ", currentWorkspace);
    const generalChannels = currentWorkspace.channels
      ? Object.keys(currentWorkspace.channels.messages)
      : [];
    const dms = currentWorkspace.channels
      ? Object.keys(currentWorkspace.directMessages.messages)
      : [];
    return [...generalChannels, ...dms].map(
      channel => workspaceName + "/" + channel
    );
  })
  .flat();
console.log("talkify Channels are: ", talkifyChannels);
export const createSocketConnection = () =>
  new Promise((resolve, reject) => {
    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      resolve(socket);
    });
  });

export const waitForSuccessfulLogin = loginData => socket => {
  return new Promise((resolve, reject) => {
    socket.emit("user login", loginData);
    setTimeout(() => reject("login failure"), 5000);
    talkifyChannels.forEach(chan => {
      socket.on(chan, messages => {
        console.log("state is: ", store.getState());
        console.log(messages + " from " + chan);
        store.dispatch({
          type: "NEW_MESSAGE",
          payload: {
            messages,
            channel: chan
          }
        });
      });
    });

    socket.on("successful login", () => {
      resolve(socket);
    });

    socket.on("news", data => {
      console.log("just received data on client side!");
    });
  });
};

export const postMessageViaSocket = (message, namespace, room) => socket => {
  false && console.log(socket);
  return new Promise((resolve, reject) => {
    socket.emit(`${namespace}/${room}`, message);
    resolve(socket);
  });
};
