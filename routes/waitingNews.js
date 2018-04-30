var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var waiting = req.db.get('waitingNews');
  
    waiting.find({}, {}, function (err, news) {
  
      if (err) {
        res.status(500);
        res.json(err);
      } else {
        res.status(200);
        res.json({ news });
      }
    });
});
    
router.post('/', function(req, res, next){
    var news = req.body;
    console.log(news);
        var waitingCollection = req.db.get('waitingNews');
        waitingCollection.insert(news, function(err, dock){
            res.json(dock);
        });
});

module.exports = router;