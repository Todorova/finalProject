var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

router.post('/register', function (req, res, next) {
  res.setHeader('content-type', 'application/json');
  var newUser = req.body;

  newUser.password = sha1(newUser.password);
  newUser.isAdmin = false;
  var usersCollection = req.db.get('users');
  usersCollection.insert(newUser, function (err, dock) {
    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.status(200);
      res.json(dock);
    }
  });
});

router.post('/update', function (req, res, next) {
  res.setHeader('content-type', 'application/json');
  var newUser = req.body;

  newUser.password = sha1(newUser.password);
  var usersCollection = req.db.get('users');
  usersCollection.save(newUser, function (err, dock) {
    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.status(200);
      res.json(dock);
    }
  });
});

router.get('/', function (req, res, next) {
  var users = req.db.get('users');

  users.find({}, {}, function (err, users) {

    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.status(200);
      res.json({ users });
    }
  });

  //  next();
});

module.exports = router;
