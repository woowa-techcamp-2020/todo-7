const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projects');
const { wrapAsync } = require('../utils/helper');
const { isAuthenticated } = require('../utils/auth');

router.post('/', wrapAsync(projectsController.create));
router.get('/:id', isAuthenticated, wrapAsync(projectsController.get));
router.put('/', wrapAsync(projectsController.update));
router.delete('/:id', wrapAsync(projectsController.delete));

module.exports = router;
