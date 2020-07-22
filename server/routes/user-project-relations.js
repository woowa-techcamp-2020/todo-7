const express = require('express');
const router = express.Router();

const userProjectRelationsController = require('../controllers/user-project-relations');
const { wrapAsync } = require('../utils/helper');

router.post('/', wrapAsync(userProjectRelationsController.create));
router.get('/:id', wrapAsync(userProjectRelationsController.findById));
router.put('/', wrapAsync(userProjectRelationsController.update));
router.delete('/:id', wrapAsync(userProjectRelationsController.delete));

module.exports = router;
