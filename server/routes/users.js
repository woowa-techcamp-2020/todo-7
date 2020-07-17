const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');
const { wrapAsync } = require('../utils/helper');
const { authenticate } = require('../utils/auth');

router.post('/login', authenticate(), wrapAsync(usersController.findById));
router.post('/', wrapAsync(usersController.create));
router.put('/', wrapAsync(usersController.update));

module.exports = router;
