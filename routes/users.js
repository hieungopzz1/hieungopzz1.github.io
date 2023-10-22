var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
const multer = require('multer');
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  }
})
const upload = multer({ storage: fileStorageEngine })

//router read in list
router.get('/list', async function (req, res, next) {
  let data = await UserModel.find();
  res.render('user/list', { data: data });
});

//router add
router.get('/add', (req, res) => {
  res.render("user/add");
})
router.post('/add', async (req, res) => {
  var username = req.body.username;
  let data = await UserModel.findOne({ username: req.body.username });
  console.log(data)
  if (!data) {
    let data = req.body;
    await UserModel.create(data);
    res.redirect('/users/list');
  } else {
    res.send("<script>alert('Username already exist!!!!');history.back();</script>");
  }

});

//router update
router.get("/edit/:id", async function (req, res, next) {
  let id = req.params.id;
  let data = await UserModel.findById(id);
  res.render('user/edit', { data: data });
})
router.post("/edit/:id", async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  await UserModel.findByIdAndUpdate(id, data)
  res.redirect('/users/list');
})


//delete
router.get('/delete/:id', async (req, res) => {
  await UserModel.findByIdAndDelete({ _id: id = req.params.id });
  res.redirect('/users/list');
});

//search
router.post('/search', async (req, res) => {
  var keyword = req.body.username;
  //relative search
  var data = await UserModel.find({ username: new RegExp(keyword, "i") });
  res.render('user/list', { data: data });
})

router.get("/show/:id", async function (req, res, next) {
  let data = await UserModel.findById(req.params.id);
  res.render('user/show', { data: data });
})

module.exports = router;
