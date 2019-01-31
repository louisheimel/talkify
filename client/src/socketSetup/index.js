import io from "socket.io-client";
import store from "../redux/store";
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
    socket.on("Work/project channel", messages => {
      false && console.log(messages + " from Work/project channel");
      store.dispatch({ type: "NEW_MESSAGE", payload: messages });
    });
    socket.on("successful login", () => {
      resolve(socket);
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
