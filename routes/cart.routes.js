const express = require('express');
const routerCart = express.Router();

/*--------------------------DB--------------------------*/
const Container = require('../src/script');
const file = new Container();

/*--------------------------Rutas--------------------------*/
routerCart.get('/', async(req, res) => {
    const PRODUCTS = await file.getAll()
    res.render('viewCart',{PRODUCTS})
})
routerCart.post('/:id', async(req, res) => {
    const PRODUCTS = await file.getAll()
    res.render('viewCart',{PRODUCTS})
    console.log(req.params.id);
 })
module.exports = routerCart;