const Sequelize = require("sequelize");
const sequelize = require("./baza.js");

module.exports = function (sequelize, DataTypes) {
    const Upiti = sequelize.define('Upiti', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
       korisnik_id: {
        type: Sequelize.INTEGER,
        allowNull: true
       },
       nekretnina_id: {
        type: Sequelize.INTEGER,
        allowNull: true
       },
       tekst_upita: Sequelize.STRING
   });
   return Upiti;
}