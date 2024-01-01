const MarketingAjax = (() => {

    let noviFilter;
    let noviKlik;

    const divNekretnineRoditelj = document.getElementById("divNekretnine");
   osvjezi = setInterval(() => {
        MarketingAjax.osvjeziKlikove(divNekretnineRoditelj);
    }, 500);
    
 function kontaktirajServer(method, url, data, fnCallback) {
    console.log("funkcija je pozvana");
     const headers = {
         'Content-Type': 'application/json',
     };
 
     const requestOptions = {
         method: method,
         headers: headers,
     };
 
     if (data) {
         requestOptions.body = JSON.stringify(data);
         console.log("stringified data", requestOptions.body);
     }
 
     fetch(`http://localhost:3000${url}`, requestOptions)
         .then(response => response.json())
         .then(data => fnCallback(null, data))
         .catch(error => fnCallback(error, null));
         /*fetch(`http://localhost:3000${url}`, requestOptions)
         .then(response => response.json())
         .then(data => fnCallback(data, null))
         .catch(error => fnCallback(null, error));*/
 }
 

 
     function impl_postMarketingNekretnineId(id, fnCallback) {
        let url = `/marketing/nekretnine/${id}`;
         kontaktirajServer('POST', url, null, fnCallback);
     }
 
     function impl_postMarketingNekretnine(noviPodaci, fnCallback) {
         kontaktirajServer('POST', '/marketing/nekretnine', noviPodaci, fnCallback);
     }

     function osvjeziPretrage(divNekretnine){
        console.log("funkcija osvjezi Pretrage je pozvana");
        let divsDugmicima = document.getElementById("divNekretnine");
        let dugmici = divsDugmicima.getElementsByTagName("button");
        let dugmiciNiz = Array.from(dugmici);
        console.log("dugmici", dugmiciNiz);
        let ids = [];
        console.log("duzina", dugmiciNiz.length);
        for (var i = 0; i < dugmiciNiz.length; i++) {
            console.log("usao u petlju");
            var dugme = dugmiciNiz[i];
            var dugmeId = dugme.id;
            //sklanjam tekstualni dio
            var broj = dugmeId.replace("detalji-", "");
            // id
            var id = parseInt(broj, 10);  //10 je za decimalni sistem
            console.log("id", id);
            ids.push(id);
        }
        nizNekretnina = ids;
        console.log("ids", nizNekretnina);
        kontaktirajServer('POST', '/marketing/osvjezi', {nizNekretnina}, function(error, data){
            if(data){
            console.log("Response:", data);
            const osvjezeneNekretnine = data.nizNekretnina;//response.nizNekretnina;
            console.log("osvjezene", osvjezeneNekretnine);
            const idNekretnine = null;
            //let element;
            for(x of osvjezeneNekretnine){
                console.log("uslo se u petlju nakon poziva servisa");
                let idNekretnine = x.id;
                console.log("idNekretnine", idNekretnine);
                let divSNekretninama = document.getElementById("divNekretnine");
                console.log("url", `pretrage-${x.id}`);
                const idElement = `pretrage-${x.id}`;
                let element = divNekretnine.querySelector(`#${idElement}`);
               
                //if(element){
                    console.log("ovdje");
                    element.innerText = `Pretrage: ${x.pretrage}`;
                //}
            }
        }
        /*else{
            console.log("error");
        }*/
        });
        }
     
     function osvjeziKlikove(divNekretnine){
        console.log("funkcija osvjezi Klikove je pozvana");
        let divsDugmicima = document.getElementById("divNekretnine");
        let dugmici = divsDugmicima.getElementsByTagName("button");
        let dugmiciNiz = Array.from(dugmici);
        console.log("dugmici", dugmiciNiz);
        let ids = [];
        console.log("duzina", dugmiciNiz.length);
        for (var i = 0; i < dugmiciNiz.length; i++) {
            console.log("usao u petlju");
            var dugme = dugmiciNiz[i];
            var dugmeId = dugme.id;
            //sklanjam tekstualni dio
            var broj = dugmeId.replace("detalji-", "");
            // id
            var id = parseInt(broj, 10);  //10 je za decimalni sistem
            console.log("id", id);
            ids.push(id);
        }
        nizNekretnina = ids;
        console.log("ids", nizNekretnina);
        if(noviKlik){
        kontaktirajServer('POST', '/marketing/osvjezi', {nizNekretnina}, function(error, data){
            if(data){
            console.log("Response:", data);
            const osvjezeneNekretnine = data.nizNekretnina;//response.nizNekretnina;
            console.log("osvjezene", osvjezeneNekretnine);
            const idNekretnine = null;
            //let element;
            for(x of osvjezeneNekretnine){
                console.log("uslo se u petlju nakon poziva servisa");
                let idNekretnine = x.id;
                console.log("idNekretnine", idNekretnine);
                let divSNekretninama = document.getElementById("divNekretnine");
                console.log("url", `klikovi-${x.id}`);
                const idElement = `klikovi-${x.id}`;
                let element = divNekretnine.querySelector(`#${idElement}`);
               console.log("element", element);
                //if(element){
                    console.log("ovdje");
                    element.innerText = `Klikovi: ${x.klikovi}`;
                //}
            }
        }
        /*else{
            console.log("error");
        }*/
        });
    }
    noviKlik = false;
     }

    function novoFiltriranje(listaFiltriranihNekretnina){
        kontaktirajServer('POST', '/marketing/nekretnine', listaFiltriranihNekretnina, function(error, data){
            if(data){
                    console.log("Pregledi uspjesno azurirani");
                    noviFilter = true;
            }
            else{
                console.log("Error");
            }
        });
    }

    function klikNekretnina(idNekretnine){
        let url = `/marketing/nekretnine/${id}`;
         kontaktirajServer('POST', url, null, function(error, data){
            if(data){
                    console.log("Klikovi uspjesno azurirani");
                    noviKlik = true;
                    //zaustaviti psvjezavanje
                    clearInterval(osvjezi);
                    //osvjeziti samo za jedan klik
                    kontaktirajServer('POST', '/marketing/osvjezi', {idNekretnine}, function(error, data){
                        if(data){
                            const osvjezeneNekretnine = data.nizNekretnina;//response.nizNekretnina;
                            console.log("osvjezene", osvjezeneNekretnine);
                            const idNekretnine = null;
                            //let element;
                            for(x of osvjezeneNekretnine){
                                console.log("uslo se u petlju nakon poziva servisa");
                                let idNekretnine = x.id;
                                console.log("idNekretnine", idNekretnine);
                                let divSNekretninama = document.getElementById("divNekretnine");
                                console.log("url", `klikovi-${x.id}`);
                                const idElement = `klikovi-${x.id}`;
                                let element = divNekretnine.querySelector(`#${idElement}`);
                               console.log("element", element);
                                //if(element){
                                    console.log("ovdje");
                                    element.innerText = `Klikovi: ${x.klikovi}`;
                                //}
                            }

                        }
                        else{
                            console.log("Doslo je do greske");
                        }
                    });

            }
            else{
                console.log("Error");
            }
        });
    }

     return {
        marketingNekretnine: impl_postMarketingNekretnine,
        marketingNekretnineId: impl_postMarketingNekretnineId,
        osvjeziPretrage: osvjeziPretrage,
        osvjeziKlikove: osvjeziKlikove,
        novoFiltriranje: novoFiltriranje,
        klikNekretnina: klikNekretnina
     };
 })();
 