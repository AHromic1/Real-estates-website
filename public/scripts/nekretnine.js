 //drugi zadatak
 //import prvog
 //console.log("ucitana skripta");
 //import { SpisakNekretnina } from "./SpisakNekretnina.js";  //trenutni folder



 /////
 let prosirenaNekretnina = null;
 let prosirenaSlika = null;
 let prethodnoDugme = null;
 let prethodnaLokacija = null;
 let prethodnaGod = null;
 let prethodnoOtvoriDugme = null;
 let idNekretnine = null;
 let spisakIds = [];

    function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
      // pozivanje metode za filtriranje
      let nekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
      // iscrtavanje elemenata u divReferenca element
      let divDetails = document.createElement("div");
       
      for(let x of nekretnine){
        console.log("nekretnina", x);
        spisakIds.push(x.id);
        console.log("U SPOJI NEKRETNINE IDS", spisakIds);
          let divNekretnina = document.createElement("div");
          let imgNekretnina = document.createElement("img");
          let divSubdetails = document.createElement("div");
          let p1 = document.createElement("p");
          let p2 = document.createElement("p");
          let p3 = document.createElement("p");
          let noviRed = document.createElement("br");
          let divButton = document.createElement("div");
          let detailsButton = document.createElement("button");
          detailsButton.textContent = "Detalji";
          let klikovi = document.createElement("p");
          klikovi.id = `klikovi-${x.id}`;
          let pretrage = document.createElement("p");
          pretrage.id = `pretrage-${x.id}`;
          console.log("klikovi.id", klikovi.id);
          let pLokacija = document.createElement("p");
          let pGodIzgradnje = document.createElement("p");
          let otvoriDetaljeBttn = document.createElement("button");
          detailsButton.setAttribute("id", `detalji-${x.id}`);
          pLokacija.style.display = "none";
          let prosireniDetalji;
          otvoriDetaljeBttn.textContent = "Otvori detalje";
          otvoriDetaljeBttn.style.display = "none";

          /////////////////////////////////////////////////////////
          detailsButton.addEventListener('click', function () {
            console.log("detalji kliknuti");
            console.log("prethodne na pocetku", prethodnoDugme, prethodnaLokacija, prethodnaGod);
           // detailsButton.display = "none";

            detailsButton.style.display = "none";
            otvoriDetaljeBttn.style.marginRight = "160px";
            otvoriDetaljeBttn.style.width = "200px";
            pLokacija.style.display = "inline";
            pLokacija.style.marginLeft = "20px";
            pLokacija.textContent = `Lokacija: ${x.lokacija}`;
            pGodIzgradnje.textContent = `Godina izgradnje: ${x.godina_izgradnje}`;
            pGodIzgradnje.style.display = "inline";
            otvoriDetaljeBttn.style.display = "inline";

            otvoriDetaljeBttn.addEventListener('click', function (){
              idNekretnine = x.id;
              localStorage.setItem("idNekretnine", idNekretnine);
              window.open('../detalji.html');
            });
            
            //console.log("prosirena nekretnina", prosirenaNekretnina);
            if (prosirenaNekretnina && prosirenaNekretnina !== divNekretnina) {
              prosirenaSlika.style.width = "300px";
              prosirenaNekretnina.style.width = "300px";
              prosirenaNekretnina.style.gridColumn = "span 1";
          }
          
          if(prethodnaLokacija && prethodnaLokacija != pLokacija){
            console.log("prethodna");
            prethodnaLokacija.style.display = "none";
            prethodnaGod.style.display = "none";
            prethodnoDugme.style.display = "inline";
            prethodnoOtvoriDugme.style.display = "none";
          }
     
            divNekretnina.style.width = "500px";
            imgNekretnina.style.width = "500px";
            divNekretnina.style.gridColumn = "span 2";
            //divDetails.style.columnGap = "220px";
            //divNekretnina.style.marginRight = "200px"
            let id = JSON.parse(this.getAttribute("data-id"));
            //console.log("Clicked Detalji for ID:", id);
        
  
            MarketingAjax.klikNekretnina(id);
            prosirenaNekretnina = divNekretnina;
            prosirenaSlika = imgNekretnina;

            prethodnoDugme = detailsButton;
            prethodnaLokacija = pLokacija;
            prethodnaGod = pGodIzgradnje;
            prethodnoOtvoriDugme = otvoriDetaljeBttn;
            console.log("prethodne", prethodnoDugme, prethodnaLokacija, prethodnaGod);

           //prosireniDetalji = divDetails;
            //console.log("prosirena 2", prosireniDetalji);
          });

          // pohranjivanje x.id u button (da bih mogla poslati id)
          detailsButton.setAttribute("data-id", JSON.stringify(x.id));

          if(x.tip_nekretnine === "Stan"){
          divNekretnina.classList.add("stan");
          imgNekretnina.src = '../images/stan1.jpg';
          imgNekretnina.alt = 'Stan';
          }
          else if(x.tip_nekretnine === "Kuća"){
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
          klikovi.classList.add("klikoviPos");
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
          divSubdetails.appendChild(klikovi);
          divSubdetails.appendChild(pretrage);
          divSubdetails.appendChild(pLokacija);
          divSubdetails.appendChild(pGodIzgradnje);
          //divSubdetails.appendChild(otvoriDetaljeBttn);
          detailsButton.value = 'Detalji';
          detailsButton.type = 'button';
          divButton.classList.add("centerAlign");
          divButton.classList.add("detailsButton");
          divNekretnina.appendChild(divButton);
          divButton.appendChild(detailsButton);
          divButton.appendChild(otvoriDetaljeBttn);
          if(divReferenca)
          divReferenca.appendChild(divDetails);

      }

      localStorage.setItem("nizIds", JSON.stringify(spisakIds));

  }

 
  
 //prijava update
 document.addEventListener('DOMContentLoaded', function () {
  const meni = document.getElementById('ucitaniMeni');
  
  meni.onload = function () {
    const meniSadrzaj = meni.contentDocument;
  
    if (meniSadrzaj) {
      const prijava = meniSadrzaj.getElementById('login');
      const odjava = meniSadrzaj.getElementById('logout');
  
  
      const isLoggedIn = localStorage.getItem('prijavljen') === 'true';
        console.log(isLoggedIn);

      meniSadrzaj.defaultView.updateMenuContent(isLoggedIn);
    }
  }
  });
 ////////////////

 //spajanje i filtriranje nekretnina
    
 window.onload = function() {
  //var nekretnineContainer = document.getElementById('stan');
  //PoziviAjax.impl_getNekretnine()
  let spisakNekretnine = null;
  let nekretnine = SpisakNekretnina();
  PoziviAjax.getNekretnine(function (error, data) {
    if (error) {
      console.error('Error fetching nekretnine:', error);
    } else {
      
      /////////////////////////////////////////////////////////////////////////
       //instanciranje modula
      ///let nekretnine = SpisakNekretnina();
      spisakNekretnine = data;
      nekretnine.init(data, null);  //ne trebaju mi korisnici
      const divStan = document.getElementById("stan");
      const divKuca = document.getElementById("kuca");
      const divPp = document.getElementById("pp");
      spojiNekretnine(divStan, nekretnine, "Stan");
      spojiNekretnine(divKuca, nekretnine, "Kuća");
      spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
      

    
    }
  });

  function filtriraj() {
   // console.log("usao u funkciju");
  let minCijena = parseInt(document.getElementById('minCijena').value);
  let maxCijena = parseInt(document.getElementById('maxCijena').value);
  let maxKvadratura = parseInt(document.getElementById('maxKvadratura').value);
  let minKvadratura = parseInt(document.getElementById('minKvadratura').value);
  let filterBttn = document.getElementById('filtrirajBttn');
  //let kriterij = {};
  if(!maxCijena)
  maxCijena = undefined; 
  if(!minCijena)
  minCijena = undefined; 
  if(!maxKvadratura)
  maxKvadratura = undefined; 
  if(!minKvadratura)
  minKvadratura = undefined; 

  let kriterij = {
    min_cijena: minCijena,
    max_cijena: maxCijena,
    max_kvadratura: maxKvadratura,
    min_kvadratura: minKvadratura
  };
 
  console.log(kriterij);
  console.log(nekretnine);
    //let nekretnine2 = SpisakNekretnina();
     // nekretnine2.init(nekretnine.spisakNekretnine, null);  //ne trebaju mi korisnici
     // console.log("nekretnine");
     // console.log(nekretnine2);
      let filtrirane = nekretnine.filtrirajNekretnine(kriterij);
      console.log("filtrirane");
      console.log(filtrirane);
      let nekretnine2 = SpisakNekretnina();
      nekretnine2.init(filtrirane, null);
      console.log("filtrirane");
      console.log(filtrirane);
      let divStan = document.getElementById("stan");
      let divKuca = document.getElementById("kuca");
      let divPp = document.getElementById("pp");
      console.log("zavrsio je s filtriranjem, ostalo je spajanje");
      //const noveNekretnine = nekretnine2.init(filtrirane, null);
      divStan.innerHTML = '';
      divKuca.innerHTML = '';
      divPp.innerHTML = '';

      divStan = document.getElementById("stan");
      divKuca = document.getElementById("kuca");
      divPp = document.getElementById("pp");

      spojiNekretnine(divStan, nekretnine2, "Stan");
      spojiNekretnine(divKuca, nekretnine2, "Kuća");
      spojiNekretnine(divPp, nekretnine2, "Poslovni prostor");
   
  
      MarketingAjax.novoFiltriranje(filtrirane);

  };
  const bttn = document.getElementById('filtrirajBttn');
  bttn.addEventListener('click', function () {
    filtriraj();
  });
};


