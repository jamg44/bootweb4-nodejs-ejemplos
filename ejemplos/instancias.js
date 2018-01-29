"use strict";

// creamos una función para usarla como constructor de objetos
function Fruta(nombre) {
  this.nombre = nombre;

  this.setNombre = function(valor) {
    this.nombre = valor;
  }

}

const limon = new Fruta('limon');

console.log(limon.nombre);
