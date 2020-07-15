const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Health Check', body: 'Our project is healthy!' });
});

module.exports = router;
