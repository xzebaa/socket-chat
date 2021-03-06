var socket = io();
var params = new URLSearchParams(window.location.search)


if ( !params.has('nombre') || !params.has('sala'))
{
    window.location = 'index.html'
    throw new Error('el nombre y sala son nesesario');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala'),
}


socket.on('connect', function() {
    console.log('Conectado al servidor');


    socket.emit('entrarChat', usuario, (resp) => {
        console.log(resp);
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

socket.on('listaPersonas', function(personas){
    console.log(personas);
})


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log(mensaje);

});

// mensajes privasdos
socket.on('mensajePrivado', function(mensaje){
    console.log('mensaje privado', mensaje)
})