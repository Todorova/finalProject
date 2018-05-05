var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  var users = req.db.get('comments');

  users.find({}, {}, function (err, docs) {

    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.status(200);
      res.json({ docs });
    }
  });

});


router.delete('/:id', function (req, res) {
  var allComments = req.db.get('comments');
  var id = req.params.id;

  allComments.find({ _id: id }, {}, function (err, docs) {
    if (err) {
      res.status(500);
      res.json({ err });
    } else {
      allComments.remove({ _id: id });
      res.status(200);
      res.json(docs[0]);
    }
  });
});



module.exports = router;