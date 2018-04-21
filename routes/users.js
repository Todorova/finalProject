var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 var userCollection = req.db.get("users");

 userCollection.find({}, {}, function(err, data){
  if(err){
    res.status(500);
    res.json({err});
  }else{
    res.status(200);
res.json(docs);
  }
 });
});

module.exports = router;
