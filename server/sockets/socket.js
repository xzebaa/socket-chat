const { io } = require('../server');
const { Usuarios } = require('../clases/usuarios');
const { crearMensaje } = require('../utils/utils');

let usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {

        if( !usuario.nombre || !usuario.sala ){
            return { error : true,
            message: 'el nombre es necesario '}
        }

        client.join(usuario.sala);

        let personas = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);
        client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPersonasPorSala(usuario.sala));
        return callback(usuarios.getPersonasPorSala(usuario.sala));
       
    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);
        console.log(persona);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    })
    
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        let mensaje = crearMensaje('adminsitrador', `${ !personaBorrada.nombre ? 'undefine':personaBorrada.nombre} Abandono el chat!`)
        
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', mensaje);
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
    })

    // mensaje priavado
    client.on('mensajePrivado', (data) => {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(data.para).emit('mensajePrivado', mensaje)
    })

});