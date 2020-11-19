//comando para establecer la conexión 
var socket = io();

let label = $('#lblNuevoTicket'); //jquery busca un label con ese nombre en el html

//on es para escuchar sucesos (conectar, desconectar, etc)
socket.on('connect', function() {
    console.log('Conectado al servidor'); //si se baja el servidor, seguirá haciendo intentos de conexión hasta que se levante el servidor de nuevo
    //conexión activo/activo
});

socket.on('disconnect', function() { //si se desconecta el servidor
    console.log('Perdimos conexión con el servidor');
});

socket.on('estadoActual', function(resp) {

    label.text(resp.actual);

})

$('button').on('click', function() { //la función de click en el boton
    socket.emit('siguienteTicket', null, function(siguienteTicket) { //manda al cliente la función siguiente ticket

        label.text(siguienteTicket); //setea el nuevo ticket en el label del html

    });
});