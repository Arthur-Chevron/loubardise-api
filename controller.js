const db = require('./index.js')
const Op = db.Sequelize.Op
const Dechets = db.dechets


exports.getAllDechets = function(req, res){
    Dechets.findAll({
        attributes: ['urlfile', 'latitude', 'longitude', 'typedechets'],
        where: {
            [Op.not]: {see : false}
        }
    }).then(dechetTab =>{
        res.status(200).send(dechetTab)
    }).catch(err =>{
        res.status(500).send(err.message)
    })
}
/*
exports.getDechetsByLocation = function(req, res){

}*/

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