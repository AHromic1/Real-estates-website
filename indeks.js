const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
//const fs = require("fs");
const fs = require('fs').promises;  // Use fs.promises to get the promises version


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



//app.use(express.json()); // Parse JSON bodies
//app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies




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
    console.log("otvorena stranica");
    serveHtml('profil.html', res);
    console.log("otvorena stranica");
  });

  
  ////treba ubaciti hashirane lozinke u korisnike!
app.post('/login', async (req, res) => {
 // const { username, password } = req.body;

  try{
    let korisniciPut = path.join(__dirname, 'data', 'korisnici.json');
  const korisniciJson = await fs.readFile(korisniciPut, 'utf-8');
    const korisnici = JSON.parse(korisniciJson);
console.log(korisnici);
    const { username, password } = req.body;
    console.log("username");
    console.log(username);
    let korisnik;
    for (x of korisnici){
      if(x.username == username){
        korisnik = x;
        break;
      }
    }
    //const korisnik = korisnici.find((user) => user.username === username);
    //const idKorisnika = null;
  console.log("korisnik");
  console.log(korisnik);
  
  //req.session.uname = korisnik;
  console.log("LOGIN RUTA UNAME", req.session.uname);
  
console.log("nesto");
  if (!korisnik) {
    console.log("korisnik ne postoji");

    return res.status(401).json({ greska: 'Neuspješna prijava' });
  }
  

  
  bcrypt.compare(password, korisnik.password, (err, result) => {
    if (result) {
      console.log("password okej");

      req.session.uname = username;
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

 /* if (!req.session.uname) {  //uname je username! ako neko nije prijavljen ne treba mi se ni odjavljivati
    return res.status(401).json({ greska: 'Neautorizovan pristup' });
  }*/


   req.session.destroy((err) => {
    if (err) {
      console.error('Error while destroying session:', err);
      res.status(500).json({ greska: 'Neuspješna odjava' });
    } else {
      res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
    }
  });

});


app.get('/korisnik', async (req,res)=>{
   var korisnik =  req.session.uname;
   console.log("korisnik", korisnik);
   if(!korisnik){
    console.log("neautorizovan pristup");
    return res.status(401).json({ greska: 'Neautorizovan pristup'});
   }
   else{
    let korisniciPut = path.join(__dirname, 'data', 'korisnici.json');
    let korisniciJson = await fs.readFile(korisniciPut, 'utf-8');  //jedna tacka je za current directory!!!
    let korisniciPodaci = JSON.parse(korisniciJson);
    let trazeniId = null;
    for(k of korisniciPodaci){
      if(k.username == korisnik){
        trazeniId = k.id;
        break;
      }
    }

    const detalji = {
      id: korisniciPodaci[trazeniId].id,
      ime: korisniciPodaci[trazeniId].ime,
      prezime: korisniciPodaci[trazeniId].prezime,
      username: korisniciPodaci[trazeniId].username,
      password: korisniciPodaci[trazeniId].password
      //,slika: uname.url    kako???? 
    };
    //mozw i .user
    return res.status(200).json(detalji);
   }
});

app.post('/upit', async (req,res)=>{
  var korisnik = req.session.uname;
  if (!korisnik) {
    res.status(401).json({ greska: 'Neautorizovan pristup' });
    return;
  }

  const { nekretnina_id, tekst_upita } = req.body;

 
  const korisnikId = req.session.uname.id;

  const nekretnineData = await fs.readFile('nekretnine.json', 'utf-8');
    const nekretnine = JSON.parse(nekretnineData);
    const id_nekretnine = null;
    var trazenaNekretnina = null;
    for (nekretnina of nekretnine){
      if (nekretnina.id == nekretnina_id){
        trazenaNekretnina = nekretnina;
        id_nekretnine = nekretnina_id;
        break;
      }
    }
  
  if (!trazenaNekretnina) {
    res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
    return;
  }

  nekretnine[id_nekretnine].upiti.push({ id_korisnika: korisnik.id, tekst_upita:tekst_upita });


  fs.writeFile('nekretnine.json', JSON.stringify(nekretnine, null, 2))  //2 je za razmak, ljepse
    .then(() => {
      res.status(200).json({ poruka: 'Upit je uspješno dodan' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ greska: 'Internal Server Error' });
    });

});

app.put('/korisnik', async(req, res) =>{
    const {ime, prezime, username, password} = req.body;
    //////sta ako se azurira samo nesto???
    
    var korisnik = req.session.uname;
    if(!korisnik){
      return res.status(401).json({greska: 'Neautorizovan pristup'});
    }
    const korisniciJson = await fs.readFile('korisnici.json', 'utf-8');
    const korisnici = JSON.parse(korisniciJson);
    const idKorisnika = null;
    for (k of korisnici){
      if (k.id == korisnik.id){
        idKorisnika = k.id;
        break;
      }
    }
    korisnici[idKorisnika] = req.body;
    fs.writeFile('korisnici.json', JSON.stringify(korisnici, null, 2))
    .then(()=>{
      res.status(200).json({ poruka: 'Uspješna akcija' });
    }) .catch((error) => {
      console.error(error);
      res.status(500).json({ greska: 'Internal Server Error' });
    });
});


app.get('/nekretnine', async (req, res) => {
  try {

    const nekretninePath = path.join(__dirname, 'data', 'nekretnine.json');
    const nekretnineData = await fs.readFile(nekretninePath, 'utf-8');  //jedna tacka je za current directory!!!
    const nekretnine = JSON.parse(nekretnineData);

    res.status(200).json(nekretnine);
  } catch (error) {
    console.error(error);
    console.error('Error reading nekretnine.json:', error);
    res.status(500).json({ greska: 'Internal Server Error' });
  }});


  app.post('/marketing/nekretnine', async(req, res) => {
  //  const { nizNekretninaIds } = req.body.;

    try{
      req.session.nizPretragaIds = null; //restart na pocetku svakog filtriranja
      const {nizNekretninaIds} = req.body;
      req.session.nizPretragaIds = nizNekretninaIds;
     // const nizNekretninaIds = req.body.nizNekretninaIds;
      const nekretninePath = path.join(__dirname, 'data', 'marketing.json');
      const nekretnineData = await fs.readFile(nekretninePath, 'utf-8');  //jedna tacka je za current directory!!!
      let nekretnine = JSON.parse(nekretnineData);
      console.log("+", nekretnine);
      let rezultat = nekretnine;
    
      console.log( "-", nizNekretninaIds);
      let postoji = 0;
      let noviPodatak = {};
      for(x of nizNekretninaIds){
        let postoji = 0;
        for(el of nekretnine){
          console.log(el.pretrage);
            if(x == el.id){
              console.log("id", x);
              console.log("idJson", el.id);
              el.pretrage++;
              postoji = 1;
              console.log(el.pretrage);

            }
        }
        if(postoji === 0){
          console.log("x", x);
          console.log("postoji", postoji);
          nekretnine.push({id:x, pretrage: 1, klikovi: 0});
          console.log("ovdje");
          console.log("pushane nekretnine", nekretnine);
        }
       // postoji = 0;
      }
      console.log(nekretnine);
     
      await fs.writeFile(nekretninePath, JSON.stringify(nekretnine, null, 2), { encoding: 'utf-8' });
      res.status(200).send();
    }
    catch(error){
      res.status(500).send();
    }
  }
  );

  app.post('/marketing/nekretnine/:id', async(req, res) => {
    //  const { nizNekretninaIds } = req.body.;
  
      try{
        req.session.nizKlikovaIds = null; //restart na pocetku svakog filtriranja
      //const {nizNekretninaIds} = req.body;
      req.session.nizKlikovaIds = req.body;
        let x = JSON.parse(req.params.id);
        console.log("x", x);
        //const {nizNekretninaIds} = req.body;
       // const nizNekretninaIds = req.body.nizNekretninaIds;
        const nekretninePath = path.join(__dirname, 'data', 'marketing.json');
        const nekretnineData = await fs.readFile(nekretninePath, 'utf-8');  //jedna tacka je za current directory!!!
        let nekretnine = JSON.parse(nekretnineData);
        console.log("+", nekretnine);
        //let rezultat = nekretnine;
      
       // console.log( "-", nizNekretninaIds);
        
      
     
          let postoji = 0;
          for(el of nekretnine){
            console.log(el.pretrage);
              if(x == el.id){
                console.log("id", x);
                console.log("idJson", el.id);
                el.klikovi++;
                postoji = 1;
                console.log(el.pretrage);
                break;
  
              }
          }
          if(postoji === 0){
            console.log("x", x);
            console.log("postoji", postoji);
            nekretnine.push({id:x, pretrage: 0, klikovi: 1});
            console.log("ovdje");
            console.log("pushane nekretnine", nekretnine);
          }
         // postoji = 0;
        
        console.log(nekretnine);
       
        await fs.writeFile(nekretninePath, JSON.stringify(nekretnine, null, 2), { encoding: 'utf-8' });
        res.status(200).send();
      }
      catch(error){
        res.status(500).send();
      }
    }
    );

    app.post('/marketing/osvjezi', async(req, res) => {
      try{
        console.log("uslo se u marketing/osvjezi");
      const {nizNekretnina} = req.body;
      if(Object.keys(req.body).length > 0){  //ako tijelo nije prazno
        req.session.nizNekretninaS = req.body;  //pohranim podatke u sesiju
      }
      else{  //ako tijelo jeste prazno, uzimam podatke pohranjene ranije u sesiji
        //ako se pohranjivanje nije nikad desilo, onda se nista nece ni desiti, kako treba i biti po postavci zadatka
        nizNekretnina = req.session.nizNekretninaS;

      }
      console.log("niz nekretnina",nizNekretnina);
      //req.session.nizNekretnina = nizNekretnina;
      //let osvjezene = {};
      let osvjezene = [];
      
      const nekretninePath = path.join(__dirname, 'data', 'marketing.json');
      const nekretnineData = await fs.readFile(nekretninePath, 'utf-8');  //jedna tacka je za current directory!!!
      let nekretnine = JSON.parse(nekretnineData);
      
      console.log("nekretnine", nekretnine);
      for(x of nizNekretnina){
        for(el of nekretnine){
        if(x === el.id){
          osvjezene.push(el);
        }

        }
      }
      console.log("osvjezene iz servera", osvjezene);
      res.status(200).send({nizNekretnina: osvjezene}); //{nizNekretnina: osvjezene}
      }
      catch(error){
        res.status(500).send(error);
      }
    });

   /* app.post('/marketing/osvjezi', async (req, res) => {
      try {
      
          const { nizNekretnina } = req.body;
          console.log("niz nekretnina", nizNekretnina);
  
          let osvjezene = [];
          const nekretninePath = path.join(__dirname, 'data', 'marketing.json');
          const nekretnineData = await fs.readFile(nekretninePath, 'utf-8');
          let nekretnine = JSON.parse(nekretnineData);
          console.log("nekretnine", nekretnine);
  
          for (x of nizNekretnina) {
              for (el of nekretnine) {
                  if (x === el.id) {
                      osvjezene.push(el);
                  }
              }
          }

          console.log("osvjezene iz servera", osvjezene);
  
          res.status(200).send(osvjezene); 
      } catch (error) {
          console.error(error);
          res.status(500).send();
      }
  });*/
  

  


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});




