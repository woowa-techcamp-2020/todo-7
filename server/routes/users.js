const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { wrapAsync } = require('../utils/helper');
const { authenticate, isAuthenticated } = require('../utils/auth');

router.get('/projects', isAuthenticated, usersController.findProjects);
router.get('/check', isAuthenticated, usersController.loginCheck);
router.get('/', usersController.findAll);
router.post('/login', authenticate(), wrapAsync(usersController.findById));
router.post('/', wrapAsync(usersController.create));
router.put('/', wrapAsync(usersController.update));

module.exports = router;
