var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
//var helpers = require('../helpers');


router.post('/register', function (req, res, next) {
  var newUser = req.body;
  
  newUser.isAdmin = false;
  var usersCollection = req.db.get('users');

if(newUser.password.length < 8){
  res.status(400);
        res.json({ message: "The password must contain 8 characters" });
}


  newUser.password = sha1(newUser.password);
  usersCollection.find({ username: newUser.username }, {}, function (err, docs) {
    if (err) {
        res.status(500);
        res.json(err);
    }

    if (docs.length === 0) {
        newUser.isAdmin = false;
        
        usersCollection.insert(newUser, function (err, docs) {
            if (err){
              res.status(500);
              res.json(err);
            }
            res.status(200);
            res.json(docs);
        });
    } else {
        res.status(400);
        res.json({ message: "There is user with this username" });
    }
});
});

router.put('/update', function (req, res, next) {
  var newUser = req.body;
  newUser.password = sha1(newUser.password);
 
  var usersCollection = req.db.get('users');
  usersCollection.update({ _id: newUser._id }, newUser, function (err, docs) {
    if (err) {
        res.status(500);
        res.json(err);
    }else{
      res.status(200);
        res.json(docs);
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

router.post('/:id/:isAdmin', function (req, res, next) {

  var userCollection = req.db.get('users');
  userCollection.update({_id:req.params.id}, {$set: {isAdmin:req.params.isAdmin == "true"}}, function(err, docs){
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
      res.json(users);
    }
  });

});

router.get('/:name', function (req, res, next) {
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
