var express = require('express');
var router = express.Router();

router.get('/', function (req, res){
  res.render('client');
});
router.get('/moon', function (req, res){
  res.render('moon');
});
router.get('/sun', function (req, res){
  res.render('sun');
});
router.get('/weather', function (req, res){
  res.render('weather');
});
router.get('/login/:usr', function (req, res){
  console.log(req.params.usr);
  res.render('login', { user: req.params.usr });
});

module.exports = router;
