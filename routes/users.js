var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var helpers = require('../helpers');


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

router.delete('/delete/:name', function (req, res) {
  var userCollection = req.db.get('users');

  userCollection.find({ username: req.params.name }, {}, function (err, docs) {
    if (err) {
      res.status(500);
      res.json({ err });
    } else {
      userCollection.remove({ username: req.params.name });
      res.status(200);
      res.json(docs[0]);
    }
  });
});

router.post('/:id/:isAdm', function (req, res, next) {

  var userCollection = req.db.get('users');
  userCollection.update({_id:req.params.id}, {$set: {isAdmin:req.params.isAdm}}, function(err, docs){
    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.status(200);
      res.json(docs);
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

});

router.get('/:name', helpers.checkLogin, function (req, res, next) {
  var users = req.db.get('users');
  users.find({username :req.params.name}, {}, function (err, docs) {

    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.status(200);
      res.json( docs);
    }
  });

});

module.exports = router;
