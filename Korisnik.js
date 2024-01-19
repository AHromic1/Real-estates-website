const Sequelize = require("sequelize");
const sequelize = require("./baza.js");

module.exports = function (sequelize, DataTypes) {
    const Korisnici = sequelize.define('Korisnik', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
       ime: Sequelize.STRING,
       prezime: Sequelize.STRING,
       username: Sequelize.STRING,
       password: Sequelize.STRING
   },
   {
    tableName: 'Korisnik',
    timestamps: false
       
    });
   return Korisnici;
}