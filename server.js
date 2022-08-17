/*------------------------------Modulos------------------------------*/
const express = require('express');
const morgan= require('morgan');
const Container = require('./src/script.js');
//Instancia de server
const app = express();
const routerProducts=require('./src/routes/produtcs.routes');

/*------------------------------Middlewares------------------------------*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
/*------------------------------Rutas------------------------------*/
app.use('/api/productos',routerProducts);

/*------------------------------Servidor------------------------------*/

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
})

server.on('error', error => {
    console.log(`error en el servidor${PORT}`);
});