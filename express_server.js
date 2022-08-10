const express = require('express');

const Container = require('./src/script.js');

const file = new Container();

const app = express();
let size=0;
const PORT = 8080;
  function getRandomArbitrary(min,max){
    let seeder=Math.random();
    let numAleatorio=parseInt(seeder*max+min);
    return numAleatorio;
}
app.get('/productos', async(req,res) => {
  const products=await file.getAll();
  size=products.length;
  res.send(products);
})

 app.get('/productoRandom',async(req, res) => {
    const products=await file.getAll();
    size=products.length;
    let id=getRandomArbitrary(1,size);
   res.send(`${await file.getById(id)}`);
})

app.get('*', (req, res) => {
    res.send('404-not found');
})

const server = app.listen(PORT, () => {
    console.log(`servidor http escuchando en http://localhost:${PORT}/`)
})