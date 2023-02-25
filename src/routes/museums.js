const routes = require('express').Router();
const validation = require('../validation');
const { requiresAuth } = require('express-openid-connect');
const museumController = require('../controllers/museums');

routes.get('/', requiresAuth(), museumController.returnMuseums)
routes.get('/:id', requiresAuth(),museumController.returnMuseum)
routes.post('/', validation.AddMuseumValidation,museumController.addMuseum)
routes.put('/:id', validation.AddMuseumValidation, museumController.updateMuseum)
routes.delete('/:id', museumController.deleteMuseum)
module.exports = routes;