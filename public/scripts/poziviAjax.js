const PoziviAjax = (() => {
   /* let ajax = new XMLHttpRequest();

    function kontaktirajServer(method, url, data, fnCallback) {
        ajax.open(method, `http://localhost:3000${url}`, true);  //paziti na navodnike¸! "template literals"
     if(data)
     ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                let error = null;
                let responseData = null;
                if (ajax.status !== 200) {
                    error = `Error: ${ajax.status} - ${ajax.statusText}`;
                } else {
                    responseData = JSON.parse(ajax.responseText);
                }
                fnCallback(error, responseData);
            }
        };
        console.log(`Sending request to: http://localhost:3000${url}`);

        if(data)
       ajax.send(JSON.stringify(data));  //data ? JSON.stringify(data) : null
        else
      ajax.send();
    }
*/
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

//testirati ove 3!

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
        getNekretnine: impl_getNekretnine
    };
})();
