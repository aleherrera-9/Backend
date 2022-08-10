const express = require('express');
const Container = require('./src/script.js');

const file = new Container();
const app = express();

const PORT = 8080;

app.get('/productos', async(req,res) => {
  const products=await file.getAll();
  res.send(products);
})

// app.get('/productoRandom', (req, res) => {

//     res.send();
// })

app.get('*', (req, res) => {
    res.send('404-not found');
})

const server = app.listen(PORT, () => {
    console.log(`servidor http escuchando en http://localhost:${PORT}/`)
})