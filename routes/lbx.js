var express = require('express');
var router = express.Router();
var LbxModel = require('../models/LbxModel');
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

router.get('/', async (req, res) => {
    let lbx = await LbxModel.find();
    res.render('lbx/index', { lbx: lbx });
})
router.get('/add', (req, res) => {
    res.render('lbx/add');
})

router.post('/add', upload.single('image'), async (req, res) => {
    let lbx = new LbxModel({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        image: req.file.filename,
    });
    await lbx.save();
    res.redirect('/lbx/list')
})

router.get('/list', async (req, res) => {
    let lbx = await LbxModel.find();
    res.render('lbx/list', { lbx: lbx })
})

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    let lbx = await LbxModel.findById(id);
    res.render('lbx/edit', { lbx: lbx })
})
router.post("/edit/:id", async (req, res) => {
    let id = req.params.id;
    let lbx = req.body;
    await LbxModel.findByIdAndUpdate(id,lbx)
    res.redirect('/lbx/list');
  })

router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    await LbxModel.findByIdAndDelete(id);
    res.redirect('/lbx/list');
})

router.get("/show/:id", async function (req, res, next) {
    let lbx = await LbxModel.findById(req.params.id);
    res.render('lbx/show', { lbx: lbx });
})

router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    //relative search
    var lbx = await LbxModel.find({ name: new RegExp(keyword, "i") });
    res.render('lbx/list', { lbx: lbx });
  })

module.exports = router;
