const express = require('express');
const routerCart = express.Router();

/*--------------------------DB--------------------------*/
const Container = require('../src/script');
const file = new Container('./DB/cart.json');
const fileProducts = new Container('./DB/list.json');

/*--------------------------RUTAS----------------------- */

routerCart.get('/', async (req, res) => {
    res.json(await file.getAll());
})

routerCart.post('/', async (req, res) => {
    res.json({ message: `carrito N: ${await file.save({ productos: [] })} creado` });
})

routerCart.delete('/:id', async (req, res) => {
    const id = req.params.id;
    return res.json({ id, message: `${await file.deleteById(id)}` })
});

routerCart.get('/:id/productos', async (req, res) => {
    const cartProducts = await file.getById(req.params.id)
     if (cartProducts == -1) {
        res.json({ message: `carrito inexistente` });
    } else {
        res.json(cartProducts.productos);
    }
})

routerCart.post('/:id/productos', async (req, res) => {
    const cart = await file.getById(req.params.id);
    const product = await fileProducts.getById(req.body.id);
    if (cart == -1) {
        res.json({ message: `carrito inexistente` });
    } else {
        res.json({ message: `${await file.update(product, cart)}` });
    }

})

routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
    const prodId = req.params.id_prod;
    const cart = await file.getById(req.params.id);
    cartUpdated = await file.deleteById(prodId, cart);
    return res.json({ message: `${await file.updateCart(cartUpdated, req.params.id)}` })
});
module.exports = routerCart;