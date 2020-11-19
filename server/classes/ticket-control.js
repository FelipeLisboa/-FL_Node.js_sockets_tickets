const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) { //el numero de ticket y el escritorio que a va a atender
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0; //último ticket
        this.hoy = new Date().getDate(); //tener la fecha de hoy
        this.tickets = []; //arreglo de todos los tickets que estan pendientes
        this.ultimos4 = []; //ultimos 4 tickets que etaran en la pantalla publica

        //leer info del archivo json donde quedará guardada la info por si se reinicia el server
        let data = require('../data/data.json');


        //cada vez que sea un nuevo día se reinicia la cuenta de ticket a 0

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }

    }

    siguiente() { //incrementar en 1 cual es el último ticket
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null); //numero es el último ticket y escritorio aún no lo sé
        this.tickets.push(ticket); //agrego el ticket al arreglo de tickets

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() { //tomar el ultimo ticket generado y retornarlo en el html
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() { //tomar los ultimos 4 ticket y retornarlo en el html
        return this.ultimos4;
    }

    atenderTicket(escritorio) { //numero de escritorio que atenderá a un ticket en particular
        if (this.tickets.length == 0) {
            return 'No hay tickets';
        } else {
            let numeroTicket = this.tickets[0].numero; //el numero de ticket e atender es el que esté en primera posicion
            this.tickets.shift(); //eliminar los ticket que ya se atendieron del arreglo de tickets primera posicion

            let atenderTicket = new Ticket(numeroTicket, escritorio); //ticket que voy a atender
            this.ultimos4.unshift(atenderTicket); //agrega el ticket de los primeros en el arreglo de ultimos 4 de la pantalla publica
            if (this.ultimos4.length > 4) { //que se mantenga un arreglo solo de 4
                this.ultimos4.splice(-1, 1) //borra el último elemento del arreglo
            }

            console.log('Últimos 4 :');
            console.log(this.ultimos4);

            this.grabarArchivo();

            return atenderTicket;

        }
    }

    reiniciarConteo() { //información que quiero grabar en el data.json 
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }


    grabarArchivo() { //para guardar el archivo
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}



module.exports = {
    TicketControl
}