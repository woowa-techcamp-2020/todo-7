const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const projectsRouter = require('./projects');
const groupsRouter = require('./groups');
const notesRouter = require('./notes');
const eventsRouter = require('./events');

router.use('/users', usersRouter);
router.use('/projects', projectsRouter);
router.use('/groups', groupsRouter);
router.use('/notes', notesRouter);
router.use('/events', eventsRouter);

router.get('/', (req, res, next) => {
  res.render('index.html');
});

module.exports = router;
