module.exports = (sequelize, Sequelize) => {
    return sequelize.define("dechets", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        urlFile:{
            type: Sequelize.STRING
        },
        latitude:{
            type: Sequelize.STRING
        },
        longitude:{
            type: Sequelize.STRING
        },
        typeDechets:{
            type: Sequelize.STRING
        },
        See:{
            type: Sequelize.BOOLEAN
        }
    })
};
