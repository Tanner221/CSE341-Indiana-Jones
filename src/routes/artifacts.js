const routes = require('express').Router();
const validation = require('../validation');
const { requiresAuth } = require('express-openid-connect');
const artifactController = require('../controllers/artifacts');

routes.get('/', requiresAuth(), artifactController.returnArtifacts);
routes.get('/:id', requiresAuth(), artifactController.returnArtifact);
routes.post('/', validation.AddArtifactValidation ,artifactController.addArtifact)
routes.put('/:id', validation.AddArtifactValidation, artifactController.updateArtifact)
routes.delete('/:id', artifactController.deleteArtifact)

module.exports = routes;