var express = require('express');
var router = express.Router();
var ProductModel = require('../models/ProductModel');

//upload image
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

//router read in home
router.get('/', async function (req, res, next) {
  let data = await ProductModel.find();
  res.render('product/index', { data: data });
});


//router read in list
router.get('/list', async function (req, res, next) {
  let data = await ProductModel.find();
  res.render('product/list', { data: data });
});

//router find in list
router.post('/search', async (req, res) => {
  var keyword = req.body.name;
  //relative search
  var data = await ProductModel.find({ name: new RegExp(keyword, "i") });
  res.render('product/list', { data: data });
})



//router create (get)
router.get('/add', function (req, res, next) {
  res.render('product/add');
})



//router create
router.post('/add', upload.single('image'), async (req, res) => {
  let data = await ProductModel({
    title: req.body.title,
    name: req.body.name,
    price: req.body.price,
    image: req.file.filename,
    quantity: req.body.quantity,
  });
  if (data.quantity < 0 || data.price < 1) {
    res.send("<script>alert('Quantity >= 0 and Price >= 1 and Pirce is number. Please!!!');history.back();</script>")
  } else {
    await data.save();
    res.redirect('/products/list');
  }
  
})

//router show detail
router.get("/show/:id", async function (req, res, next) {
  let id = req.params.id;
  let data = await ProductModel.findById(id);
  res.render('product/show', { data: data });
})

//router cart
router.get('/cart', async function (req, res, next) {
  let data = await ProductModel.find();
  res.render('product/cart', { data: data });
});

//router update
router.get("/edit/:id", async function (req, res, next) {
  let id = req.params.id;
  let data = await ProductModel.findById(id);
  res.render('product/edit', { data: data });
})
router.post("/edit/:id", async (req, res) => {
  let id = req.params.id;
  let data = await ProductModel.findOneAndUpdate(id)
  data.title = req.body.title;
  data.name = req.body.name;
  data.price = req.body.price;
  // data.image=req.file.filename;
  data.quantity = req.body.quantity;
  await data.save();
  res.redirect('/products/list');
})

//delete
router.get('/delete/:id', async (req, res) => {
  await ProductModel.findByIdAndDelete({ _id: id = req.params.id });
  res.redirect('/products/list');
});


module.exports = router;
