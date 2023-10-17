var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var ProductModel = require('../models/ProductModel');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let data = await ProductModel.find();
  res.render('index', { data: data });
});

router.get('/register', (req, res) => {
  res.render("register");
})
router.post('/register', async function (req, res, next) {
  var p1 = req.body.password;
  var p2 = req.body.cbpassword;
  var user = new UserModel({
    username: req.body.username,
    password: req.body.password,
    cbpassword: req.body.cbpassword,
  })
  let exist = await UserModel.findOne({ username: user.username });
  if (p1 === p2 && !exist ) {
    user.save();
    res.render('login');
  } else {
    res.send("<script>alert('Account already exists or the wrong password');history.back();</script>");
  }
})
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.post('/login', async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  let data = await UserModel.findOne({ username: req.body.username, password: req.body.password });
  if (!data) {
    res.send("<script>alert('Username or Password wrong!!!!');history.back();</script>");
  } else {
    if (username === data.username && password === data.password ) {
      res.redirect('/products/list');
    } else {
      res.send("<script>alert('Username or Password wrong!!!!');history.back();</script>");
    }
  }
})

router.post('/search', async (req, res) => {
  var keyword = req.body.name;
  //relative search
  var data = await ProductModel.find({ name: new RegExp(keyword, "i") });
  res.render('listproductbyname', { data: data })
})

module.exports = router;
