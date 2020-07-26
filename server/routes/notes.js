const express = require('express');
const router = express.Router();

const notesController = require('../controllers/notes');
const { wrapAsync } = require('../utils/helper');
const { isAuthenticated } = require('../utils/auth');

router.use(isAuthenticated);
router.post('/', wrapAsync(notesController.create));
router.get('/:id', wrapAsync(notesController.findById));
router.put('/move', wrapAsync(notesController.move));
router.put('/', wrapAsync(notesController.update));
router.delete('/', wrapAsync(notesController.delete));

module.exports = router;
