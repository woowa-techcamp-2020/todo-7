const express = require('express');
const router = express.Router();

const groupsController = require('../controllers/groups');
const { wrapAsync } = require('../utils/helper');

router.post('/', wrapAsync(groupsController.create));
router.get('/:id', wrapAsync(groupsController.findById));
router.put('/', wrapAsync(groupsController.update));
router.put('/move', wrapAsync(groupsController.move));
router.delete('/:id', wrapAsync(groupsController.delete));

module.exports = router;
