module.exports = app => {
    const dechets = require("../controller.js")

    var router = require("express").Router()

    app.use('/api/avis', router)
};
