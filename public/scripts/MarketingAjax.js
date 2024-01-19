const MarketingAjax = (() => {

    let novaPretraga = false;
    let noviKlik = false;
    let brojacUcitavanja = 0;
    let brojacKlikova = 0;

const divNekretnineRoditelj = document.getElementById("divNekretnine");


  osvjezi = setInterval(() => {
        MarketingAjax.osvjeziKlikove(divNekretnineRoditelj);
    }, 500);
    osvjeziP = setInterval(() => {
        MarketingAjax.osvjeziPretrage(divNekretnineRoditelj);
    }, 500);
    
 function kontaktirajServer(method, url, data, fnCallback) {
   // console.log("funkcija je pozvana");
     const headers = {
         'Content-Type': 'application/json',
     };
 
     const requestOptions = {
         method: method,
         headers: headers,
     };
 
     if (data) {
         requestOptions.body = JSON.stringify(data);
     }
 
     fetch(`http://localhost:3000${url}`, requestOptions)
         .then(response => response.json())
         .then(data => fnCallback(null, data))
         .catch(error => fnCallback(error, null));
 }
 
     function osvjeziPretrage(divNekretnine){
        brojacUcitavanja++;
        let dugmiciNiz = JSON.parse(localStorage.getItem("nizIds"));   
        let ids = [];
        
        if(brojacUcitavanja === 1 || novaPretraga === true){ //samo prvi put uzimam iz html-a id-eve - i kada dodje do promjene, tj do filtriranja
        for (var i = 0; i < dugmiciNiz.length; i++) {
        var id = dugmiciNiz[i];
        ids.push(id);
        }
        novaPretraga = false; //restart
        let nizNekretnina = ids;

        kontaktirajServer('POST', '/marketing/osvjezi', {nizNekretnina}, function(error, data){
            if(data){
            const osvjezeneNekretnine = data.nizNekretnina;//response.nizNekretnina;
            const idNekretnine = null;
            //let element;
            for(x of osvjezeneNekretnine){
                const idElement = `pretrage-${x.id}`;
                let element = divNekretnine.querySelector(`#${idElement}`);
                element.innerText = `Pretrage: ${x.pretrage}`;
            }
        }
 
        });
    }
    else{
        kontaktirajServer('POST', '/marketing/osvjezi', {}, function(error, data){
            if(data){
            //console.log("Response:", data);
            const osvjezeneNekretnine = data.nizNekretnina;//response.nizNekretnina;
            //console.log("osvjezene", osvjezeneNekretnine);
            const idNekretnine = null;
            //let element;
            for(x of osvjezeneNekretnine){
                let idNekretnine = x.id;
              //  console.log("idNekretnine", idNekretnine);
                let divSNekretninama = document.getElementById("divNekretnine");
                //console.log("url", `pretrage-${x.id}`);
                const idElement = `pretrage-${x.id}`;
                let element = divNekretnine.querySelector(`#${idElement}`);
                element.innerText = `Pretrage: ${x.pretrage}`;
            }
        }
        /*else{
            console.log("error");
        }*/
        });
    }
        }
     
     function osvjeziKlikove(divNekretnine){
        console.log("uslo se u osvjezi klikove");
        brojacKlikova++;
        console.log("brojac", brojacKlikova);
        let dugmiciNiz = JSON.parse(localStorage.getItem("nizIds"));   
        let ids = [];
        //console.log("duzina", dugmiciNiz.length);
        if(brojacKlikova === 1 || noviKlik === true){ console.log("ispunjeno");
        for (var i = 0; i < dugmiciNiz.length; i++) {
         var id = dugmiciNiz[i];
            ids.push(id);
        }
        noviKlik = false;
    
        let nizNekretnina = ids;
        console.log("ids", nizNekretnina);
        //if(noviKlik){
        kontaktirajServer('POST', '/marketing/osvjezi', {nizNekretnina}, function(error, data){ console.log("uslo se u server");
            if(data){
                console.log("ima podataka!!!!!");
            //console.log("Response:", data);
            const osvjezeneNekretnine = data.nizNekretnina;//response.nizNekretnina;
            console.log("osvjezeneNekretnine", osvjezeneNekretnine);
            const idNekretnine = null;
;
            for(x of osvjezeneNekretnine){
                const idElement = `klikovi-${x.id}`;
                let element = divNekretnine.querySelector(`#${idElement}`);
               console.log("element", element);
               element.innerText = `Klikovi: ${x.klikovi}`;
            }
        }
        
        });
    }
    else{
        kontaktirajServer('POST', '/marketing/osvjezi', {}, function(error, data){
            if(data){
           // console.log("Response:", data);
            const osvjezeneNekretnine = data.nizNekretnina;//response.nizNekretnina;
            const idNekretnine = null;
            //let element;
            for(x of osvjezeneNekretnine){
                let divSNekretninama = document.getElementById("divNekretnine");
                //console.log("url", `klikovi-${x.id}`);
                const idElement = `klikovi-${x.id}`;
                let element = divNekretnine.querySelector(`#${idElement}`);
                element.innerText = `Klikovi: ${x.klikovi}`;

            }
        }
        
        });
    }

     }

    function novoFiltriranje(listaFiltriranihNekretnina){
    const idsPrikazanih = listaFiltriranihNekretnina.map(property => property.id);
      //console.log("idevi", idsPrikazanih);
      const podaci = {nizNekretninaIds: idsPrikazanih};
        kontaktirajServer('POST', '/marketing/nekretnine', podaci, function(data, error){
            if(data){
                novaPretraga = true;
            }
            else{
                //console.log("Error");
            }
        });
    }

    function klikNekretnina(idNekretnine){
       // console.log("uslo se u funkciju klikNekretnina");
        let url = `/marketing/nekretnine/${idNekretnine}`;
         kontaktirajServer('POST', url, null, function(data, error){
            if(data){
                   // console.log("Klikovi uspjesno azurirani");
                    noviKlik = true;
                    //zaustaviti psvjezavanje
                    clearInterval(osvjezi);
                    let ids = [];
                    ids.push(idNekretnine);
                    //console.log("ids", ids);
                    
                    //osvjeziti samo za jedan klik
                   let nizNekretnina = ids;
        //console.log("ids", nizNekretnina);
        //if(noviKlik){
        kontaktirajServer('POST', '/marketing/osvjezi', {nizNekretnina}, function(error, data){
            if(data){
           // console.log("Response:", data);
            const osvjezeneNekretnine = data.nizNekretnina;//response.nizNekretnina;
        //    console.log("osvjezene", osvjezeneNekretnine);
            const idNekretnine = null;
            //let element;
            for(x of osvjezeneNekretnine){
               // console.log("url", `klikovi-${x.id}`);
                const idElement = `klikovi-${x.id}`;
                let element = divNekretnine.querySelector(`#${idElement}`);
                element.innerText = `Klikovi: ${x.klikovi}`;
            }
        }
        /*else{
            console.log("error");
        }*/
        });
        //nakon osvjezavanja vracam interval
        osvjezi = setInterval(() => {
            MarketingAjax.osvjeziKlikove(divNekretnineRoditelj);
        }, 500);
            }
            else{
               // console.log("Error");
            }
        });
    }

     return {
        osvjeziPretrage: osvjeziPretrage,
        osvjeziKlikove: osvjeziKlikove,
        novoFiltriranje: novoFiltriranje,
        klikNekretnina: klikNekretnina
     };
 })();
 