var express = require('express');
var router = express.Router();

/* GET news listing. */
router.get('/', function(req, res, next) {
 var newsCollection = req.db.get("news");

 newsCollection.find({}, {}, function(err, docs){
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
