'use strict';

// patron factory
function creaAgente(nombre) {
  return {
    getNombre: function() {
      return nombre;
    },
    setNombre: function(valor) {
      nombre = valor;
    },
    saluda: function() {
      console.log(`Hola soy ${nombre}`);
    }
  }
  // que valor tiene this aquí?
}

const jones = creaAgente('Jones');
jones.saluda();
//console.log(jones);

const brown = creaAgente('Brown');
brown.saluda();