const express = require("express"),
  bodyParser = require("body-parser");

const app = express();

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
  console.log(req.body);
  res.json({ hello: "world" });
});

app.post("/api/signup", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});
app.post("/api/login", (req, res) => {
  console.log(req.body);
  console.log("hello");
  res.sendStatus(Math.random() > 0.5 ? 200 : 422);
});

app.listen(process.env.PORT || 3001);
