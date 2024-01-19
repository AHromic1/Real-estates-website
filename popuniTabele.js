const db = require('./baza.js');  //lv10

function init() {
    var nekretninePromises = [];
    var korisniciPromises = [];
    return new Promise(function (resolve, reject) {

        nekretninePromises.push(
        db.nekretnine.bulkCreate([
            {
                "id": 1,
                "tip_nekretnine": "Stan",
                "naziv": "Useljiv stan Sarajevo",
                "kvadratura": 58,
                "cijena": 232000,
                "tip_grijanja": "plin",
                "lokacija": "Novo Sarajevo",
                "godina_izgradnje": 2019,
                "datum_objave": "01.10.2023.",
                "opis": "Sociis natoque penatibus.",
                "klikovi": 50,
                "pretrage": 3
              },
              {
                "id": 2,
                "tip_nekretnine": "Poslovni prostor",
                "naziv": "Mali poslovni prostor",
                "kvadratura": 20,
                "cijena": 70000,
                "tip_grijanja": "struja",
                "lokacija": "Centar",
                "godina_izgradnje": 2005,
                "datum_objave": "20.08.2023.",
                "opis": "Magnis dis parturient montes.",
                "klikovi": 52,
                "pretrage": 3
              },
              {
                "id": 3,
                "tip_nekretnine": "Poslovni prostor",
                "naziv": "Mali poslovni prostor",
                "kvadratura": 20,
                "cijena": 70000,
                "tip_grijanja": "struja",
                "lokacija": "Centar",
                "godina_izgradnje": 2005,
                "datum_objave": "20.08.2023.",
                "opis": "Magnis dis parturient montes.",
                "klikovi": 50,
                "pretrage": 3
              },
              {
                "id": 4,
                "tip_nekretnine": "Poslovni prostor",
                "naziv": "Mali poslovni prostor",
                "kvadratura": 20,
                "cijena": 70000,
                "tip_grijanja": "struja",
                "lokacija": "Centar",
                "godina_izgradnje": 2005,
                "datum_objave": "20.08.2023.",
                "opis": "Magnis dis parturient montes.",
                "klikovi": 50,
                "pretrage": 3
              },
              {
                "id": 5,
                "tip_nekretnine": "Kuća",
                "naziv": "Mali poslovni prostor",
                "kvadratura": 20,
                "cijena": 70000,
                "tip_grijanja": "struja",
                "lokacija": "Centar",
                "godina_izgradnje": 2005,
                "datum_objave": "20.08.2023.",
                "opis": "Magnis dis parturient montes.",
                "klikovi": 50,
                "pretrage": 3
              }
            ])
        );

        korisniciPromises.push(
            db.korisnici.bulkCreate([  //moze ovako da kreiram vise odjednom
                {ime: 'Amina', prezime: 'Hromic', username: 'username1', password: '$2a$10$u049Jwm8gns6ywNopiNkH.VmBXjpCjOHvSCO7OpB.QyixG7Cp3pmK'},
                {ime: 'Amina', prezime: 'Hromic', username: 'ahromic1', password: '$2b$10$m9RIH91kclT.MLqyBrjEhe4ahnAu0aXbYOv30uufkh99NZmqkrl9m'},//amina123
                {ime: 'Neko2', prezime: 'Nekic3', username: 'username3', password: '$2b$10$Yy/.A9zKwYth66pbq8S4UOpZjLE08.04rewbzUTgjBvhHBj1ep8ey'}
            ])
        );

        Promise.all(korisniciPromises).then(function () {
            Promise.all(nekretninePromises).then(function () {
                db.upiti.bulkCreate([
                    {tekst_upita: "Prvi upit", korisnik_id: 1, nekretnina_id: 1},
                    {tekst_upita: "Drugi upit", korisnik_id: 2, nekretnina_id: 1},
                    {tekst_upita: "Treci upit", korisnik_id: 2, nekretnina_id: 1},
                    {tekst_upita: "Cetvrti upit", korisnik_id: 2, nekretnina_id: 2},
                    {tekst_upita: "Peti upit", korisnik_id: 3, nekretnina_id: 2},
                    {tekst_upita: "Sesti upit", korisnik_id: 3, nekretnina_id: 3}
                ]).then(function () {
                    resolve();
                }).catch(function (err) {
                    reject();
                });
            }).catch(function (err) {
            });
        }).catch(function (err) {
        });
    });
}


db.sequelize.sync({force: true}).then(function () {
    init().then(function () {
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});