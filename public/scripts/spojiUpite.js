console.log("uslo se u upite.js");
//let divRef2 = document.getElementById("detalji");
    console.log("div s detaljima", divRef);
   // let idNekretnine = localStorage.idNekretnine;
    console.log("idNekretnine", idNekretnine);
    let username = null;            
    let divUpiti = null;
    let ul = null;

    PoziviAjax.getNekretnina(idNekretnine, function(error, data){
        if(data){
          console.log("DATA IZ UPITA", data);
            spojiUpite(divRef, data.nekretnina, data.upiti);
            //spojiNoveUpite(divRef);
        }
        else{
            console.log("Doslo je do greske.");
        }
    });

function spojiUpite(divReferenca, nekretnina, upiti) {
    console.log("spojiUpite je pozvana"); 
            //treca cjelina
           let h33 = document.createElement("h3");
            h33.classList.add("posSubheading2");
            h33.textContent ="UPITI";
            divReferenca.appendChild(h33);
            divUpiti = document.createElement("div");
            ul = document.createElement("ul");
            console.log("NEKRETNINA", nekretnina);
            let listaUpita = upiti;
            console.log("listaupita", listaUpita);
            let usaoUPetlju = false;
            for(let upit of listaUpita){
              usaoUPetlju = true;
              console.log("UPIT", upit);
              console.log("upit ID", upit.korisnik_id);
              PoziviAjax.getKorisnikById(upit.korisnik_id, function(error, data){
                if(data){
                  console.log("DATA ZA KORISNIKA", data);
                  username = data.username;
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
              ////////
            }
         // spojiNoveUpite(divReferenca);
    }
    
    function spojiNoveUpite(divReferenca){
      let divUpitiNovi = document.createElement("div");
      console.log("OVDJE");
      divUpitiNovi.classList.add("alignment");
      let labela = document.createElement("label");
      labela.setAttribute("for", "noviUpit");
      labela.textContent = "Novi upit";
      let upitInput = document.createElement("input");
      console.log("OVDJE2");
      upitInput.classList.add("alignment");
      upitInput.setAttribute("type", "text");
      upitInput.setAttribute("id", "noviUpit");
      upitInput.setAttribute("name", "noviUpit");
      upitInput.setAttribute("placeholder", "Upit");
      let upitBttn = document.createElement("button");
      console.log("OVDJE3");
      upitBttn.setAttribute("id", "posaljiBttn");
      upitBttn.classList.add("prijavaBttnStil");
      upitBttn.setAttribute("type", "button");
      upitBttn.textContent = "Pošalji upit";
      divUpitiNovi.appendChild(labela);
      divUpitiNovi.appendChild(upitInput);
      divUpitiNovi.appendChild(upitBttn);
      console.log("UPITI");
      console.log("divUpiti", divUpitiNovi);
      divReferenca.appendChild(divUpitiNovi);
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
//////////////////////////////////login/////////////////////////////////////
        
        PoziviAjax.postUpit(idNekretnine, upitTekst, function (error, data) {
         // console.log("desilo se ovo");
      if (error===null && data && data.poruka=='Upit je uspješno dodan') {
        console.log("Uspjesno dodavanje upita.");
        username = localStorage.username;
        let divListaUpita = document.createElement("div");
        divListaUpita.classList.add("upit");
        divListaUpita.classList.add("posSubheading2");
        let li2 = document.createElement("li");
        let pUsername = document.createElement("p");
        let pUpit = document.createElement("p");
        li2.appendChild(divListaUpita);
        divListaUpita.appendChild(pUsername);
        divListaUpita.appendChild(pUpit);
        ul.appendChild(li2);
        divUpiti.appendChild(ul);
        li2.style.marginTop = "50px";
        divListaUpita.style.marginTop = "50px";
        divUpiti.style.marginTop = "50px";
        divRef.appendChild(divUpiti);
        pUsername.innerHTML= `<b>${username}</b>`;
        pUpit.textContent = upitTekst;
      } else {
      console.error('Doslo je do greske:', error);
      }
    });
});
/////toggle slanja novog upita
var prijavljenValue = localStorage.getItem('prijavljen');

let posaljiUpitDiv = document.getElementById("posaljiUpit");
console.log("VRIJEDNOST PRIJAVLJENOG", prijavljenValue);
if (prijavljenValue === 'true'){
  console.log("INLINE USLOV");
  posaljiUpitDiv.style.display = "inline";
}
else{
  posaljiUpitDiv.style.display = "none";
}
