const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('/', (req, res, next) => {
  res.render('index.html');
});

module.exports = router;
