console.log("uslo se u upite.js");
//let divRef2 = document.getElementById("detalji");
    console.log("div s detaljima", divRef);
   // let idNekretnine = localStorage.idNekretnine;
    console.log("idNekretnine", idNekretnine);

    PoziviAjax.getNekretnina(idNekretnine, function(error, data){
        if(data){
            spojiUpite(divRef, data.nekretnina);
        }
        else{
            console.log("Doslo je do greske.");
        }
    });
    let username;
function spojiUpite(divReferenca, nekretnina) {
    console.log("spojiDetalje je pozvana"); 
    
            //treca cjelina
           let h33 = document.createElement("h3");
            h33.classList.add("posSubheading2");
            h33.textContent ="UPITI";
            divReferenca.appendChild(h33);
            let divUpiti = document.createElement("div");
            let ul = document.createElement("ul");
            let listaUpita = nekretnina.upiti;
            console.log("listaupita", listaUpita);
            for(let upit of listaUpita){
              console.log("UPIT", upit);
              console.log("upit ID", upit.korisnik_id);
              PoziviAjax.getKorisnikById(upit.korisnik_id, function(error, data){
                if(data){
                  username = data.korisnik.username;
                  console.log("data korisnik", data);
                  console.log("upit iz liste", upit);
                  let li1 = document.createElement("li");
                  let divListaUpita = document.createElement("div");
                  divListaUpita.classList.add("upit");
                  divListaUpita.classList.add("posSubheading2");
                  let pUsername = document.createElement("p");
                  let pUpit = document.createElement("p");
                  li1.appendChild(divListaUpita);
                  divListaUpita.appendChild(pUsername);
                  divListaUpita.appendChild(pUpit);
                  ul.appendChild(li1);
                  divUpiti.appendChild(ul);
                  divReferenca.appendChild(divUpiti);
            
            //PoziviAjax.getKorisnikById(upit.id_korisnika);
        
            pUsername.innerHTML= `<b>${username}</b>`;
            console.log("tekst", upit.tekst_upita);
            pUpit.textContent = upit.tekst_upita;
                }
              }); 
              
        }
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

      //posalji upit
      let posaljiButton = document.getElementById("posaljiBttn");
      let noviUpit = document.getElementById("noviUpit");
      posaljiButton.addEventListener('click', function () {
        console.log("clidkedddd");
       // localStorage.clear(); pr na piazzi
        const upitTekst = noviUpit.value;
        console.log(upitTekst);
        //////////////////////////////////login///////////////////////////////////////////////////////
        
        PoziviAjax.postUpit(idNekretnine, upitTekst, function (error, data) {
         // console.log("desilo se ovo");
      if (error===null && data && data.poruka=='Upit je uspješno dodan') {
        console.log("Uspjesno dodavanje upita.");
    
      } else {
      console.error('Doslo je do greske:', error);
      }
    });
        //////////////////////////////////////////////////////////////////////////////////////////////
      });
