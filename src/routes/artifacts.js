const routes = require('express').Router();
const validation = require('../validation');
const bodyParser = require('body-parser');

const { route } = require('.');
const artifactController = require('../controllers/artifacts');

routes.get('/', artifactController.returnArtifacts);
routes.get('/:id', artifactController.returnArtifact);
routes.post('/', validation.AddArtifactValidation ,artifactController.addArtifact)

module.exports = routes;