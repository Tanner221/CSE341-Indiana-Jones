const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

app
.use(express.json())
.use(bodyParser.json())
.use(bodyParser.urlencoded({
  extended: true
}))
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})
.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    throw err;
  } else {
    app.listen(port, () => {
      console.log(`Running at http://localhost:${port}`);
    });
  }
});
