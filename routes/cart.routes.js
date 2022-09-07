const express = require('express');
const routerCart = express.Router();

/*--------------------------DB--------------------------*/
const Container = require('../src/script');
const file = new Container('./DB/cart.txt');
const fileProducts = new Container('./DB/list.txt');
/*--------------------------Rutas--------------------------*/
routerCart.get('/', async (req, res) => {
    res.json(await file.getAll());
})

routerCart.post('/', async (req, res) => {
    res.json({ id: await file.save({ productos: [] }) });
})

routerCart.delete('/:id', async (req, res) => {
    const id = req.params.id;
    return res.json({ id, message: `${await file.deleteById(id)}` })
});

routerCart.get('/:id/productos', async (req, res) => {
    const cartProducts = await file.getById(req.params.id)
    res.json(cartProducts.productos);
})

routerCart.post('/:id/productos', async (req, res) => {
    const cart = await file.getById(req.params.id);
    const product = await fileProducts.getById(req.body.id);
    await file.update(product, cart);
    res.end();
})

routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
    const prodId=req.params.id_prod;
    const cart = await file.getById(req.params.id);
});
module.exports = routerCart;