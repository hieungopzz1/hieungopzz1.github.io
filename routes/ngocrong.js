var express = require('express');
var router = express.Router();
var NgocRongModel = require('../models/NgocRongModel');
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
    let ngocrong = await NgocRongModel.find();
    res.render('ngocrong/index', { ngocrong: ngocrong });
})
router.get('/add', (req, res) => {
    res.render('ngocrong/add');
})

router.post('/add', upload.single('image'), async (req, res) => {
    let ngocrong = new NgocRongModel({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        image: req.file.filename,
    });
    await ngocrong.save();
    res.redirect('/ngocrong/list')
})

router.get('/list', async (req, res) => {
    let ngocrong = await NgocRongModel.find();
    res.render('ngocrong/list', { ngocrong: ngocrong })
})

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    let ngocrong = await NgocRongModel.findById(id);
    res.render('ngocrong/edit', { ngocrong: ngocrong })
})
router.post("/edit/:id", async (req, res) => {
    let id = req.params.id;
    let ngocrong = req.body;
    await NgocRongModel.findByIdAndUpdate(id, ngocrong)
    res.redirect('/ngocrong/list');
})

router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    await NgocRongModel.findByIdAndDelete(id);
    res.redirect('/ngocrong/list');
})

router.get("/show/:id", async function (req, res, next) {
    let ngocrong = await NgocRongModel.findById(req.params.id);
    res.render('ngocrong/show', { ngocrong: ngocrong });
})

router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    //relative search
    var ngocrong = await NgocRongModel.find({ name: new RegExp(keyword, "i") });
    res.render('ngocrong/list', { ngocrong: ngocrong });
})

module.exports = router;
