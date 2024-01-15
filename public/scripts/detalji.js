console.log("uslo se u detalji.js");
let divRef = document.getElementById("detalji");
    console.log("div s detaljima", divRef);
    let idNekretnine = localStorage.idNekretnine;
    console.log("idNekretnine", idNekretnine);

    PoziviAjax.getNekretnina(idNekretnine, function(error, data){
        if(data){
            console.log("ima data");
            console.log("data", data.nekretnina.id);
            let nekretn = data;
            console.log(nekretn.id);
            spojiDetalje(divRef, data.nekretnina);
        }
        else{
            console.log("Doslo je do greske.");
        }
    });

function spojiDetalje(divReferenca, nek) {
    console.log("spojiDetalje je pozvana");

            console.log("Nekretnina", nek);
            divReferenca.classList.add("alignment");
            let h3 = document.createElement("h3");
            h3.classList.add("posSubheading1");
            h3.textContent = "OSNOVNO";
            h3.style.marginTop = "100px";
            divReferenca.appendChild(h3);
            let divOsnovno = document.createElement("div");
            let divCenter = document.createElement("div");
            divCenter.classList.add("centerAlign");
            divCenter.classList.add("pos");
            let image = document.createElement("img");
            image.src = "../images/detailsKuca.jpg";  //provjeriti sta za slike
            image.alt = "Koliba";
            divCenter.appendChild(image);
            divOsnovno.appendChild(divCenter);
            let pNaziv = document.createElement("p");
            let pKvadratura = document.createElement("p");
            let pCijena = document.createElement("p");
            
            pNaziv.textContent = `Naziv: ${nek.naziv}`;
            pKvadratura.textContent = `Kvadratura: ${nek.kvadratura}`;
            pCijena.textContent = `Cijena: ${nek.cijena}`;
            divOsnovno.appendChild(pNaziv);
            divOsnovno.appendChild(pKvadratura);
            divOsnovno.appendChild(pCijena);
            divReferenca.appendChild(divOsnovno);
            //iduca cjelina
            let h32 = document.createElement("h3");
            h32.classList.add("posSubheading1");
            let divDetalji = document.createElement("div");
            //tabela
            let tabela = document.createElement("table");
            // prvi red
            let red1 = document.createElement("tr");
            let celija11 = document.createElement("td");
            let celija12 = document.createElement("td");
            let p11 = document.createElement("p");
            let p12 = document.createElement("p");
            p11.className = "pos";  
            p11.innerHTML = `<b>Tip grijanja: </b> ${nek.tip_grijanja}`;
            celija11.appendChild(p11);
            p12.className = "pos";
            p12.innerHTML = `<b>Godina izgradnje: </b> ${nek.godina_izgradnje}`;
            celija12.appendChild(p12);
            red1.appendChild(celija11);
            red1.appendChild(celija12);
            tabela.appendChild(red1);
            //drugi red
            let red2 = document.createElement("tr");
            let celija21 = document.createElement("td");
            let celija22 = document.createElement("td");
            let p21 = document.createElement("p");
            let p22 = document.createElement("p");
            p21.className = "pos";  
            p21.innerHTML = `<b>Lokacija: </b> ${nek.lokacija}`;
            celija21.appendChild(p21);
            p22.className = "pos";
            p22.innerHTML = `<b>Datum objave: </b> ${nek.datum_objave}`;
            celija22.appendChild(p22);
            red2.appendChild(celija21);
            red2.appendChild(celija22);
            tabela.appendChild(red2);
            //treci red
            let red3 = document.createElement("tr");
            let celija31 = document.createElement("td");
            celija31.colSpan = 2;
            let p31 = document.createElement("p");
            p31.className = "pos";  
            p31.innerHTML = `<b> Opis: </b> ${nek.godina_izgradnje}`;
            celija31.appendChild(p31);
            red3.appendChild(celija31);
            tabela.appendChild(red3);
            divDetalji.appendChild(tabela);
            divReferenca.appendChild(divDetalji);
    }
    


    document.addEventListener('DOMContentLoaded', function () {
        const meni = document.getElementById('ucitaniMeni3');
      
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
