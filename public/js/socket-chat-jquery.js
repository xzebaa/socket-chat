var params = new URLSearchParams(window.location.search);
var socket = io();

var nombre = params.get('nombre');
var sala = params.get('sala');

// referencias de jquery
let divUsuarios = $('#divUsuarios');
let formEnviar = $('#formEnviar');
let txtMensaje = $('#txtMensaje');
let divChatbox = $('#divChatbox');


// funcion para renderizar usuarios
function renderizarUsuarios ( personas ) {
    console.log(personas);

    var html = '';
    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span>'+ params.get('sala')+'+</span></a>';
    html += '</li>';

    for (let index = 0; index < personas.length; index++) {
        let persona = personas[index];

        console.log(persona);

    html += '<li>';
    html += '    <a data-id="'+persona.id+'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+persona.nombre+'<small class="text-success">online</small></span></a>';
    html += '</li>';
    }

    divUsuarios.html(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

function renderizarMensaje(mensaje, yo){

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() +':'+fecha.getMinutes();
    var adminCLass = mensaje.nombre === 'adminsitrador'? 'danger': 'info';

    if( yo ){

        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+mensaje.nombre+'</h5>';
        html += '        <div class="box bg-light-inverse">'+mensaje.mensaje +'</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+ hora +'</div>';
        html += '</li> ';
        
    }else {
        html +='<li class="animated fadeIn">';

        if( mensaje.nombre !== 'adminsitrador')
        {html +='    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';}

        html +='    <div class="chat-content">';
        html +='        <h5>'+mensaje.nombre+'</h5>';
        html +='        <div class="box bg-light-'+adminCLass+'">'+mensaje.mensaje +'</div>';
        html +='    </div>';
        html +='    <div class="chat-time">'+ hora +'</div>';
        html +='</li>';
    }

    divChatbox.append(html);

}

// listener
divUsuarios.on('click', 'a', function(){
    var id = $(this).data('id');

    if( !id ) return;
    console.log(id);
})

formEnviar.on('submit', function(event){
    event.preventDefault();

    if( txtMensaje.val().trim().length === 0) return;

    // Enviar información
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val(),
    }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensaje(mensaje, true);
        scrollBottom();
    });

})