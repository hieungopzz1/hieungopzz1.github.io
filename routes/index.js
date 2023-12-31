var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var NgocRongModel = require('../models/NgocRongModel');
var LbxModel = require('../models/LbxModel');

/* GET home page. */
router.get('/', async (req, res) => {
  let ngocrong = await NgocRongModel.find();
  let lbx = await LbxModel.find();
  let user = await UserModel.find();
  res.render('index', { ngocrong: ngocrong, lbx: lbx,user:user });
})
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
  if (p1 === p2 && !exist) {
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
    if (username === data.username && password === data.password && data.isuser === "isadmin") {
      res.redirect('/users/list');
    } else {
      let ngocrong = await NgocRongModel.find();
      let lbx = await LbxModel.find();
      let user = await UserModel.findOne({ username: username})
      res.render('index', { user: user, ngocrong: ngocrong, lbx: lbx });
    }
  }
})

router.post('/search', async (req, res) => {
  var keyword = req.body.name;
  //relative search
  var ngocrong = await NgocRongModel.find({ name: new RegExp(keyword, "i") });
  var lbx = await LbxModel.find({ name: new RegExp(keyword, "i") });
  res.render('searchname', { ngocrong: ngocrong, lbx: lbx })
})

router.get('/cart',async (req, res) => {
  let ngocrong = await NgocRongModel.find();
  let lbx = await LbxModel.find();
  res.render('cart', {ngocrong: ngocrong,lbx: lbx});
})
router.post('/cart', async (req, res) => {
  let lbx = await LbxModel.find();
  console.log(lbx)
  let total = lbx.price * lbx.quantity;
  console.log(total);
  res.render('cart', {lbx:lbx,total:total});
})
router.get("users/show/:id", async function (req, res, next) {
  let data = await UserModel.findById(req.params.id);
  res.render('user/show', { data: data });
})
module.exports = router;
