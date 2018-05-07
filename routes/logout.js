var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    delete req.session.user;
    res.json();
  });

  module.exports = router;