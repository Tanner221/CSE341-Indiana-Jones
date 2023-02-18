const routes = require('express').Router();
const validation = require('../validation');
const bodyParser = require('body-parser');
const { requiresAuth } = require('express-openid-connect');

const { route } = require('.');
const artifactController = require('../controllers/artifacts');

routes.get('/', requiresAuth(), artifactController.returnArtifacts);
routes.get('/:id', requiresAuth(), artifactController.returnArtifact);
routes.post('/', requiresAuth(), validation.AddArtifactValidation ,artifactController.addArtifact)

module.exports = routes;