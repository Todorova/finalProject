var express = require('express');
var router = express.Router();

/* GET news listing. */
router.get('/all', function (req, res, next) {
    var allNewsCollection = req.db.get("news");
    console.log(allNewsCollection)

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
})
module.exports = router;
