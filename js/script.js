class Memorama {

    constructor() {

        this.totalTarjetas = [];
        this.numeroTarjetas = 0;
        this.verificadorTarjetas = []
        this.errores = 0;
        this.nivelDificultad = '';
        this.imagenesCorrectas = [];
        this.agregadorTarjetas = [];
        this.numeroIntentos = 0;

        this.$contenedorGeneral = document.querySelector('.contenedor-general');
        this.$titulo2 = document.querySelector('.titulo2');
        this.$contenedorTarjetas = document.querySelector('.contenedor-tarjetas');
        this.$pantallaBloqueada = document.querySelector('.pantalla-bloqueada');
        this.$mensaje = document.querySelector('h2.mensaje');
        this.$errorContenedor = document.createElement('h2');
        this.$nivelDificultad = document.createElement('h2');
        //Llamado a los eventos

        this.eventos();

    }

    eventos() {
        window.addEventListener('DOMContentLoaded', () => {
            this.seleccionDificultad()
            this.cargarPantalla();
            window.addEventListener('contextmenu', e => {
                e.preventDefault();
            }, false)
        })
    }

    seleccionDificultad() {

        const mensaje = prompt('            **************** Selecione Número de dificultad ***************' +
            '\nFácil = 1 - Intentos: 8\nIntermedio = 2 - Intentos: 6 \nDifícil = 3 - Intentos: 4')

        if (mensaje === '1') {
            this.numeroIntentos = 8;
            this.nivelDificultad = 'Fácil';
        } else if (mensaje === '2') {
            this.numeroIntentos = 6;
            this.nivelDificultad = 'Intermedio';
        } else if (mensaje === '3') {
            this.numeroIntentos = 4;
            this.nivelDificultad = 'Difícil';
        } else {
            this.numeroIntentos = 5;
            this.nivelDificultad = 'Intermedio';
        }

    }

    async cargarPantalla() {
        const respuesta = await fetch('../memo.json')
        const data = await respuesta.json();
        this.totalTarjetas = data
        if (this.totalTarjetas.length > 0) {
            this.totalTarjetas.sort(orden);

            function orden(a, b) {
                return Math.random() - 0.5;
            }
        }

        this.numeroTarjetas = this.totalTarjetas.length;

        let html = '';
        this.totalTarjetas.forEach(card => {
            html += `<div class = "tarjeta">
                     <img class="tarjeta-img" src=${card.src} alt = "Imagen memorama">
                    </div>`
        })
        this.$contenedorTarjetas.innerHTML = html;
        this.comiezaJuego();
        this.contenedorError();
        this.mensajeIntentos();
    }

    comiezaJuego() {
        const tarjetas = document.querySelectorAll('.tarjeta');
        tarjetas.forEach(tarjeta => {
            tarjeta.addEventListener('click', e => {

                if (!e.target.classList.contains('acertada' && !e.target.classList.contains('tarjeta-img'))) {
                    this.clickTarjeta(e)
                }
            })
        })
    }

    clickTarjeta(e) {

        this.efectoVoltearTarjeta(e);
        let sourceImage = e.target.childNodes[1].attributes[1].value;
        this.verificadorTarjetas.push(sourceImage);

        let tarjeta = e.target;
        this.agregadorTarjetas.unshift(tarjeta);
        this.comparadorTarjetas();
    }

    efectoVoltearTarjeta(e) {
        e.target.style.backgroundImage = 'none';
        e.target.style.backgroundColor = 'white';
        e.target.childNodes[1].style.display = 'block';
    }

    fijarParAcertado(arrTarjetasAcertadas) {
        arrTarjetasAcertadas.forEach(tarjeta => {
            tarjeta.classList.add('acertada');
            this.imagenesCorrectas.push(tarjeta);
            this.victoriaJuego();
        })
    }

    reversoTarjetas(arrTarjetas) {
        arrTarjetas.forEach(tarejeta => {
            setTimeout(() => {
                tarejeta.style.backgroundImage = 'url(../img/cover.jpg)';
                tarejeta.childNodes[1].style.display = 'none';
            }, 1000)

        })

    }

    comparadorTarjetas() {
        if (this.verificadorTarjetas.length == 2) {
            if (this.verificadorTarjetas[0] === this.verificadorTarjetas[1]) {
                this.fijarParAcertado(this.agregadorTarjetas);
            } else {
                this.reversoTarjetas(this.agregadorTarjetas);
                this.errores++;
                this.incrementadorError();
                this.derrotaJuego();
            }
            this.verificadorTarjetas.splice(0);
            this.agregadorTarjetas.splice(0);
        }
    }

    victoriaJuego() {

        if (this.imagenesCorrectas.length === this.numeroTarjetas) {
            setTimeout(() => {
                this.$pantallaBloqueada.style.display = 'block';
                this.$mensaje.innerText = '¡Felicidades! Has ganado el juego';
            }, 1000);
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
    }

    derrotaJuego() {
        if (this.errores === this.numeroIntentos) {
            setTimeout(() => {
                this.$pantallaBloqueada.style.display = 'block';
            }, 1000)

            setTimeout(() => {
                location.reload();
            }, 3000)
        }
    }

    incrementadorError() {
        this.$errorContenedor.innerText = `Errores: ${this.errores}`;
    }

    contenedorError() {
        this.$errorContenedor.classList.add('titulo2');
        this.incrementadorError();
        this.$titulo2.appendChild(this.$errorContenedor);
    }

    mensajeIntentos() {
        this.$nivelDificultad.classList.add('titulo2');
        this.$nivelDificultad.innerHTML = `Nivel: ${this.nivelDificultad}`;
        this.$titulo2.appendChild(this.$nivelDificultad);
    }

}

new Memorama();