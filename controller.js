const db = require('./index.js')
const Op = db.Sequelize.Op
const Dechets = db.dechets
const aws = require('aws-sdk')
const sharp = require('sharp')

/* connect to S3 via IAM */
aws.config.update({
    credentials: {accessKeyId:process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_KEY},
    region: 'eu-west-3',
    apiVersion: '2010-12-01'
})


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

exports.hideDechet = async function(req, res){
    const id = req.params.id

    if (!id) return res.status(400).send({message : "L'id ne peut pas être nul"})

    Dechets.update({see : false},
        {where: {
                id: id
            }
        }).then(dechetTab =>{
        res.status(200).send(dechetTab)
    }).catch(err =>{
        res.status(500).send(err.message)
    })
}


/* upload to S3 */
exports.uploadToS3 = async function(req, res){
    // créer un objet aws S3 Bucket
    const s3 = new aws.S3()
    // on resize l'image
    const buffer = await sharp(req.file.buffer)
        .resize({width: 500, height: 500})
        .toBuffer()
    // on crée les paramètres
    const dateNow = Date.now()
    const extension = req.file.mimetype.substr(req.file.mimetype.indexOf('/') + 1)
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${dateNow}-dechets.${extension}`,
        Body: buffer,
        ACL: "public-read"
    }
    // on upload sur le S3
    s3.upload(uploadParams, function (err, data) {
        if (err) res.status(500).send({message : "Upload impossible ❌"})
        if (data) res.status(200).send({file : data.Location})
    })
}