const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors');

const app = express();

// app.use(cors);

app.use(bodyParser.json())

app.post("*", (req, res) => res.send(200));

app.get('/api', (req, res) => {
    console.log(req.body);
    res.json({hello: 'world'});
});

app.post('/api/signup', (req, res) => {
    console.log(req.body);
    res.send(200);
});
app.post('/api/login', (req, res) => {
    console.log(req.body);
    console.log('hello')
    res.send(200);
});


app.listen(process.env.PORT || 3001);