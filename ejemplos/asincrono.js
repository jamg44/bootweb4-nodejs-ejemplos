'use strict';

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

escribeTras2Segundos('texto1', (resultado) => {
  console.log('termino la primera ejecución con', resultado);
  escribeTras2Segundos('texto2', (resultado) => {
    console.log('termino la segunda ejecución');
  });
});
