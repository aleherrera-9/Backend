/*---------------------Modulos---------------------*/
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

/*---------------------DB---------------------*/
const DB_PRODUCTS = [
    { id: 1, title: "Memoria GeiL DDR4 16GB 3000MHz Orion RGB Black ", price: 13350, thumbnail: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_31969_Memoria_GeiL_DDR4_16GB_3000MHz_Orion_RGB_Black_aa7bb4c0-grn.jpg" },
    { id: 2, title: "UPS Lyonn CTB-800V 800va", price: 13350, thumbnail: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_7367_UPS_Lyonn_CTB-800V_800va_e8522db0-grn.jpg" }
]
const DB_CHAT = [];

/*---------------------Instancia del servidor---------------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/*-------------------Plantillas----------------*/
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')

/*---------------------Middlewares---------------------*/
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*---------------------Rutas---------------------*/
app.get('/', (req, res) => {
    res.render('view', { DB_PRODUCTS });
})

app.post('/productos', (req, res) => {
    res.redirect('/');
})

/*---------------------Servidor---------------------*/
const PORT = 3000;
const server = httpServer.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto http://localhost:${PORT}`);
});

/*---------------------Websocket---------------------*/
io.on('connection', (socket) => {
    
    console.log(`ID cliente: ${socket.id}`)
    io.sockets.emit('from-server-products', DB_PRODUCTS,);
    io.sockets.emit('from-server-messages', DB_CHAT);

    socket.on('from-client-addNew', newProduct => {
        DB_PRODUCTS.push(newProduct);
        io.sockets.emit('from-server-products', DB_PRODUCTS);
    })
    socket.on('from-client-newMessage',message=>{
        DB_CHAT.push(message);
        io.sockets.emit('from-server-messages', DB_CHAT );
    })
})
