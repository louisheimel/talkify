const express = require("express"),
  bodyParser = require("body-parser");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const API = require("./API");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ hello: "world" });
});

app.post("/api/signup", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    console.log("empty request body");
  }
  const { confirmPassword, ...signupData } = req.body;
  const { password } = signupData;

  if (password === confirmPassword) {
    API.initAPI()
      .then(api => {
        api.signUp(signupData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(401);
      });
  } else {
    console.log("something went wrong, req.body is: ", req.body);
  }
  // res.sendStatus(200);
});

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
});

io.on("disconnect", () => {
  console.log("user disconnected");
});
http.listen(process.env.PORT || 3001);
