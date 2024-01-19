const db = require("./baza.js");

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
//const fs = require("fs");
const fs = require('fs').promises;  


const app = express();

app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/public/html"));
app.use(express.static(__dirname+"/public/css"));
app.use(express.static(__dirname+"/public/images"));
app.use(express.static(__dirname+"/public/scripts"));

app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//files iz static direktorija

const path = require('path');
//const fs = require('fs').promises;
const port = 3000;


app.use(express.static('public'));


const serveHtml = async (fileName, res) => {
  try {
    const filePath = path.join(__dirname, 'public','html', fileName);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    res.send(fileContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Doslo je do greske.');
  }
};

app.get('/nekretnine.html', (req, res) => {
  console.log("otvorene su nekretnine");
  serveHtml('nekretnine.html', res);  //sve smjestam u response
});


app.get('/detalji.html', (req, res) => {
  serveHtml('detalji.html', res);
});
app.get('/prijava.html', (req, res) => {
    serveHtml('prijava.html', res);
});

  app.get('/profil.html', (req, res) => {
    const isLoggedIn = localStorage.getItem('prijavljen') === 'true';
   
   if(!isLoggedIn){
    return res.status(404).json({greska: 'Neautorizovan pristup'});}
   else{
    serveHtml('profil.html', res);
   }
  });
  
  //potrebno je 2 puta kliknuti na prijava ukoliko lozinka nije hashirana (hash radim u prijavi, s obzirom na to da 
  //nije receno gdje, a ne postoji opcija registracije gdje bi se ovaj hash mogao uraditi)
app.post('/login', async (req, res) => {
  try{
    const { username, password } = req.body;
    let korisnik = await db.korisnici.findOne({where: {username: username}});
  if (!korisnik) {
    console.log("korisnik ne postoji");
    return res.status(401).json({ greska: 'Neuspješna prijava' });
  }
  
//////
  const isHashed = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/.test(korisnik.password);

  if (!isHashed) {
    bcrypt.hash(korisnik.password, 10, async (error, hash) => {
      if (error) {
        console.error('greska u hashiranju:', error);
        return res.status(500).json({ greska: 'Neuspješna prijava' });
      } else {
        korisnik.password = hash;
        await korisnik.save();
      }
    });
  }
  
  bcrypt.compare(password, korisnik.password, (err, result) => {
    if (result) {
      console.log("password okej");

      req.session.uname = username;
      req.session.uspjesnaPrijava = true;
      return res.status(200).json({ poruka: 'Uspješna prijava' });
    } else {
      console.log("password nije okej");

      return res.status(401).json({ greska: 'Neuspješna prijava' });
    }
  });

  }
catch(error){
  console.error('Error:', error);
  res.status(500).json({ greska: 'parsiranje pogresno'});
}
});

  
app.post('/logout', (req, res) => {

   req.session.destroy((err) => {
    if (err) {
      console.error('Error while destroying session:', err);
      res.status(500).json({ greska: 'Neuspješna odjava' });
    } else {
      res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
    }
  });

});


app.get('/korisnik', async (req,res) => {
   var korisnickoIme =  req.session.uname;
    console.log("username", korisnickoIme);
   if(!korisnickoIme){
    console.log("neautorizovan pristup");
    return res.status(401).json({ greska: 'Neautorizovan pristup'});
   }
   else{
    let korisnik = await db.korisnici.findOne({where: {username: korisnickoIme}});

    //let korisnik = await db.korisnici.findOne({where: {username}});
    return res.status(200).json(korisnik);
   }
  
});

app.post('/upit', async (req,res)=>{
  try{
  var korisnickoIme = req.session.uname;
  if (!korisnickoIme) {
    res.status(401).json({greska: 'Neautorizovan pristup'});
    return;
  }

  const {nekretnina_id, tekst_upita } = req.body;

  let korisnik = await db.korisnici.findOne({where: {username: korisnickoIme}});
  let nekretnina = await db.nekretnine.findByPk(nekretnina_id);
  
  if (nekretnina === null) {
    res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
    return;
  }

  if (korisnik === null) {
    res.status(400).json({ greska: `Korisnik ne postoji` });
    return;
  }

  let upit = await db.upiti.create({korisnik_id:korisnik.id, nekretnina_id: nekretnina.id, tekst_upita});
  res.status(200).json({ poruka: 'Upit je uspješno dodan' });
  }
  catch(error) {
      console.error(error);
      res.status(500).json({ greska: 'Greška' });
    };

});

app.put('/korisnik', async(req, res) => {
  try{
    const {ime, prezime, username, password} = req.body;
   
    var korisnickoIme = req.session.uname;
    if(!korisnickoIme){
      return res.status(401).json({greska: 'Neautorizovan pristup'});
    }
    let korisnik = await db.korisnici.findOne({where: {username: korisnickoIme}});

    if(ime) korisnik.ime = ime;
    if(prezime) korisnik.prezime = prezime;
    if(username) korisnik.username = username;
    if(password) {
      let hashiranPassword = await bcrypt.hash("password", 10);
      korisnik.password = hashiranPassword;
    }
    await korisnik.save();
    return res.status(200).json({poruka: 'Uspjesno ste updateovali'});
  }
  catch(error){
    console.log(error);
    return res.status(500).json({greska: 'Greska'});
  }
   
});


app.get('/nekretnine', async (req, res) => {
  try {
    let nekretnine = await db.nekretnine.findAll();
    res.status(200).json(nekretnine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ greska: 'Greška' });
  }});


  app.post('/marketing/nekretnine', async(req, res) => {
    try{
      const {nizNekretninaIds} = req.body;
      for(x of nizNekretninaIds){
        let nekretnina = await db.nekretnine.findByPk(x);
        nekretnina.pretrage += 1;
        await nekretnina.save();
      }
      
      res.status(200).send();
    }
    catch(error){
      console.log(error);
      res.status(500).send();
    }
  }
  );

  app.post('/marketing/nekretnine/:id', async(req, res) => {
      try{
        let x = JSON.parse(req.params.id);
        let nekretnina = await db.nekretnine.findByPk(x);
        nekretnina.klikovi += 1;
        await nekretnina.save();

        res.status(200).send();
      }
      catch(error){
        console.log(error);
        res.status(500).send();
      }
    }
  );
      
     
    app.post('/marketing/osvjezi', async(req, res) => {
      try {
          let {nizNekretnina} = req.body;
          
          if (Object.keys(req.body).length !== 0) {
              req.session.nizNekretninaS = req.body;
          } 
          else {
             // console.log("tijelo je prazno", req.session.nizNekretninaS);
              if(req.session.nizNekretninaS)
              nizNekretnina = req.session.nizNekretninaS.nizNekretnina;
              //console.log("PODACI IZ SESIJE", nizNekretnina);
          }
          
          let osvjezene = [];
        
          if (!Array.isArray(nizNekretnina)) {
            return;
          }

          for (x of nizNekretnina) {
            let nekretnina = await db.nekretnine.findByPk(x);
            osvjezene.push(nekretnina);
            }
            console.log("OSVJEZENE", osvjezene);

          res.status(200).send({ nizNekretnina: osvjezene}); //{nizNekretnina: osvjezene}
      } 
      catch (error) {
          console.error("Error in /marketing/osvjezi:", error);
          res.status(500).send(error);
      }
  });
   
  app.get('/nekretnina/:id', async(req, res) => {
      try{
        let x = req.params["id"];
        let nekretnina = await db.nekretnine.findByPk(x);
        console.log("NEKRETNINA", nekretnina);
        if(!nekretnina){ 
          res.status(400).send({greska: `Nekretnina sa id-em ${x} ne postoji`});
        }
        let upiti = await db.upiti.findAll({where: {nekretnina_id: x}});
        console.log("UPITI", upiti);
        res.status(200).send({nekretnina: nekretnina, upiti: upiti});
      }
      catch(error){
        console.log(error);
        res.status(500).send();
      }
    }
    );


    app.get('/korisnik/:id', async(req, res) => {
        try{
          let x = JSON.parse(req.params.id);
          let korisnik = await db.korisnici.findByPk(x);
          if(!korisnik){ 
            res.status(400).send({greska: `Korisnik sa id-em ${x} ne postoji`});
          }
          res.status(200).send({username: korisnik.username});
        }
        catch(error){
          console.log(error);
          res.status(500).send();
        }
      }
    );

app.listen(3000, () => {
  console.log('Server pokrenut na portu 3000');
});




