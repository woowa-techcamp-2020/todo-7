const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const projectsRouter = require('./projects');
const columnsRouter = require('./columns');
const notesRouter = require('./notes');
const eventsRouter = require('./events');

router.use('/users', usersRouter);
router.use('/projects', projectsRouter);
router.use('/columns', columnsRouter);
router.use('/notes', notesRouter);
router.use('/events', eventsRouter);

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Health Check', body: 'Our project is healthy!' });
});

module.exports = router;