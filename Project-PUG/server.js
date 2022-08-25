/*-------------------Modulos----------------*/
const  express = require('express');
const app = express();

/*DB*/
const Container = require('./src/script');
const file = new Container();

/*-------------------Middlewares----------------*/
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

/*-------------------Plantillas----------------*/
app.set('views', './views');
app.set('view engine', 'pug');

/*-------------------Rutas----------------*/
app.get('/', async(req, res) => {
    const PRODUCTS = await file.getAll()
    res.render('view',{PRODUCTS})
})
app.post('/productos', async(req, res) => {
    await file.save(req.body)
    res.redirect('/')
})
app.get('/productos', async(req, res) => {
    const PRODUCTS = await file.getAll()
    res.render('viewProducts',{PRODUCTS})
})
/*-------------------Servidor----------------*/
const PORT = 8081;
const server =app.listen(PORT,()=>{
    console.log(`servidor escuchando en puerto ${PORT}`);
});
 server.on('error',error=>{
    console.error(`Error en el servidor ${error}`);
 });