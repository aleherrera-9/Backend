/*-------------------Modulos----------------*/
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

//Instancia de server
const app = express();
const routerProducts=require('./routes/products.routes');
const routerCart=require('./routes/cart.routes');

/*DB*/
const Container = require('./src/script');
const file = new Container();

/*-------------------Middlewares----------------*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

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
app.use('/api/productos',routerProducts);
app.use('/api/carrito',routerCart);
/*-------------------Servidor----------------*/
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
server.on('error', error => {
    console.error(`Error en el servidor ${error}`);
});