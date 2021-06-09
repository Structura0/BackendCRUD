const express = require('express');
const controller = require('../controller/detventa');
const api = express.Router();
const md_auth = require('../middleware/autenticate');
api.get('/', md_auth.ensureAuth, controller.get);
api.get('/:id', md_auth.ensureAuth, controller.getId);
api.get('/cliente/:id', md_auth.ensureAuth, controller.getcli);
api.post('/', md_auth.ensureAuth, controller.post);
api.patch('/:id', md_auth.ensureAuth, controller.patch);
api.delete('/:id', md_auth.ensureAuth, controller.delete);
api.get('/agregar/:id/cantidad/:can/cliente/:cli', controller.get12);

module.exports = api;