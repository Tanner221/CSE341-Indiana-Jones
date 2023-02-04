const express = require('express');
const mongodb = require('./db/connect');

const app = express();

const port = process.env.PORT || 3000;

app
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    throw err;
  } else {
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  }
});
