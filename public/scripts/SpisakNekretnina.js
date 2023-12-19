let SpisakNekretnina = function(){
    const listaNekretnina = [];
    const listaKorisnika = [];

    /*Pitati za getElementById
    testni folder?
    dodati nekretnina jos?*/ 

    let init = function (listaNekretnina, listaKorisnika){
        this.listaNekretnina = listaNekretnina;
        console.log(this.listaNekretnina);
        this.listaKorisnika = listaKorisnika;
        console.log(this.listaKorisnika);
    }
    

    let filtrirajNekretnine =  function(kriterij){
        if(Object.entries(kriterij).length === 0) return this.listaNekretnina;  //ako nema kriterija sve nekretnine mogu
        //kriterij nije prazan, ali ne sadrzi odgovarajuca polja:
        if(kriterij.tip_nekretnine === undefined && kriterij.min_kvadratura === undefined && 
            kriterij.max_kvadratura === undefined && kriterij.min_cijena === undefined &&
            kriterij.max_cijena === undefined) return this.listaNekretnina;  //vraca se originalna lista, nema validnih kriterija

        let rezultat = [], rezultat1 = [], rezultat2 = [], rezultat3 = [], rezultat4 = []; //prazna lista
       
        //if(Object.keys(kriterij).length() === 0)  //ako je obj prazan
       // return listaNekretnina;

        if(kriterij.tip_nekretnine !== undefined){  //ako ima ovaj kriterij
          console.log("uslov")
            for(let x of this.listaNekretnina){  //vrijednost! +  mora this
              console.log("usao u petlju");
              console.log(x);
                if(x.tip_nekretnine === kriterij.tip_nekretnine)
                rezultat.push(x);
              
            }
           
        }

       if(kriterij.min_kvadratura !== undefined){ 
            let iterativnaLista = [];
            if(rezultat.length !== 0){ //ako je vec nesto pohranjeno u rezultat
                iterativnaLista = rezultat;
                rezultat = [];
            }
            else iterativnaLista = this.listaNekretnina;
            for(let x of iterativnaLista){
                if(x.kvadratura >= kriterij.min_kvadratura)
                rezultat1.push(x);
            }
        }
        
        if(kriterij.max_kvadratura !== undefined){  
            let iterativnaLista = [];
            if(rezultat.length !== 0){
                iterativnaLista = rezultat;
                rezultat = [];
            }
            else if (rezultat1.length !== 0){
            iterativnaLista = rezultat1;
            rezultat1 = [];
            }
            else iterativnaLista = this.listaNekretnina;
            for(let x of iterativnaLista){
                if(x.kvadratura <= kriterij.max_kvadratura)
                rezultat2.push(x);
            }
        }

        if(kriterij.min_cijena !== undefined){  
            let iterativnaLista = [];
            if(rezultat.length !== 0){
                iterativnaLista = rezultat;
                rezultat = [];
            }
            else if (rezultat1.length !== 0){
                iterativnaLista = rezultat1;
                rezultat1 = [];
            }
            else if (rezultat2.length !== 0){
                iterativnaLista = rezultat2;
                rezultat2 = [];
            }
            else iterativnaLista = this.listaNekretnina;
            for(let x of iterativnaLista){
                if(x.cijena >= kriterij.min_cijena)
                rezultat3.push(x);
            }
        }

        if(kriterij.max_cijena !== undefined){  
            let iterativnaLista = [];
            if(rezultat.length !== 0){ 
                iterativnaLista = rezultat;
                rezultat = [];
            }
            else if (rezultat1.length !== 0){
                iterativnaLista = rezultat1;
                rezultat1 = [];
            }
            else if (rezultat2.length !== 0){
                iterativnaLista = rezultat2;
                rezultat2 = [];
            }
            else if (rezultat3.length !== 0){
                iterativnaLista = rezultat3;
                rezultat3 = [];
            }
            else iterativnaLista = this.listaNekretnina;
            for(let x of iterativnaLista){
                if(x.cijena <= kriterij.max_cijena)
                rezultat4.push(x);
            }
        }

        if(!isEmpty(rezultat) && isEmpty(rezultat1) && isEmpty(rezultat2) && isEmpty(rezultat3) && isEmpty(rezultat4)){
            return rezultat;
        }
        if(isEmpty(rezultat) && !isEmpty(rezultat1) && isEmpty(rezultat2) && isEmpty(rezultat3) && isEmpty(rezultat4)){
            return rezultat1;
        }
        if(isEmpty(rezultat) && isEmpty(rezultat1) && !isEmpty(rezultat2) && isEmpty(rezultat3) && isEmpty(rezultat4)){
            return rezultat2;
        }
        if(isEmpty(rezultat) && isEmpty(rezultat1) && isEmpty(rezultat2) && !isEmpty(rezultat3) && isEmpty(rezultat4)){
            return rezultat3;
        }

        return rezultat4;
    }

    const isEmpty = function(niz){
            if(niz.length !== 0) return 0; //nije prazan
            return 1; //jeste prazan
    }

    let ucitajDetaljeNekretnine = function (id) {
        let rezultat = null;
        for(let x in this.listaNekretnina){
          console.log("id");
          console.log(x.id);
            if(this.listaNekretnina[x].id === id ){ rezultat = this.listaNekretnina[x]; //x je key!!!
            console.log("x");
            console.log(x);
            break;
            }
        }
        return rezultat;
    }

    
    return {
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }
};
