var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

router.post('/', function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    var newUser = req.body;

    newUser.password = sha1(newUser.password);
    var usersCollection = req.db.get('users');
    usersCollection.find(newUser, function (err, docs) {
      if(docs.length == 1){
        req.session.user = docs[0];
        delete docs[0].password;
      res.json(docs[0]);
      }else{
        res.status(401);
        res.json({ status: 'not authorized' });
      }
      
    });
  });

  module.exports = router;