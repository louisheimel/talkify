const express = require("express"),
  bodyParser = require("body-parser");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const middleware = require("socketio-wildcard")();

io.use(middleware);

const messages = {};
const API = require("./API");

const listenForLogin = socket =>
  socket.on("user login", data => {
    socket.emit("news", { hello: "world" });
    console.log("user data from socket: ", data);
    API.initAPI()
      .then(api => {
        api.logIn(data).then(() => {
          socket.emit("successful login");
        });
      })
      .catch(err => {
        console.log(err);
        socket.emit("login failure");
      });
  });

io.on("connection", socket => {
  listenForLogin(socket);
  socket.on("*", packet => {
    const [channel, message] = packet.data;
    console.log("channel is: " + channel);
    messages[channel] = messages[channel]
      ? messages[channel].concat(message)
      : [message];
    console.log(messages);
    socket.emit(channel, messages[channel].slice(0, 100));
  });
});

io.on("disconnect", () => {
  console.log("user disconnected");
});
http.listen(process.env.PORT || 3001);
