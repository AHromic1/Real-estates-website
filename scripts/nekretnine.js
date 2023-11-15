 //drugi zadatak
 //import prvog
 //console.log("ucitana skripta");
 //import { SpisakNekretnina } from "./SpisakNekretnina.js";  //trenutni folder
 /////

    function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
      // pozivanje metode za filtriranje
      instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
      // iscrtavanje elemenata u divReferenca element
      let nekretnine = instancaModula.listaNekretnina;
      for(let x of nekretnine){
          let p1 = document.createElement("p");
          let p2 = document.createElement("p");
          let p3 = document.createElement("p");
          let noviRed = document.createElement("br");

          p1.textContent = x.naziv;
          p2.textContent = x.cijena + " KM";
          p3.textContent = x.kvadratura + "m2"; 
          divReferenca.appendChild(p1);
          divReferenca.appendChild(noviRed);
          divReferenca.appendChild(p2);
          divReferenca.appendChild(noviRed);
          divReferenca.appendChild(p3);
          divReferenca.appendChild(noviRed);
      }
  }
  
  const divStan = document.getElementById("stan");
  const divKuca = document.getElementById("kuca");
  const divPp = document.getElementById("pp");
  
  const listaNekretnina = [{
      id: 1,
      tip_nekretnine: "Stan",
      naziv: "Useljiv stan Sarajevo",
      kvadratura: 58,
      cijena: 232000,
      tip_grijanja: "plin",
      lokacija: "Novo Sarajevo",
      godina_izgradnje: 2019,
      datum_objave: "01.10.2023.",
      opis: "Sociis natoque penatibus.",
      upiti: [{
          korisnik_id: 1,
          tekst_upita: "Nullam eu pede mollis pretium."
      },
      {
          korisnik_id: 2,
          tekst_upita: "Phasellus viverra nulla."
      }]
  },
  {
      id: 2,
      tip_nekretnine: "Poslovni prostor",
      naziv: "Mali poslovni prostor",
      kvadratura: 20,
      cijena: 70000,
      tip_grijanja: "struja",
      lokacija: "Centar",
      godina_izgradnje: 2005,
      datum_objave: "20.08.2023.",
      opis: "Magnis dis parturient montes.",
      upiti: [{
          korisnik_id: 2,
          tekst_upita: "Integer tincidunt."
      }
      ]
  }]
  
  const listaKorisnika = [{
      id: 1,
      ime: "Neko",
      prezime: "Nekic",
      username: "username1",
  },
  {
      id: 2,
      ime: "Neko2",
      prezime: "Nekic2",
      username: "username2",
  }]
  
  //instanciranje modula
  let nekretnine = SpisakNekretnina();
  nekretnine.init(listaNekretnina, listaKorisnika);
  
  //pozivanje funkcije
  spojiNekretnine(divStan, nekretnine, "Stan");
  spojiNekretnine(divKuca, nekretnine, "Kuća");
  spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
  