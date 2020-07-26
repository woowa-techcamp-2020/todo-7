const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { wrapAsync } = require('../utils/helper');
const { authenticate, isAuthenticated } = require('../utils/auth');

router.post('/login', authenticate(), wrapAsync(usersController.findById));
router.post('/', wrapAsync(usersController.create));

router.use(isAuthenticated);

router.get('/projects', wrapAsync(usersController.findProjects));
router.get('/check', wrapAsync(usersController.loginCheck));
router.get('/', wrapAsync(usersController.findAll));
router.put('/', wrapAsync(usersController.update));

module.exports = router;
