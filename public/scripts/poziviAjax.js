const PoziviAjax = (() => {
    let ajax = new XMLHttpRequest();

    function sendRequest(method, url, data, fnCallback) {
        ajax.open(method, `http://localhost:3000${url}`, true);  //paziti na navodnike¸! "template literals"
        //ovdje dodati if data uslov 
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


    function impl_getKorisnik(fnCallback) {
        sendRequest('GET', '/korisnik', null, fnCallback);
    }

    function impl_putKorisnik(noviPodaci, fnCallback) {
        sendRequest('PUT', '/korisnik', noviPodaci, fnCallback);
    }


    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
        const data = { nekretnina_id, tekst_upita };
        sendRequest('POST', '/upit', data, fnCallback);
    }


    function impl_getNekretnine(fnCallback) {  //radi
        sendRequest('GET', '/nekretnine', null, fnCallback);
  
    }


    function impl_postLogin(username, password, fnCallback) {
        const data = { username, password };
        sendRequest('POST', '/login', data, fnCallback);
    }


    function impl_postLogout(fnCallback) {
        sendRequest('POST', '/logout', null, fnCallback);
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
