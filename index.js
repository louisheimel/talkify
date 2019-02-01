const io = require("socket.io")(3001);
const middleware = require("socketio-wildcard")();

io.use(middleware);

const messages = {};
const API = require("./API");

const listenForLogin = socket => {
  socket.on("user login", data => {
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
};

io.on("connection", socket => {
  listenForLogin(socket);
  socket.on("*", packet => {
    console.log("just received a message!");
    const [channel, message] = packet.data;
    if (channel !== "user login") {
      console.log("channel is: " + channel);
      messages[channel] = messages[channel]
        ? messages[channel].concat(message)
        : [message];
      console.log(messages);
      io.sockets.emit(channel, messages[channel].slice(0, 100));
    }
  });
});

io.on("disconnect", () => {
  console.log("user disconnected");
});
