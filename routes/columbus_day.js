var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  res.send('respond with metadata for holiday - i.e. name(s), religion, etc.');
});

router.get('/:year', function(req, res, next) {
    res.send('respond with holiday for ' + req.params.year);
});

module.exports = router;