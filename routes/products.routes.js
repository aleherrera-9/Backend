const express = require('express');
const routerProducts = express.Router();

/*--------------------------DB--------------------------*/
const Container = require('../src/script');
const file = new Container();

routerProducts.get('/', async(req, res) => {
    const PRODUCTS = await file.getAll()
    res.render('view',{PRODUCTS})
})
routerProducts.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.send({ error: 'el parametro ingresado no corresponde a un ID' })
    } else {
        const product= await file.getById(id)
        res.render('oneProduct',{product})
    }
});
routerProducts.post('/', async(req, res) => {
    await file.save(req.body);
    const PRODUCTS = await file.getAll()
    res.render('view',{PRODUCTS})
})

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