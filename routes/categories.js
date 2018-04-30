var express = require('express');
var router = express.Router();

/* GET news listing. */

router.get('/', function(req, res, next){
    var categoriesCollection = req.db.get("news");

    categoriesCollection.distinct("categories", { }, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            res.status(200);
            res.json(docs);
        }

    });
});

router.get('/:categories', function (req, res, next) {
    var categoriesCollection = req.db.get("news");
   
    categoriesCollection.find({categories:req.params.categories}, { }, function (err, docs) {
        if (err) {
            res.status(500);
            res.json({ err });
        } else {
            res.status(200);
            res.json(docs);
        }
    });
});

module.exports = router;
