const express = require('express');
const router = express.Router();

const notesController = require('../controllers/notes');
const { wrapAsync } = require('../utils/helper');

router.post('/', wrapAsync(notesController.create));
router.get('/:id', wrapAsync(notesController.findById));
router.put('/', wrapAsync(notesController.update));
router.put('/move', wrapAsync(notesController.move));
router.delete('/:id', wrapAsync(notesController.delete));

module.exports = router;
