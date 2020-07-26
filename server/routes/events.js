const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events');
const { wrapAsync } = require('../utils/helper');
const { isAuthenticated } = require('../utils/auth');

router.use(isAuthenticated);
router.post('/', wrapAsync(eventsController.create));
router.get('/:id', wrapAsync(eventsController.findById));

module.exports = router;
