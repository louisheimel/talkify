import io from "socket.io-client";

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
    socket.on("Work/project channel", messages =>
      console.log(messages + " from Work/project channel")
    );
    socket.on("successful login", () => {
      resolve(socket);
    });
  });
};

export const postMessageViaSocket = (message, namespace, room) => socket => {
  console.log(socket);
  return new Promise((resolve, reject) => {
    socket.emit(`${namespace}/${room}`, message);
    resolve(socket);
  });
};
