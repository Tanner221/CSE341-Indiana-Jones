const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const { auth } = require('express-openid-connect');

const app = express();

const port = process.env.PORT || 3000;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: 'ElAPTH1JHF0nhOXIEpaZlNDzzE2p26t4',
  issuerBaseURL: 'https://dev-0rfxbcr1u4f5ecdw.us.auth0.com'
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

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