const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projects');
const { wrapAsync } = require('../utils/helper');
const { isAuthenticated } = require('../utils/auth');

router.use(isAuthenticated);

router.post('/', wrapAsync(projectsController.create));
router.get('/:id', wrapAsync(projectsController.get));
router.put('/', wrapAsync(projectsController.update));
router.delete('/:id', wrapAsync(projectsController.delete));

module.exports = router;
