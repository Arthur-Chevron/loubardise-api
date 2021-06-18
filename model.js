module.exports = (sequelize, Sequelize) => {
    return sequelize.define("dechets", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        urlfile:{
            type: Sequelize.STRING
        },
        latitude:{
            type: Sequelize.STRING
        },
        longitude:{
            type: Sequelize.STRING
        },
        typedechets:{
            type: Sequelize.STRING
        },
        see:{
            type: Sequelize.BOOLEAN
        }
    })
};
