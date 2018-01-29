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

for(let n = 0; n < 15; n++) {
  escribeTras2Segundos('texto' + n, () => {

  });
}
