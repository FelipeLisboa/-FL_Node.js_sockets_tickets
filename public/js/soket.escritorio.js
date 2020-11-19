//comando para establecer la conexión 
var socket = io();

//obtener el escritorio por el url
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) { //si no tiene escritorio en la url
    window.location = 'index.html'; //sale de la pantalla y vuelve al index
    throw new Error('El escritorio es necesario');
}

//si viene info del escritorio
let escritorio = searchParams.get('escritorio');
let label = $('small');

$('h1').text('Escritorio ' + escritorio); //JQUERY tomo la etiqueta del html para poner el numero de escitrio que corresponde


$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets') {
            alert(resp);
            label.text(resp);
            return;
        }
        label.text('ticket ' + resp.numero);
    });
});