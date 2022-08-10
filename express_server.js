const express = require('express');
const Container = require('./src/script.js');

const file = new Container('../DB/productos.txt');
const app = express();

const PORT = 8080;

app.get('/productos', async(req,res) => {
   try{
    console.log(file.path);
    const productos=(await file.getAll());
    console.log(productos.length)
    res.send(`se pudo leer`);
   }catch(error){
    res.send('no se pudo leer');
   }
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