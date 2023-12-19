const express = require('express');
const app = express();

//files iz static direktorija

const path = require('path');
const fs = require('fs').promises;
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));


const serveHtml = async (fileName, res) => {
  try {
    const filePath = path.join(__dirname, 'public','html', fileName);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    res.send(fileContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Doslo je do greske.');
  }
};

app.get('/nekretnine.html', (req, res) => {
  serveHtml('nekretnine.html', res);  //sve smjestam u response
});


app.get('/detalji.html', (req, res) => {
  serveHtml('detalji.html', res);
});
app.get('/prijava.html', (req, res) => {
    serveHtml('prijava.html', res);
  });
  app.get('/profil.html', (req, res) => {
    serveHtml('profil.html', res);
  });

app.listen(3000);
