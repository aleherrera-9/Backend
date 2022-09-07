const express = require('express');
const routerProducts = express.Router();

/*--------------------------DB--------------------------*/
const Container = require('../src/script');
const file = new Container('./DB/list.json');

/*------------------------ADMIN FLAG------------------- */
const isAdmin = true;
function adminFlag(req,res,next){
    if(isAdmin){
        next();
    }else{
        res.status(403).json({error:403,message:`sin acceso ${req.method} ${req.baseUrl}`})
    }
}
/*--------------------------RUTAS----------------------- */
routerProducts.get('/', async (req, res) => {
    const PRODUCTS = await file.getAll()
    res.render('view', { PRODUCTS })
})
routerProducts.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.send({ error: 'el parametro ingresado no corresponde a un ID' })
    } else {
        const product = await file.getById(id)
        res.render('oneProduct', { product })
    }
});
routerProducts.post('/',adminFlag, async (req, res) => {
    await file.save(req.body);
    const PRODUCTS = await file.getAll()
    res.render('view', { PRODUCTS })
})

routerProducts.put('/:id',adminFlag, async (req, res) => {
    const id = req.params.id;
    const product = await file.getById(id)
    if(product!=-1){
        await file.update(req.body, null);
        return res.json({ id, messg: 'Actualizado' })
    }else{
        return res.json({ id, messg: 'no se puede actrualizar, producto inexistente' })
    }
    
    
});

routerProducts.delete('/:id', adminFlag,async (req, res) => {
    const id = req.params.id;
    return res.json({ id, message: `${await file.deleteById(id, null)}` })
});

module.exports = routerProducts; 