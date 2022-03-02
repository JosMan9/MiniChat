const $div_mensajes = document.getElementById('messages-div');
const $div_participantes = document.getElementById('participants-div');
const $input = document.getElementById('input');
const $input_nombre = document.getElementById('input_nombre');

const $boton = document.getElementById('button');

let nombre = "";

const crearElemento = (cadena, contenedor) => {
    let participante = document.createElement("p");
    participante.textContent = cadena;
    participante.style.paddingLeft = "10px";
    participante.style.paddingTop = "7px"
    participante.style.fontSize = "22px"

    contenedor.appendChild(participante);
}

const agregar_notify = (arr) => {
    while ($div_participantes.firstChild) {
        $div_participantes.removeChild($div_participantes.firstChild);
    }

    arr.map((p) => {
        crearElemento(p, $div_participantes);
    });

    crearElemento(nombre, $div_participantes);
}

$boton.addEventListener('click', () => {
    let mensaje_cadena = $input.value;
    nombre = $input_nombre.value;

    if (mensaje_cadena === "" || nombre === "") {
        window.alert("No dejes campos vacíos");
    } else {
        let part = new Pariticipant(nombre, mensaje_cadena);

        const arr_validar = obs.participants.filter(p => p.nombre === nombre);

        if (arr_validar.length == 0) {
            obs.join(part);
        } else {
            arr_validar[0].mensajeNuevo(mensaje_cadena);
        }

        const arr = obs.notify(nombre);
        agregar_notify(arr);
        console.log(arr);
        console.log("Pariticipantes", obs.participants);

        crearElemento("Mensaje de " + nombre + ": " + mensaje_cadena, $div_mensajes);



        $input.value = "";
        $input_nombre.value = "";
    }

});


class Observable {
    participants

    constructor() {
        this.participants = [];
    }

    join(participant) {
        this.participants.push(participant);
    }

    injoin(participant) {
        this.participants = this.participants.filter(p => p != participant);
    }

    notify(event) {
        return this.participants.filter(p => p.nombre != event).map(p => p.aviso());
    }
}

class Pariticipant {
    nombre
    mensaje
    constructor(nombre, mensaje) {
        this.nombre = nombre;
        this.mensaje = [];
        this.mensaje.push(mensaje);
    }

    aviso() {
        return " - -- " + this.nombre;
    }

    mensajeNuevo(mensaje) {
        this.mensaje.push(mensaje);
    }

}

const obs = new Observable();