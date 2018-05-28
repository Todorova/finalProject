var express = require('express');
var router = express.Router();
var helpers = require('../helpers');

/* GET news listing. */
router.get('/all', function (req, res, next) {
    var allNewsCollection = req.db.get("news");

    allNewsCollection.find({}, { sort: { dateCreated: -1 } }, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            res.status(200);
            res.json(docs);
        }
    });
});

router.get('/latest', function (req, res, next) {
    var newsCollection = req.db.get("news");

    newsCollection.find({}, { sort: { dateCreated: -1 }, limit: 5 }, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            res.status(200);
            res.json(docs);
        }
    });
});

router.get('/top', function (req, res, next) {
    var latestCollection = req.db.get("news");

    latestCollection.find({}, { sort: { dateCreated: -1 }, limit: 10 }, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            res.status(200);
            res.json(docs);
        }
    });
});

router.get('/visited', function (req, res, next) {
    var visitedCollection = req.db.get('news');

    visitedCollection.find({}, { sort: { visited: -1 }, limit: 10 }, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            res.status(200);
            res.json(docs);
        }
    })
})

router.get('/comment', function (req, res, next) {
    var commentCollection = req.db.get('news');

    commentCollection.find({}, { sort: { commentsCount: -1 }, limit: 10 }, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            res.status(200);
            res.json(docs);
        }
    })
});

router.get('/videos', function (req, res, next) {
    var videosCollection = req.db.get('news');

    videosCollection.find({video: { $ne: ''}}, { sort: { dateCreated: -1 } }, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            res.status(200);
            res.json(docs);
        }
    })
})
router.get('/photos', function (req, res, next) {
    var photosCollection = req.db.get('news');

    photosCollection.find({video : ''}, { sort: { dateCreated: -1 } }, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            res.status(200);
            res.json(docs);
        }
    })
})
router.get('/search/:title', function (req, res, next) {
    var titleCollection = req.db.get('news');

    titleCollection.find({title: new RegExp(req.params.title, 'i')}, {}, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            res.status(200);
            res.json(docs);
        }
    })
})

router.get('/userId/:name', function (req, res, next) {
    var newsCollection = req.db.get("news");

    newsCollection.find({creator:req.params.name}, { }, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            res.status(200);
            res.json(docs);
        }
    });
});


//increase visited count
router.get('/:id', function (req, res, next) {
    var newsCollection = req.db.get("news");

    newsCollection.find({_id:req.params.id}, { }, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            newsCollection.update({_id: req.params.id}, {$inc: {visited: 1}});
            res.status(200);
            res.json(docs[0]);
        }
    });
});

router.get('/:id/comments', function (req, res, next) {
    var newsCollection = req.db.get("comments");

    newsCollection.find({newsId: req.params.id}, { }, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            res.status(200);
            res.json(docs);
        }
    });
});


//add comments
router.post('/:id/comment', function(req, res, next) {
    var commentCollection = req.db.get('comments');
    var comment = req.body;
    comment.date = new Date();
    commentCollection.insert(comment, function(err, comment) {
        if (err) {
            res.status(400);
            res.json(err);
        } else {
            res.json(comment);
        }

    });
});


//add news
router.post('/', helpers.checkLogin, function(req, res, next){
    var data = req.body;
    data.dateCreated = new Date(data.dateCreated);
        var news = req.db.get('news');
        news.insert(data, function(err, dock){
          if (err) {
            res.status(500);
            res.json(err);
          } else {
            res.status(200);
            res.json(dock);
          }
        });
});



//delete news and comments
router.delete('/:id', function (req, res, next) {
    var newsCollection = req.db.get("news");
    var commentsCollection = req.db.get('comments');

    newsCollection.remove({_id:req.params.id}, { }, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            commentsCollection.remove({newsId: req.params.id});
            res.status(200);
            res.json();
        }
    });
});

module.exports = router;
