const PoziviAjax = (() => {
 
function kontaktirajServer(method, url, data, fnCallback) {
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

function impl_getNekretninaById(nekretnina_id, fnCallback) {
    let url = `/nekretnina/${nekretnina_id}`;
    kontaktirajServer('GET', url, null, fnCallback);
}

//testirati ove 3! - rute su testirane kroz postman, sve rade onako kako je ocekivano ( : 

    function impl_getKorisnik(fnCallback) {
        kontaktirajServer('GET', '/korisnik', null, fnCallback);
    }

    function impl_putKorisnik(noviPodaci, fnCallback) {
        kontaktirajServer('PUT', '/korisnik', noviPodaci, fnCallback);
    }


    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
        const data = { nekretnina_id, tekst_upita };
        kontaktirajServer('POST', '/upit', data, fnCallback);
    }


    function impl_getNekretnine(fnCallback) {  //radi
        kontaktirajServer('GET', '/nekretnine', null, fnCallback);
  
    }


    function impl_postLogin(username, password, fnCallback) {
        const data = { username, password };
        kontaktirajServer('POST', '/login', data, fnCallback);
    }
    

    function impl_postLogout(fnCallback) {
        kontaktirajServer('POST', '/logout', null, fnCallback);
    }

    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getKorisnik: impl_getKorisnik,
        putKorisnik: impl_putKorisnik,
        postUpit: impl_postUpit,
        getNekretnine: impl_getNekretnine,
        getNekretnina: impl_getNekretninaById
    };
})();
