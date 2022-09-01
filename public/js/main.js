const socket = io();
const socketMessages = io();

/*-----------------Productos-----------------*/
socket.on('from-server-products', products => {
    render(products);
});

function render(products) {
    const oneProduct = products.map((prod) => {
        return `
        <tr>
            <td>
                <img src=${prod.thumbnail} width="60px" height="70px">
            </td>
            <td>
                ${prod.title}
            </td>
            <td>
                ${prod.price}
            </td>
        </tr>`;
    }).join('<br>');
    document.querySelector('#element').innerHTML = oneProduct;
}

function addProduct() {
    const inputTitle = document.querySelector('#title');
    const inputPrice = document.querySelector('#price');
    const inputThumbnail = document.querySelector('#thumbnail');
    const newProduct = {
        title: inputTitle.value,
        price: inputPrice.value,
        thumbnail: inputThumbnail.value
    }
    socket.emit('from-client-addNew', newProduct);
}

/*-----------------Mensajes-----------------*/
socketMessages.on('from-server-messages', chat => {
    renderMessages(chat);
});

function renderMessages(chat) {
    const chatContent = chat.map((msj) => {
        return `<span><b style="color:blue;">${msj.email}</b></span><span  style="color:brown;"> [${msj.time}] </span><span><i  style="color:green;">: ${msj.text}</i></span>`;
    }).join('<br>');
    document.querySelector('#messages').innerHTML = chatContent;
}
function sendMessage() {
    let today = new Date();
    const now = today.toLocaleString();
    const inputEmail = document.querySelector('#email');
    const inputMessage = document.querySelector('#messageContent');
    const message = {
        email: inputEmail.value,
        time:now,
        text: inputMessage.value
    }
    socketMessages.emit('from-client-newMessage', message);
}