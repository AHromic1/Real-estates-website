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
          let detailsButton = document.createElement("button");
          let klikovi = document.createElement("p");
          let pretrage = document.createElement("p");
          klikovi.setAttribute("id", `pretrage-${x.id}`); 
          pretrage.setAttribute("id", `klikovi-${x.id}`);
          detailsButton.setAttribute("id", `detalji-${x.id}`);

          detailsButton.addEventListener('click', function () {
            // ovdje event listener
            let id = JSON.parse(this.getAttribute("data-id"));
            console.log("Clicked Detalji for ID:", id);
        
            MarketingAjax.marketingNekretnineId(id, function (error, data) {
              if (error) {
                //console.log("neuspjeh");
              } else {
               // console.log("uspjeh");
              }
            });
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
          if(divReferenca)
          divReferenca.appendChild(divDetails);

      }
  }
  
  /*const divStan = document.getElementById("stan");
  const divKuca = document.getElementById("kuca");
  const divPp = document.getElementById("pp");*/
  
  //instanciranje modula
  //let nekretnine = SpisakNekretnina();
  //nekretnine.init(listaNekretnina, listaKorisnika);
  
  //pozivanje funkcije
  ////spojiNekretnine(divStan, nekretnine, "Stan");
  //spojiNekretnine(divKuca, nekretnine, "Kuća");
 // spojiNekretnine(divPp, nekretnine, "Poslovni prostor");

  const kriterij = {
    min_cijena:"100000"
};


//console.log("testiranje");
////let rez = nekretnine.filtrirajNekretnine(kriterij);
///console.log(rez);