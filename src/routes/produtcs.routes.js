const express = require('express');
const routerProducts = express.Router();

/*DB*/
const Container = require('../script');

const file = new Container();

routerProducts.get('/', async (req, res) => {
    const products = await file.getAll();
    res.status(200).json(products);
});

routerProducts.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.send({ error: 'el parametro ingresado no corresponde a un ID' })
    } else {
        res.send(await file.getById(id))
    }

});
routerProducts.post('/', async (req, res) => {
    res.status(201).json({ msg: "Agregado!", ID: await file.save(req.body), data: req.body });
});

routerProducts.put('/:id', async (req, res) => {
    const id = req.params.id;
    await file.update(req.body)
    return res.json({id,messg: 'Actualizado' })
});

routerProducts.delete('/:id', async(req, res) => {
    const id = req.params.id;
    return res.json({id,message:`${await file.deleteById(id)}`})
});

module.exports = routerProducts;