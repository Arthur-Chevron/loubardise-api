module.exports = app => {
    const dechets = require("./controller.js")
    const router = require("express").Router()

    // get tous les déchets qui sont visibles
    router.get('/getAllDechets', dechets.getAllDechets)

    // ajout d'un déchet
    router.post('/addDechet', dechets.addDechet)

    app.use('/api/dechets', router)
};


