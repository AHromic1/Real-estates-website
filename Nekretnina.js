const Sequelize = require("sequelize");
const sequelize = require("./baza.js");

module.exports = function (sequelize, DataTypes) {
    const Nekretnine = sequelize.define('Nekretnina', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
       tip_nekretnine: Sequelize.STRING,
       naziv: Sequelize.STRING,
       kvadratura: Sequelize.INTEGER,
       cijena: Sequelize.DOUBLE,
       tip_grijanja: Sequelize.STRING,
       lokacija: Sequelize.STRING,
       godina_izgradnje: Sequelize.INTEGER,
       datum_objave: Sequelize.STRING,
       opis: Sequelize.STRING,
       klikovi: Sequelize.INTEGER,
       pretrage: Sequelize.INTEGER
   },
   {
    tableName: 'Nekretnina',
    timestamps: false
    });
   return Nekretnine;
}