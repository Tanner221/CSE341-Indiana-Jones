const routes = require('express').Router();

const { route } = require('.');
const artifactController = require('../controllers/artifacts');

routes.get('/', artifactController.returnArtifacts);
routes.get('/:id', artifactController.returnArtifact);
routes.post('/', artifactController.addArtifact)

module.exports = routes;