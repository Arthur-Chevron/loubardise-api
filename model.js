module.exports = (sequelize, Sequelize) => {
    return sequelize.define("dechets", {
        description: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
};
