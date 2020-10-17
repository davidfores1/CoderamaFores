class Memorama {

    constructor() {

        this.totalTarjetas = [];
        this.numeroTarjetas = 0;
        this.verificadorTarjetas = []
        this.error = 0;
        this.nivelDificulta = '';
        this.imagenesCorrectas = [];
        this.agregadorTarjetas = [];

        this.$contenedorGeneral = document.querySelector('.contenedor-general');
        this.$contenedorTarjetas = document.querySelector('.contenedor-tarjetas');
        this.$pantallaBloqueada = document.querySelector('.pantalla-bloqueada');
        this.$mensaje = document.querySelector('h2.mensaje');
    }

}

new Memorama();