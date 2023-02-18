const routes = require('express').Router();
const validation = require('../validation');
const { requiresAuth } = require('express-openid-connect');
const museumController = require('../controllers/museums');

routes.get('/', requiresAuth(), museumController.returnMuseums)
routes.get('/:id', requiresAuth(),museumController.returnMuseum)

module.exports = routes;