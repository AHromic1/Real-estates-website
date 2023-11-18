 //drugi zadatak
 //import prvog
 //console.log("ucitana skripta");
 //import { SpisakNekretnina } from "./SpisakNekretnina.js";  //trenutni folder
 /////

    function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
      // pozivanje metode za filtriranje
      let nekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
      // iscrtavanje elemenata u divReferenca element
      let divDetails = document.createElement("div");
       
      for(let x of nekretnine){
          let divNekretnina = document.createElement("div");
          let imgNekretnina = document.createElement("img");
          let divSubdetails = document.createElement("div");
          let p1 = document.createElement("p");
          let p2 = document.createElement("p");
          let p3 = document.createElement("p");
          let noviRed = document.createElement("br");
          let divButton = document.createElement("div");
          let detailsButton = document.createElement("input");
        
          if(x.tip_nekretnine === "Stan"){
          divNekretnina.classList.add("stan");
          imgNekretnina.src = '../images/stan1.jpg';
          imgNekretnina.alt = 'Stan';
          }
          else if(x.tip_nekretnine === "Kuca"){
            divNekretnina.classList.add("kuca");
            imgNekretnina.src = '../images/kuca2.jpg';
            imgNekretnina.alt = 'Kuca';
            }
          
          else{
            divNekretnina.classList.add("pp");
            imgNekretnina.src = '../images/pp1.jpg';
            imgNekretnina.alt = 'Poslovni prostor';
            }
         
          divDetails.classList.add("details");
          imgNekretnina.classList.add("pictures");
          imgNekretnina.classList.add("centerAlign");
          divSubdetails.classList.add("subdetails");
          divNekretnina.appendChild(imgNekretnina);
          divNekretnina.appendChild(divSubdetails);
          p1.classList.add("leftAlign");
          p2.classList.add("rightAlign");
          p3.classList.add("leftAlign");
          p1.textContent = x.naziv;
          p2.textContent = x.cijena + " KM";
          p3.textContent = x.kvadratura + "m2"; 
          divDetails.appendChild(divNekretnina);
          divSubdetails.appendChild(p1);
          divSubdetails.appendChild(noviRed);
          divSubdetails.appendChild(p2);
          divSubdetails.appendChild(noviRed);
          divSubdetails.appendChild(p3);
          divSubdetails.appendChild(noviRed);
          detailsButton.value = 'Detalji';
          detailsButton.type = 'button';
          divButton.classList.add("centerAlign");
          divButton.classList.add("detailsButton");
          divNekretnina.appendChild(divButton);
          divButton.appendChild(detailsButton);
          divReferenca.appendChild(divDetails);

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
  