const MarketingAjax = (() => {
    
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
 
     function impl_postMarketingNekretnineId(id, fnCallback) {
        let url = `/marketing/nekretnine/${id}`;
         kontaktirajServer('POST', url, null, fnCallback);
     }
 
     function impl_postMarketingNekretnine(noviPodaci, fnCallback) {
         kontaktirajServer('POST', '/marketing/nekretnine', noviPodaci, fnCallback);
     }
 
 
   
     return {
        marketingNekretnine: impl_postMarketingNekretnine,
        marketingNekretnineId: impl_postMarketingNekretnineId

     };
 })();
 