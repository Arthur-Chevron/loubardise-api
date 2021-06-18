const db = require('./index.js')
const Op = db.Sequelize.Op
const Dechets = db.dechets


exports.getAllDechets = function(req, res){
    Dechets.findAll({
        attributes: ['id', 'urlfile', 'latitude', 'longitude', 'typedechets'],
        where: {
            [Op.not]: {see : false}
        }
    }).then(dechetTab =>{
        res.status(200).send(dechetTab)
    }).catch(err =>{
        res.status(500).send({message: err.message})
    })
}

exports.addDechet = async function(req, res){
    const urlfile = req.body.urlfile
    const latitude = req.body.latitude
    const longitude = req.body.longitude
    const typedechets = req.body.typedechets

    if (!urlfile) return res.status(400).send({message: "L'url du fichier ne peut être vide"})
    if (!latitude) return res.status(400).send({message: "La latitude ne peut être vide"})
    if (!longitude) return res.status(400).send({message: "La longitude ne peut être vide"})
    if (!typedechets) return res.status(400).send({message: "Le type du déchets ne peut être vide"})

    if (latitude < -90 || latitude > 90) return res.status(400).send({message: "Erreur de latitude"})
    if (longitude < -180 || longitude > 180) return res.status(400).send({message: "Erreur de latitude"})

    const dechet = {
        urlfile: urlfile,
        latitude: latitude,
        longitude: longitude,
        typedechets: typedechets,
        see: true
    }

    Dechets.create(dechet).then(() => {
        res.status(200).send({message: "Déchet ajoutée 🥳"})
    }).catch(err =>{
        res.status(500).send({message: err.message})
    })
}