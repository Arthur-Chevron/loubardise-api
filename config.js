module.exports = {
    PORT:"5432",
    HOST: "database-1-loubardise.csouvphig4ch.eu-west-3.rds.amazonaws.com",
    USER: "postgres",
    PASSWORD: "LeMotDePasseDeLaLoubardise",
    DB: "myDatabase",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}