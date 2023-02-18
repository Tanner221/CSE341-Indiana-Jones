const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));


routes.use('/artifacts', require('./artifacts'));
routes.use('/museums', require('./museums'))

//check profile information
routes.get('/profile', (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})
module.exports = routes;