'use strict';
console.log(this);
console.log('empiezo');

// función que escribe un texto tras 2 segundos
function escribeTras2Segundos(texto, callback) {
  // setTimeout(function() {})
  setTimeout(() => {
    console.log(texto);
    //return 22;
    callback(22);
  }, 2000);
}

// bucle asíncrono en serie
// llamar a una función con cada elemento de un array, en serie
function serie(arr, fn, callbackFinalizador) {
  if (arr.length == 0) {
    // termino
    callbackFinalizador();
    return; // termina la ejecución del bucle
  }
  fn('texto' + arr.shift(), () => {
    // cuando termine, nos llamamos a nosotros mismos
    serie(arr, fn, callbackFinalizador);
  });
}

serie([1,2,'hola',4,5], escribeTras2Segundos, () => {
  console.log('he terminado');
});