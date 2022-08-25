/*-------------------Modulos----------------*/
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

/*DB*/
const Container = require('./src/script');
const file = new Container();

/*-------------------Middlewares----------------*/
app.use(express.static(path.join('./public')));
app.use(express.urlencoded({extended: true}));

/*-------------------Plantillas----------------*/
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    //partial agrega un template dentro de otro
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')

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
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en puerto ${PORT}`);
});
server.on('error', error => {
    console.error(`Error en el servidor ${error}`);
});