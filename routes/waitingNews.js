var express = require('express');
var router = express.Router();

router.delete('/:id', function (req, res) {
  var allNews = req.db.get('waitingNews');
  var id = req.params.id;

  allNews.find({_id:req.params.id}, { }, function (err, docs) {
    if (err) {
        res.status(500);
        res.json({ err });
    } else {
        allNews.remove({_id: req.params.id});
        res.status(200);
        res.json(docs[0]);
    }
});
});

router.get('/:id', function (req, res, next) {
  var waiting = req.db.get('waitingNews');

  waiting.find({_id:req.params.id}, {}, function (err, news) {

    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.status(200);
      res.json( news );
    }
  });
});

router.get('/', function (req, res, next) {
    var waiting = req.db.get('waitingNews');
  
    waiting.find({}, {}, function (err, news) {
  
      if (err) {
        res.status(500);
        res.json(err);
      } else {
        res.status(200);
        res.json( news );
      }
    });
});
    
router.post('/', function(req, res, next){
    var news = req.body;
    console.log(news);
        var waitingCollection = req.db.get('waitingNews');
        waitingCollection.insert(news, function(err, dock){
          if (err) {
            res.status(500);
            res.json(err);
          } else {
            res.status(200);
            res.json(dock);
          }
        });
});

module.exports = router;