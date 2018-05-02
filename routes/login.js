var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

router.post('/', function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    var newUser = req.body;

    newUser.password = sha1(newUser.password);
    var usersCollection = req.db.get('users');
    usersCollection.find(newUser, function (err, dock) {
      if(dock.length == 1){
      res.json(dock[0]);
      }else{
        res.status(401);
        res.json({ status: 'not authorized' });
      }
      
    });
  });

  module.exports = router;