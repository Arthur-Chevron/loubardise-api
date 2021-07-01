module.exports = app => {
    const dechets = require("./controller")
    const router = require("express").Router()
    const upload = require('./middleware')

    // get tous les déchets qui sont visibles
    router.get('/getAllDechets', dechets.getAllDechets)

    // ajout d'un déchet
    router.post('/addDechet', dechets.addDechet)

    // put le déchet à cacher
    router.put('/hideDechet/:id', dechets.hideDechet)

    // upload image sur S3
    router.post('/uploadToS3', upload.single('myFile'), dechets.uploadToS3)

    app.use('/api/dechets', router)
};


