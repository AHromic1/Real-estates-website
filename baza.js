const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24", "root", "password", {
    host: "localhost",
    dialect: "mysql"
});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//tabele  __dirname, 'data', 'korisnici.json'
db.nekretnine = require("./Nekretnina.js")(sequelize);
db.korisnici = require("./Korisnik.js")(sequelize);
db.upiti = require("./Upit.js")(sequelize);

//relacije izmedju tabela
db.nekretnine.hasMany(db.upiti, { foreignKey: 'nekretnina_id' });
db.korisnici.hasMany(db.upiti, { foreignKey: 'korisnik_id' });

//eksport baze
module.exports = db;

//module.exports = sequelize;